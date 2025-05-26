namespace Jsm33t.Infra.Token
{
    /// <summary>
    /// Provides functionality to generate access and refresh tokens for authentication.
    /// </summary>
    public interface ITokenService
    {
        /// <summary>
        /// Generates a new access and refresh token pair for the given user ID.
        /// </summary>
        /// <param name="userId">The user ID for which tokens are generated.</param>
        /// <returns>
        /// A tuple containing the access token, refresh token, token expiry time, and issuance time.
        /// </returns>
        //public Task<(string AccessToken, string RefreshToken, DateTime ExpiresAt, DateTime IssuedAt)> GenerateTokens(int userId);
        public Task<(string AccessToken, string RefreshToken, DateTime JwtExpiresAt, DateTime RefreshTokenExpiresAt, DateTime IssuedAt)> GenerateTokens(int userId);

    }
}