using System.ComponentModel.DataAnnotations;

namespace Jsm33t.Contracts.Dtos.Requests
{
    public class LoginRequestDto
    {
        [Required] public string Email { get; set; } = null!;
        [Required] public string Password { get; set; } = null!;
        public string? DeviceId { get; set; }
        public string? IpAddress { get; set; }
        public string? UserAgent { get; set; }
    }


}
