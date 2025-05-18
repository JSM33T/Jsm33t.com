using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jsm33t.Contracts.Dtos.Requests
{
    public class SignupUserRequest
    {
        public bool IsRegistered { get; set; }
        public  string? VerificationToken { get; set; }
    }
}
