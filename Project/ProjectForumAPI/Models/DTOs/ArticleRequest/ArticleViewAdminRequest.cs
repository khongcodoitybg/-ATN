using Articles.Models.Data.AggregateUsers;

namespace Articles.Models.DTOs.ArticleImage
{
    public class ArticleViewAdminRequest
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public int ViewCount { get; set; }
        public DateTime CreatedDate { get; set; }
        public string UserId { get; set; }
        public string AuthorName { get; set; }
        public string ImagePath { get; set; }
        public bool IsActive { get; set; }
    }
}