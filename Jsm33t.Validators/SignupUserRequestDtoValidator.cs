using FluentValidation;
using Jsm33t.Contracts.Dtos;

namespace Jsm33t.Validators
{
    public class SignupUserRequestDtoValidator : AbstractValidator<SignupUserRequestDto>
    {
        public SignupUserRequestDtoValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("First name is required");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("Last name is required");
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email address");
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(6).WithMessage("Password must be at least 6 characters long");
            // Add other rules as needed
        }
    }
}
