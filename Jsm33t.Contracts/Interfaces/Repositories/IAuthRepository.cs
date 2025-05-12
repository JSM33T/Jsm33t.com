﻿using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Internal;
using Jsm33t.Contracts.Dtos.Requests;
using Jsm33t.Contracts.Models;

namespace Jsm33t.Contracts.Interfaces.Repositories
{
    public interface IAuthRepository
    {
        Task<UserLogin?> GetLoginDataByEmailAsync(string email);
        Task<SignupResultDto> InsertUserAsync(SignupUserDto dto, string passwordHash, string salt);
        Task<int> InsertUserLoginAsync(int userId, string email, string passwordHash, string salt);
        Task<int> CreateSessionAsync(LoginSession session);
        Task<IEnumerable<SessionDto>> GetSessionsByUserIdAsync(int userId);
        Task VerifyEmailTokenAsync(Guid token);
        Task<(int UserId, int UserLoginId, int SessionId)> ValidateRefreshTokenAsync(string refreshToken, string deviceId);

        Task StoreNewRefreshTokenAsync(int sessionId, string newRefreshToken, DateTime expiresAt);

    }
}
