using Articles.Models.DTOs;
using Articles.Models.DTOs.ArticleRequest;
using Articles.Services.Resource;
using FluentValidation;

namespace Articles.Models.DTOs.Validation
{
    public class ArticleValidation : AbstractValidator<ArticleCreateRequest>
    {
        public ArticleValidation()
        {
            RuleFor(o => o.Title).NotEmpty().WithMessage(string.Format(Resource.VALIDATION_NOT_EMPTY, "Tiêu đề"))
            .MinimumLength(3).WithMessage(string.Format(Resource.VALIDATION_MIN_LENGTH, "Tiêu đề", "3"))
            .MaximumLength(200).WithMessage(string.Format(Resource.VALIDATION_MAX_LENGTH, "Tiêu đề", "200"));

            RuleFor(o => o.Content).NotEmpty().WithMessage(string.Format(Resource.VALIDATION_NOT_EMPTY, "Nội dung"))
            .MinimumLength(3).WithMessage(string.Format(Resource.VALIDATION_MIN_LENGTH, "Tiêu đề", "3"))
            .MaximumLength(10000).WithMessage(string.Format(Resource.VALIDATION_MAX_LENGTH, "Tiêu đề", "10000"));

        }

    }
}