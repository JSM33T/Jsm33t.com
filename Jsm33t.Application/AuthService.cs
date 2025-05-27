using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Internal;
using Jsm33t.Contracts.Dtos.Requests;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Repositories;
using Jsm33t.Contracts.Interfaces.Services;
using Jsm33t.Contracts.Models;
using Jsm33t.Infra.MailService;
using Jsm33t.Infra.Token;
using Jsm33t.Shared.ConfigModels;
using Jsm33t.Shared.Helpers;

namespace Jsm33t.Application;

public class AuthService(IAuthRepository repo, ITokenService tokenService,IMailService mailService,FcConfig fcConfig) : IAuthService
{
    public async Task<SignupResultDto> SignupAsync(SignupUserDto dto)
    {
        var salt = PasswordHelper.GenerateSalt();
        var hash = PasswordHelper.HashPassword(dto.Password, salt);
        return await repo.InsertUserAsync(dto, hash, salt);
    }

    public async Task<(LoginResponseDto, string)> LoginAsync(LoginRequestDto dto)
    {
        var login = await repo.GetLoginDataByEmailAsync(dto.Email)
            ?? throw new UnauthorizedAccessException("Invalid credentials");

        if (!login.IsVerified)
            throw new UnauthorizedAccessException("Email not verified");

        if (!PasswordHelper.VerifyPassword(dto.Password, login.PasswordHash!, login.Salt!))
            throw new UnauthorizedAccessException("Invalid credentials");

        // Generate tokens with both expiry times
        var (accessToken, refreshToken, jwtExpiresAt, refreshTokenExpiresAt, issuedAt) =
            await tokenService.GenerateTokens(login.UserId);

        // Store session using refresh token expiry for session expiration
        var session = new LoginSession
        {
            UserLoginId = login.Id,
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            IssuedAt = issuedAt,
            ExpiresAt = refreshTokenExpiresAt,
            DeviceId = Guid.Parse(dto.DeviceId!),
            IpAddress = dto.IpAddress,
            UserAgent = dto.UserAgent
        };

        var sessionId = await repo.CreateSessionAsync(session);

        // JWT expiry returned to client, refresh expiry managed in session/cookie
        return (new LoginResponseDto
        {
            UserId = login.UserId,
            SessionId = sessionId,
            AccessToken = accessToken,
            ExpiresAt = jwtExpiresAt
        }, refreshToken);
    }

    public async Task<bool> LogoutSessionAsync(int sessionId) =>
        await repo.LogoutSessionAsync(sessionId);

    public async Task<(LoginResponseDto, string)> RefreshTokenAsync(string refreshToken, string deviceId)
    {
        // Validate existing refresh token and get session info
        var (userId, _, sessionId) = await repo.ValidateRefreshTokenAsync(refreshToken, deviceId);

        // Generate new tokens and expires
        var (accessToken, newRefreshToken, jwtExpiresAt, refreshTokenExpiresAt, _) =
            await tokenService.GenerateTokens(userId);

        // Update session with new refresh token and its expiry
        await repo.StoreNewRefreshTokenAsync(sessionId, newRefreshToken, refreshTokenExpiresAt);

        // Return new JWT and refresh token
        return (new LoginResponseDto
        {
            UserId = userId,
            SessionId = sessionId,
            AccessToken = accessToken,
            ExpiresAt = jwtExpiresAt
        }, newRefreshToken);
    }
    
    public Task<IEnumerable<SessionDto>> GetUserSessionsAsync(int userId) =>
        repo.GetSessionsByUserIdAsync(userId);

    public Task VerifyEmailAsync(Guid token) =>
        repo.VerifyEmailTokenAsync(token);

    public async Task RequestPasswordRecoveryAsync(string email)
    {
        var token = await repo.CreatePasswordRecoveryTokenAsync(email);
        var subject = "Password Recovery";
        var link = $"{fcConfig.BaseUrls.BaseUiUrl}/landings/recovery?token={token.Token}";
        //var body = $"<p>Click <a href='{link}'>here</a> to reset your password.</p>";
        var body = Template.PasswordResetHtml
            .Replace("{Link}", link)
            .Replace("{DateTime.Now.Year}", DateTime.Now.Year.ToString());
        await mailService.SendEmailAsync(email, subject, body, isHtml: true);
    }

    public async Task CompletePasswordRecoveryAsync(string? token, string? otp, string newPassword)
    {
        var isValid = await repo.ValidateRecoveryTokenAsync(token, otp);
        if (!isValid) throw new UnauthorizedAccessException("Invalid or expired recovery credentials");

        var salt = PasswordHelper.GenerateSalt();
        var hash = PasswordHelper.HashPassword(newPassword, salt);

        var updated = await repo.UpdatePasswordByRecoveryTokenAsync(token, otp, hash, salt);
        if (!updated) throw new Exception("Password update failed");
    }

}

