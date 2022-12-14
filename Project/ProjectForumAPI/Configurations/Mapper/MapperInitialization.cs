using Articles.Models.Data.AggregateArticles;
using Articles.Models.Data.AggregateImage;
using Articles.Models.Data.AggregateUsers;
using Articles.Models.DTOs;
using Articles.Models.DTOs.ArticleImage;
using Articles.Models.DTOs.ArticleRequest;
using AutoMapper;
namespace Articles.Configurations.Mapper
{
    public class MapperInitialization : Profile
    {
        public MapperInitialization()
        {
            /// Mapper Article
            CreateMap<Article, ArticleViewRequest>().ReverseMap();
            CreateMap<Article, ArticleViewAdminRequest>().ReverseMap();

            CreateMap<Article, ArticleCreateRequest>().ReverseMap();
            CreateMap<Article, ArticleUpdateRequest>().ReverseMap();
            CreateMap<Article, ArticleUpdateByAdminRequest>().ReverseMap();

            /// Mapper User
            CreateMap<ApiUser, UserDTO>().ReverseMap();
        }
    }
}