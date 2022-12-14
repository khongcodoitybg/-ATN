using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Articles.Models.DTOs;
using Articles.Models.Response;
using Articles.Services.Resource;
using Articles.Models.DTOs.ArticleImage;
using Articles.Services.ArticleRepositories;
using Articles.Models.Data.AggregateArticles;
using AutoMapper;
using Articles.Services.ImageRepositories;
using System.Security.Claims;
using Articles.GenericRepository;
using Articles.Models.Data.AggregateUsers;
using Microsoft.AspNetCore.Identity;
using Articles.Models.DTOs.ArticleRequest;

namespace Project_Articles.Controllers
{
    [Route("forum/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleRepository _articleRepository;
        private readonly IMapper _mapper;
        private readonly IImageRepository _imageRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<ApiUser> _userManager;
        public ArticleController(IArticleRepository articleRepository
        , IMapper mapper,
        IImageRepository imageRepository,
        IUnitOfWork unitOfWork,
        UserManager<ApiUser> userManager)
        {
            _articleRepository = articleRepository;
            _mapper = mapper;
            _imageRepository = imageRepository;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }


        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetArticles()
        {
            var articles = await _articleRepository.GetArticles();
            return Ok(new Response(Resource.GET_SUCCESS, null, articles));
        }
        [Authorize(Roles = "User, Admin")]
        [Route("getArticlesOfMe")]
        [HttpGet]
        public async Task<IActionResult> GetArticleOfMe()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var articles = await _unitOfWork.Articles.GetAllAsync();
            var filterByUserId = from article in articles
                                 where article.UserId == id
                                 select article;
            var results = _mapper.Map<IList<ArticleViewRequest>>(filterByUserId);
            return Ok(new Response(Resource.GET_SUCCESS, null, results));
        }
        [Authorize(Roles = "Admin")]
        [Route("getArticlesByAdmin")]
        [HttpGet]
        public async Task<IActionResult> GetArticlesByAdmin()
        {
            var articles = await _articleRepository.GetArticlesByAdmin();
            return Ok(new Response(Resource.GET_SUCCESS, null, articles));
        }


        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetArticle(int id)
        {
            var article = await _unitOfWork.Articles.GetAsync(q => q.Id == id);
            article.ViewCount += 1;
            ApiUser user = await _userManager.FindByIdAsync(article.UserId);
            var imageAuthor = user.Avatar;
            _unitOfWork.Articles.Update(article);
            await _unitOfWork.Save();
            // var article = await _unitOfWork.Articles.GetAsync(query => query.Id == id);
            // var result = _mapper.Map<ArticleViewRequest>(article);
            return Ok(new Response(Resource.GET_SUCCESS, imageAuthor, article));
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("category/{request:int}")]
        public async Task<IActionResult> GetArticleByCategory(int request)
        {
            var articles = await _articleRepository.GetArticleByCategory(request);
            // var article = await _unitOfWork.Articles.GetAsync(query => query.Id == id);
            // var result = _mapper.Map<ArticleViewRequest>(article);
            return Ok(new Response(Resource.GET_SUCCESS, null, articles));
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("filterByKey")]
        public async Task<IActionResult> GetArticleByKey(string key)
        {
            var articles = await _articleRepository.GetArticlesByKey(key);
            // var article = await _unitOfWork.Articles.GetAsync(query => query.Id == id);
            // var result = _mapper.Map<ArticleViewRequest>(article);
            return Ok(new Response(Resource.GET_SUCCESS, null, articles));
        }


        [HttpPost]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> CreateArticle([FromForm] ArticleCreateRequest request)
        {
            if (request.Category == 1 || request.Category == 2 || request.Category == 3 || request.Category == 4 || request.Category == 5)
            {
                var article = _mapper.Map<Article>(request);
                article.CreatedDate = DateTime.Now;
                if (request.Thumbnails != null)
                {
                    article.ImagePath = await _imageRepository.SaveFile(request.Thumbnails);
                }
                article.ViewCount = 0;
                // Process relationship user
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                ApiUser user = await _userManager.FindByIdAsync(userId);
                article.UserId = userId;
                article.AuthorName = $"{user.FirstName} {user.LastName}";
                await _unitOfWork.Articles.InsertAsync(article);
                await _unitOfWork.Save();
                return Ok(new Response(Resource.CREATE_SUCCESS, "", article));
            }
            throw new Exception("Yêu cầu chọn đúng chủ đề");
        }

        [HttpPut("admin/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateArticleByAdmin(int id, [FromForm] ArticleUpdateByAdminRequest request)
        {
            var article = await _unitOfWork.Articles.GetAsync(q => q.Id == id);
            if (article == null)
            {
                throw new Exception("Article Not Found");
            }
            article.IsActive = request.IsActive;
            _unitOfWork.Articles.Update(article);
            await _unitOfWork.Save();
            return Ok(article);
        }
        [HttpPut("{id:int}")]
        [Authorize(Roles = "User,Admin")]

        public async Task<IActionResult> UpdateArticle(int id, [FromForm] ArticleUpdateRequest request)
        {
            var article = await _unitOfWork.Articles.GetAsync(q => q.Id == id);
            if (article == null)
            {
                throw new Exception("Article Not Found");
            }
            if (request.Thumbnails != null)
            {
                article.ImagePath = await _imageRepository.SaveFile(request.Thumbnails);
            }
            article.Title = request.Title;
            article.Content = request.Content;
            _unitOfWork.Articles.Update(article);
            await _unitOfWork.Save();
            return Ok(article);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            var result = await _articleRepository.DeleteArticle(id);
            return Ok(new Response(result));
        }
    }
}