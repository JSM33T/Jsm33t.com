using FluentValidation;
using Jsm33t.Contracts.Dtos.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jsm33t.Validators
{
    public class RecoveryRequestDtosValidator : AbstractValidator<RecoveryRequestDtos>
    {
        public RecoveryRequestDtosValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email is required")
                .EmailAddress()
                .WithMessage("Invalid email address");
            // Add other rules as needed
        }
    }
}
