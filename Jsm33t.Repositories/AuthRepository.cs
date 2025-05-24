using Dapper;
using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Internal;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Repositories;
using Jsm33t.Contracts.Models;
using Jsm33t.Infra.Dapper;
using Jsm33t.Infra.MailService;
using Jsm33t.Shared.Helpers;
using System.Data;

namespace Jsm33t.Repositories;

public class AuthRepository(IDapperFactory factory) : IAuthRepository
{
    private readonly IDbConnection _db = factory.CreateConnection();

    public Task<UserLogin?> GetLoginDataByEmailAsync(string email) =>
        _db.QueryFirstOrDefaultAsync<UserLogin>("EXEC usp_GetUserLoginForEmail @Email", new { Email = email });

    public async Task<SignupResultDto> InsertUserAsync(SignupUserDto dto, string passwordHash, string salt)
    {
        var p = new DynamicParameters();
        p.Add("@FirstName", dto.FirstName);
        p.Add("@LastName", dto.LastName);
        p.Add("@UserName", dto.UserName);
        p.Add("@Email", dto.Email);
        p.Add("@PasswordHash", passwordHash);
        p.Add("@Salt", salt);
        return await _db.QuerySingleAsync<SignupResultDto>("usp_SignupUser", p, commandType: CommandType.StoredProcedure);
    }

    public async Task<int> CreateSessionAsync(LoginSession session)
    {
        var p = new DynamicParameters();
        p.Add("@UserLoginId", session.UserLoginId);
        p.Add("@AccessToken", session.AccessToken);
        p.Add("@RefreshToken", session.RefreshToken);
        p.Add("@IssuedAt", session.IssuedAt);
        p.Add("@ExpiresAt", session.ExpiresAt);
        p.Add("@DeviceId", session.DeviceId);
        p.Add("@IPAddress", session.IpAddress);
        p.Add("@UserAgent", session.UserAgent);
        return await _db.ExecuteScalarAsync<int>("usp_CreateLoginSession", p, commandType: CommandType.StoredProcedure);
    }

    public async Task<bool> LogoutSessionAsync(int sessionId)
    {
        const string sql = "UPDATE LoginSessions SET IsActive = 0, LoggedOutAt = GETUTCDATE() WHERE Id = @SessionId";
        var result = await _db.ExecuteAsync(sql, new { SessionId = sessionId });
        return result > 0;
    }

    public async Task<(int UserId, int UserLoginId, int SessionId)> ValidateRefreshTokenAsync(string refreshToken, string deviceId)
    {
        var result = await _db.QueryFirstOrDefaultAsync<(int, int, int)>("usp_ValidateRefreshToken",
            new { RefreshToken = refreshToken, DeviceId = deviceId },
            commandType: CommandType.StoredProcedure);

        if (result.Item1 == 0)
            throw new UnauthorizedAccessException("Invalid refresh token or device ID");

        return result;
    }

    public Task StoreNewRefreshTokenAsync(int sessionId, string token, DateTime expires) =>
        _db.ExecuteAsync("UPDATE LoginSessions SET RefreshToken = @token, ExpiresAt = @expires WHERE Id = @sessionId",
            new { sessionId, token, expires });

    public Task<IEnumerable<SessionDto>> GetSessionsByUserIdAsync(int userId) =>
        _db.QueryAsync<SessionDto>("EXEC usp_GetUserSessions @UserId", new { UserId = userId });

    public Task VerifyEmailTokenAsync(Guid token) =>
        _db.ExecuteAsync("usp_VerifyEmail", new { Token = token }, commandType: CommandType.StoredProcedure);

    public async Task<int> InsertUserLoginAsync(int userId, string email, string passwordHash, string salt)
    {
        var parameters = new DynamicParameters();
        parameters.Add("@UserId", userId);
        parameters.Add("@Email", email);
        parameters.Add("@PasswordHash", passwordHash);
        parameters.Add("@Salt", salt);

        return await _db.ExecuteScalarAsync<int>(
            "usp_InsertUserLogin",
            parameters,
            commandType: CommandType.StoredProcedure
        );
    }
    //public async Task<Guid> CreatePasswordRecoveryTokenAsync(string email)
    //{
    //    var p = new DynamicParameters();
    //    p.Add("@Email", email);
    //    return await _db.ExecuteScalarAsync<Guid>("usp_CreateRecoveryToken", p, commandType: CommandType.StoredProcedure);
    //}

    public async Task<(Guid Token, string Otp)> CreatePasswordRecoveryTokenAsync(string email)
    {
        var parameters = new DynamicParameters();
        parameters.Add("@Email", email);

        var result = await _db.QuerySingleAsync<(Guid Token, string Otp)>(
            "usp_CreateRecoveryToken",
            parameters,
            commandType: CommandType.StoredProcedure
        );

        return result;
    }


    public async Task<bool> ValidateRecoveryTokenAsync(string? token, string? otp)
    {
        return await _db.ExecuteScalarAsync<bool>(
            "usp_ValidateRecoveryToken",
            new { Token = token, Otp = otp },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<bool> UpdatePasswordByRecoveryTokenAsync(string? token, string? otp, string hash, string salt)
    {
        var parameters = new DynamicParameters();
        parameters.Add("@Token", token);
        parameters.Add("@Otp", otp);
        parameters.Add("@PasswordHash", hash);
        parameters.Add("@Salt", salt);

        var result = await _db.ExecuteScalarAsync<int>(
            "usp_ResetPassword",
            parameters,
            commandType: CommandType.StoredProcedure
        );

        return result == 1;
    }

}
