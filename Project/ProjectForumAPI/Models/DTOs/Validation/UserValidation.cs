using Articles.Models.DTOs;
using Articles.Services.Resource;
using FluentValidation;

namespace Articles.Models.DTOs.Validation
{
    public class UserValidation : AbstractValidator<UserDTO>
    {
        public UserValidation()
        {
            RuleFor(o => o.Email).NotEmpty().WithMessage(string.Format(Resource.VALIDATION_NOT_EMPTY, "Email"))
            .EmailAddress().WithMessage(string.Format(Resource.VALIDATION_DISPLAY, "Email"));

            RuleFor(o => o.Password).NotEmpty().WithMessage(string.Format(Resource.VALIDATION_NOT_EMPTY, "Password"));

            RuleFor(o => o.ConfirmPassword).NotEmpty().WithMessage(string.Format(Resource.VALIDATION_NOT_EMPTY, "ConfirmPassword"));

            RuleFor(o => o.Password).Equal(o => o.ConfirmPassword).WithMessage(Resource.VALIDATION_NOT_EMPTY);

            RuleFor(o => o.FirstName).NotEmpty().WithMessage(string.Format(Resource.VALIDATION_NOT_EMPTY, "Họ"))
            .MinimumLength(3).WithMessage(string.Format(Resource.VALIDATION_MIN_LENGTH, "Họ", "1"))
            .MaximumLength(50).WithMessage(string.Format(Resource.VALIDATION_MAX_LENGTH, "Họ", "50"));

            RuleFor(o => o.LastName).NotEmpty().WithMessage(string.Format(Resource.VALIDATION_NOT_EMPTY, "Tên"))
            .MinimumLength(3).WithMessage(string.Format(Resource.VALIDATION_MIN_LENGTH, "Tên", "1"))
            .MaximumLength(50).WithMessage(string.Format(Resource.VALIDATION_MAX_LENGTH, "Tên", "50"));


        }

    }
}