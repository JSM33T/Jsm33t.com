using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Internal;
using Jsm33t.Contracts.Dtos.Requests;
using Jsm33t.Contracts.Dtos.Responses;

namespace Jsm33t.Contracts.Interfaces.Services
{
    public interface IAuthService
    {
        Task<SignupResultDto> SignupAsync(SignupUserDto dto);
        Task<(LoginResponseDto, string)> LoginAsync(LoginRequestDto dto);
        Task<bool> LogoutSessionAsync(int sessionId);
        Task<(LoginResponseDto, string)> RefreshTokenAsync(string refreshToken, string deviceId);
        Task<IEnumerable<SessionDto>> GetUserSessionsAsync(int userId);
        Task VerifyEmailAsync(Guid token);
        Task RequestPasswordRecoveryAsync(string email);
        Task CompletePasswordRecoveryAsync(string? token, string? otp, string newPassword);
    }
}
