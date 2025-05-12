using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Requests;
using Jsm33t.Contracts.Dtos.Responses;

namespace Jsm33t.Contracts.Interfaces.Services
{
    public interface IAuthService
    {
        //Task<LoginResponseDto> LoginAsync(LoginRequestDto dto);
        Task<(LoginResponseDto Response, string RefreshToken)> LoginAsync(LoginRequestDto dto);
        Task<bool> SignupAsync(SignupUserDto dto);
        Task<IEnumerable<SessionDto>> GetUserSessionsAsync(int userId);
        Task<bool> LogoutSessionAsync(int sessionId);
        Task VerifyEmailAsync(Guid token);
        Task<(LoginResponseDto Response, string NewRefreshToken)> RefreshTokenAsync(string refreshToken, string deviceId);

    }
}
