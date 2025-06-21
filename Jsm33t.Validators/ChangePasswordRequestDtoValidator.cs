using FluentValidation;
using Jsm33t.Contracts.Dtos.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jsm33t.Validators
{
    internal class ChangePasswordRequestDtoValidator : AbstractValidator<ChangePasswordRequestDto>
    {
        public ChangePasswordRequestDtoValidator()
        {
            RuleFor(x => x.CurrentPassword)
                .NotEmpty()
                .WithMessage("Email / Username is required");

            RuleFor(x => x.NewPassword)
                .NotEmpty()
                .WithMessage("Password is required")
                .MinimumLength(6)
                .WithMessage("Password must be at least 6 characters long")
                .MaximumLength(128)
                .WithMessage("Password must not exceed 128 characters");
        }
    }
}
