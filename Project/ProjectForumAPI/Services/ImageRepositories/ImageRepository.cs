using System.Data.Entity;
using System.Net.Http.Headers;
using Articles.GenericRepository;
using Articles.Models.Data.DbContext;
using Articles.Services.StorageServices;
using AutoMapper;
using Project_Articles.Controllers;

namespace Articles.Services.ImageRepositories
{
    public class ImageRepository : IImageRepository
    {
        private readonly IStorageService _storageService;

        public ImageRepository(IStorageService storageService)
        {
            _storageService = storageService;
        }
        public async Task<string> SaveFile(IFormFile file)
        {
            var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            await _storageService.SaveFileAsync(file.OpenReadStream(), fileName);
            return fileName;
        }
    }
}