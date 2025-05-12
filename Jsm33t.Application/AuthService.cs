using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Internal;
using Jsm33t.Contracts.Dtos.Requests;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Repositories;
using Jsm33t.Contracts.Interfaces.Services;
using Jsm33t.Contracts.Models;
using Jsm33t.Infra.MailService;
using Jsm33t.Infra.Token;
using Jsm33t.Shared.Helpers;

namespace Jsm33t.Application
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _repo;
        private readonly ITokenService _tokenService;
        private readonly IMailService _mailService;

        public AuthService(IAuthRepository repo, ITokenService tokenService,IMailService mailService)
        {
            _repo = repo;
            _tokenService = tokenService;
            _mailService = mailService;
        }

        public async Task<bool> SignupAsync(SignupUserDto dto)
        {
            var salt = PasswordHelper.GenerateSalt();
            var hash = PasswordHelper.HashPassword(dto.Password, salt);
            SignupResultDto res = await _repo.InsertUserAsync(dto, hash, salt);

            //await _mailService.SendEmailAsync(res.Email, "subject", "body", true);

            return true;
        }

        public async Task<(LoginResponseDto Response, string RefreshToken)> LoginAsync(LoginRequestDto dto)
        {
            var login = await _repo.GetLoginDataByEmailAsync(dto.Email);
            if (login == null)
                throw new UnauthorizedAccessException("Invalid credentials");

            if (!PasswordHelper.VerifyPassword(dto.Password, login.PasswordHash!, login.Salt!))
                throw new UnauthorizedAccessException("Invalid credentials");

            var tokens = _tokenService.GenerateTokens(login.UserId);

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

            var sessionId = await _repo.CreateSessionAsync(session);

            var response = new LoginResponseDto
            {
                UserId = login.UserId,
                SessionId = sessionId,
                AccessToken = tokens.AccessToken,
                ExpiresAt = tokens.ExpiresAt
            };

            return (response, tokens.RefreshToken);
        }

        public async Task<IEnumerable<SessionDto>> GetUserSessionsAsync(int userId)
        {
            return await _repo.GetSessionsByUserIdAsync(userId);
        }

        public async Task<bool> LogoutSessionAsync(int sessionId)
        {
            // Optional: implement stored proc to set IsActive = 0, LoggedOutAt = GETDATE()
            return true;
        }
        public async Task VerifyEmailAsync(Guid token)
        {
            await _repo.VerifyEmailTokenAsync(token);
        }

        public async Task<(LoginResponseDto Response, string NewRefreshToken)> RefreshTokenAsync(string refreshToken, string deviceId)
        {
            var (userId, userLoginId, sessionId) = await _repo.ValidateRefreshTokenAsync(refreshToken, deviceId);

            var tokens = _tokenService.GenerateTokens(userId);

            await _repo.StoreNewRefreshTokenAsync(sessionId, tokens.RefreshToken, tokens.ExpiresAt);

            var response = new LoginResponseDto
            {
                UserId = userId,
                SessionId = sessionId,
                AccessToken = tokens.AccessToken,
                ExpiresAt = tokens.ExpiresAt
            };

            return (response, tokens.RefreshToken);
        }


    }

}
