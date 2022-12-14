using Articles.Models.DTOs.ArticleImage;

namespace Articles.Services.ImageRepositories
{
    public interface IImageRepository
    {
        Task<string> SaveFile(IFormFile file);
    }
}