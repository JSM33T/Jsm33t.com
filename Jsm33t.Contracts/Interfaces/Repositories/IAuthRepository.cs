using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Internal;
using Jsm33t.Contracts.Models;

namespace Jsm33t.Contracts.Interfaces.Repositories
{
    /// <summary>
    /// Defines methods for user authentication, session management, and credential recovery.
    /// </summary>
    public interface IAuthRepository
    {
        /// <summary>
        /// Retrieves login data for a user by email address asynchronously.
        /// </summary>
        /// <param name="email">The user's email address.</param>
        /// <returns>The user's login data or null if not found.</returns>
        Task<UserLogin?> GetLoginDataByEmailAsync(string email);

        /// <summary>
        /// Inserts a new user asynchronously and returns the result.
        /// </summary>
        /// <param name="dto">The signup request data.</param>
        /// <param name="passwordHash">The hashed password.</param>
        /// <param name="salt">The password salt.</param>
        /// <returns>The result of the signup operation.</returns>
        Task<SignupResultDto> InsertUserAsync(SignupUserRequestDto dto, string passwordHash, string salt);

        /// <summary>
        /// Creates a new login session asynchronously.
        /// </summary>
        /// <param name="session">The login session to create.</param>
        /// <returns>The ID of the created session.</returns>
        Task<int> CreateSessionAsync(LoginSession session);

        /// <summary>
        /// Retrieves all login sessions for a user by user ID asynchronously.
        /// </summary>
        /// <param name="userId">The user's unique identifier.</param>
        /// <returns>A collection of session data transfer objects.</returns>
        Task<IEnumerable<SessionDto>> GetSessionsByUserIdAsync(int userId);

        /// <summary>
        /// Verifies an email token asynchronously.
        /// </summary>
        /// <param name="token">The verification token.</param>
        Task VerifyEmailTokenAsync(Guid token);

        /// <summary>
        /// Validates a refresh token and device ID asynchronously.
        /// </summary>
        /// <param name="refreshToken">The refresh token string.</param>
        /// <param name="deviceId">The device identifier.</param>
        /// <returns>
        /// A tuple containing the user ID, user login ID, and session ID.
        /// </returns>
        Task<(int UserId, int UserLoginId, int SessionId)> ValidateRefreshTokenAsync(string refreshToken, string deviceId);

        /// <summary>
        /// Stores a new refresh token for a session asynchronously.
        /// </summary>
        /// <param name="sessionId">The session identifier.</param>
        /// <param name="newRefreshToken">The new refresh token.</param>
        /// <param name="expiresAt">The expiration date and time.</param>
        Task StoreNewRefreshTokenAsync(int sessionId, string newRefreshToken, DateTime expiresAt);

        /// <summary>
        /// Logs out a session by session ID asynchronously.
        /// </summary>
        /// <param name="sessionId">The session identifier.</param>
        /// <returns>True if logout succeeded; otherwise, false.</returns>
        Task<bool> LogoutSessionAsync(int sessionId);

        /// <summary>
        /// Creates a password recovery token and OTP for a user asynchronously.
        /// </summary>
        /// <param name="email">The user's email address.</param>
        /// <returns>A tuple containing the recovery token and OTP.</returns>
        Task<(Guid Token, string Otp)> CreatePasswordRecoveryTokenAsync(string email);

        /// <summary>
        /// Validates a password recovery token and OTP asynchronously.
        /// </summary>
        /// <param name="token">The recovery token.</param>
        /// <param name="otp">The OTP string.</param>
        /// <returns>True if valid; otherwise, false.</returns>
        Task<bool> ValidateRecoveryTokenAsync(string? token, string? otp);

        /// <summary>
        /// Updates a user's password by recovery token and OTP asynchronously.
        /// </summary>
        /// <param name="token">The recovery token.</param>
        /// <param name="otp">The OTP string.</param>
        /// <param name="hash">The new password hash.</param>
        /// <param name="salt">The new password salt.</param>
        /// <returns>True if update succeeded; otherwise, false.</returns>
        Task<bool> UpdatePasswordByRecoveryTokenAsync(string? token, string? otp, string hash, string salt);
    }
}
