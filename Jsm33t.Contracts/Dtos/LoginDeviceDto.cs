using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jsm33t.Contracts.Dtos
{
    public class LoginDeviceDto
    {
        public int SessionId { get; set; }
        public string AccessToken { get; set; }
        public Guid? DeviceId { get; set; }
        public string IpAddress { get; set; }
        public string UserAgent { get; set; }
        public DateTime? IssuedAt { get; set; }
        public DateTime? ExpiresAt { get; set; }
        public bool IsActive { get; set; }
        public DateTime? LoggedOutAt { get; set; }
        public bool IsCurrent { get; set; } = false;
    }


}
