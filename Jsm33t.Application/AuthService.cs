﻿using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Internal;
using Jsm33t.Contracts.Dtos.Requests;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Repositories;
using Jsm33t.Contracts.Interfaces.Services;
using Jsm33t.Contracts.Models;
using Jsm33t.Infra.MailService;
using Jsm33t.Infra.Token;
using Jsm33t.Shared.Helpers;

namespace Jsm33t.Application;

public class AuthService(IAuthRepository repo, ITokenService tokenService,IMailService mailService) : IAuthService
{
    public async Task<SignupResultDto> SignupAsync(SignupUserDto dto)
    {
        var salt = PasswordHelper.GenerateSalt();
        var hash = PasswordHelper.HashPassword(dto.Password, salt);
        return await repo.InsertUserAsync(dto, hash, salt);
    }

    public async Task<(LoginResponseDto, string)> LoginAsync(LoginRequestDto dto)
    {
        var login = await repo.GetLoginDataByEmailAsync(dto.Email) ??
            throw new UnauthorizedAccessException("Invalid credentials");

        if (!login.IsVerified)
            throw new UnauthorizedAccessException("Email not verified");

        if (!PasswordHelper.VerifyPassword(dto.Password, login.PasswordHash!, login.Salt!))
            throw new UnauthorizedAccessException("Invalid credentials");

        var tokens = await tokenService.GenerateTokens(login.UserId);

        var session = new LoginSession
        {
            UserLoginId = login.Id,
            AccessToken = tokens.AccessToken,
            RefreshToken = tokens.RefreshToken,
            IssuedAt = tokens.IssuedAt,
            ExpiresAt = tokens.ExpiresAt,
            DeviceId = Guid.Parse(dto.DeviceId),
            IpAddress = dto.IpAddress,
            UserAgent = dto.UserAgent
        };

        var sessionId = await repo.CreateSessionAsync(session);

        return (new LoginResponseDto
        {
            UserId = login.UserId,
            SessionId = sessionId,
            AccessToken = tokens.AccessToken,
            ExpiresAt = tokens.ExpiresAt
        }, tokens.RefreshToken);
    }

    public async Task<bool> LogoutSessionAsync(int sessionId) =>
        await repo.LogoutSessionAsync(sessionId);

    public async Task<(LoginResponseDto, string)> RefreshTokenAsync(string refreshToken, string deviceId)
    {
        var (userId, userLoginId, sessionId) = await repo.ValidateRefreshTokenAsync(refreshToken, deviceId);
        var tokens = await tokenService.GenerateTokens(userId);
        await repo.StoreNewRefreshTokenAsync(sessionId, tokens.RefreshToken, tokens.ExpiresAt);

        return (new LoginResponseDto
        {
            UserId = userId,
            SessionId = sessionId,
            AccessToken = tokens.AccessToken,
            ExpiresAt = tokens.ExpiresAt
        }, tokens.RefreshToken);
    }

    public Task<IEnumerable<SessionDto>> GetUserSessionsAsync(int userId) =>
        repo.GetSessionsByUserIdAsync(userId);

    public Task VerifyEmailAsync(Guid token) =>
        repo.VerifyEmailTokenAsync(token);

    public async Task RequestPasswordRecoveryAsync(string email)
    {
        var token = await repo.CreatePasswordRecoveryTokenAsync(email);
        var subject = "Password Recovery";
        var link = $"https://jsm33t.com/account/reset?token={token}";
        var body = $"<p>Click <a href='{link}'>here</a> to reset your password.</p>";
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

