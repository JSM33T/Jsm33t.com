using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Repositories;
using Jsm33t.Shared.ConfigModels;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Jsm33t.Infra.Token;

public class MockTokenService(FcConfig fcConfig, IProfileRepository profileRepository) : ITokenService
{
    private readonly JwtConfig _config = fcConfig.JwtConfig!;
    private readonly IProfileRepository _profileRepository = profileRepository;

    public async Task<(string AccessToken, string RefreshToken, DateTime JwtExpiresAt, DateTime RefreshTokenExpiresAt, DateTime IssuedAt)> GenerateTokens(int userId)
    {
        var issuedAt = DateTime.UtcNow;
        var jwtExpiresAt = issuedAt.AddMonths(1);
        var refreshTokenExpiresAt = issuedAt.AddMinutes(1);
        UserProfileDetailsDto user = await _profileRepository.GetUserProfileById(userId);

        var keyBytes = Convert.FromBase64String(_config?.Key!);
        var securityKey = new SymmetricSecurityKey(keyBytes);
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
    {
        new(JwtRegisteredClaimNames.Sub, userId.ToString()),
        new(JwtRegisteredClaimNames.Iat, new DateTimeOffset(issuedAt).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
        new(ClaimTypes.NameIdentifier, userId.ToString()),
        new(ClaimTypes.Email, user.Email!),
        new(ClaimTypes.GivenName, user.FirstName!),
        new(ClaimTypes.Surname, user.LastName!),
        new(ClaimTypes.Name, user.UserName!),
        new(ClaimTypes.Role, user.Role),
        new("avatar", user.Avatar)
    };

        var token = new JwtSecurityToken(
            issuer: _config?.Issuer,
            audience: _config?.Audience,
            claims: claims,
            notBefore: issuedAt,
            expires: jwtExpiresAt,
            signingCredentials: credentials
        );

        var accessToken = new JwtSecurityTokenHandler().WriteToken(token);
        var refreshToken = Guid.NewGuid().ToString();

        return (accessToken, refreshToken, jwtExpiresAt, refreshTokenExpiresAt, issuedAt);
    }

}
