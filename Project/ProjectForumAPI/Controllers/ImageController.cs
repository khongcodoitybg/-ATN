// using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.Authorization;
// using Articles.Models.DTOs;
// using Articles.Models.Response;
// using Articles.Services.Resource;
// using Articles.Models.DTOs.ArticleImage;
// using Articles.Services.ArticleRepositories;
// using Articles.Models.Data.AggregateArticles;
// using AutoMapper;
// using Articles.Services.ImageRepositories;
// using System.Security.Claims;
// using Articles.GenericRepository;
// using Articles.Models.Data.AggregateUsers;
// using Microsoft.AspNetCore.Identity;
// using Articles.Models.DTOs.ArticleRequest;
// using Articles.Models.DTOs.ImageRequest;
// using Articles.Models.Data.AggregateImage;

// namespace Project_Articles.Controllers
// {
//     [Route("forum/[controller]")]
//     [ApiController]
//     public class ImageController : ControllerBase
//     {
//         private readonly IImageRepository _imageRepository;
//         private readonly IMapper _mapper;
//         public ImageController(IImageRepository imageRepository,
//         IMapper mapper)
//         {
//             _imageRepository = imageRepository;
//             _mapper = mapper;
//         }
//         // [AllowAnonymous]
//         // [Authorize]
//         // public async Task<IActionResult> GetImages()
//         // {
//         //     var articles = await _articleRepository.GetArticles();
//         //     return Ok(new Response(Resource.GET_SUCCESS, null, articles));
//         // }

//         // [HttpGet("{id:int}")]
//         // [Authorize]
//         // public async Task<IActionResult> GetArticle(int id)
//         // {
//         // }

//         [HttpPost]
//         [Authorize]
//         public async Task<IActionResult> CreateArticle([FromForm] ImageCreateRequest request)
//         {
//             var image = _mapper.Map<Images>(request);
//             image.CreatedDate = DateTime.Now;


//         }
//     }
// }