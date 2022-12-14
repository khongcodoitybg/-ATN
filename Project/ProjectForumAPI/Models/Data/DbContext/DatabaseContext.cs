using Articles.Configuration.Entities;
using Articles.Models.Data.AggregateArticles;
using Articles.Models.Data.AggregateUsers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace Articles.Models.Data.DbContext
{
    public class DatabaseContext : IdentityDbContext<ApiUser>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        { }
        public DbSet<Article> Articles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new ArticleConfiguration());
            builder.ApplyConfiguration(new RoleConfiguration());
        }
    }
}

