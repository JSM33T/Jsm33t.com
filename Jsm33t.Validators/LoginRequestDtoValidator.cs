using FluentValidation;
using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Requests;

namespace Jsm33t.Validators
{
    public class LoginRequestDtoValidator : AbstractValidator<LoginRequestDto>
    {
        public LoginRequestDtoValidator()
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email / Username is required");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Password is required");
        }
    }
}
