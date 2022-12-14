using Articles.Models.Data.AggregateArticles;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Articles.Configuration.Entities
{
    public class ArticleConfiguration : IEntityTypeConfiguration<Article>
    {
        public void Configure(EntityTypeBuilder<Article> builder)
        {
            builder.HasData(
                new Article
                {
                    Id = 1,
                    Title = "Bài viết số 1",
                    CreatedDate = new System.DateTime(2023, 1, 1),
                    Content = "Nội dung bài viết  số 1",
                    ViewCount = 100,
                    ImagePath = "images/"
                },
                new Article
                {
                    Id = 2,
                    Title = "Đây là bài viết 2",
                    CreatedDate = new System.DateTime(2023, 1, 1),
                    Content = "Content of article 2",
                    ViewCount = 200,
                    ImagePath = "images/"
                },
                new Article
                {
                    Id = 3,
                    Title = "Bài viết số 3",
                    CreatedDate = new System.DateTime(2023, 1, 1),
                    Content = "Nội dung bài viết số 3",
                    ViewCount = 300,
                    ImagePath = "images/"
                }
            );
            builder.HasKey(options => options.Id);
            builder.Property(x => x.ImagePath).HasMaxLength(500).IsRequired(false);
            builder.HasOne(x => x.ApiUser).WithMany(x => x.Articles).HasForeignKey(x => x.UserId);
        }
    }
}
