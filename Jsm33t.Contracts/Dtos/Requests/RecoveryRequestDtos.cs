namespace Jsm33t.Contracts.Dtos.Requests
{
    public class RecoveryRequestDtos
    {
        public string Email { get; set; } = string.Empty;
    }

    public class ResetPasswordDto
    {
        public string? Token { get; set; }
        public string? Otp { get; set; }
        public string? Username { get; set; }
        public string NewPassword { get; set; } = string.Empty;
    }
}
