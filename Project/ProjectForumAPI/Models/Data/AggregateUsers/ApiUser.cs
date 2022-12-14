using Articles.Models.Data.AggregateArticles;
using Microsoft.AspNetCore.Identity;
namespace Articles.Models.Data.AggregateUsers
{
    public class ApiUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
        public string Avatar { get; set; }
        /// <summary>
        /// Bài viết của đối tượng
        /// </summary>
        public ICollection<Article> Articles { get; set; }
        public bool isAdmin { get; set; } = false;
    }
}