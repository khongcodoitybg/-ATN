using Microsoft.EntityFrameworkCore;

namespace Articles.Models.BaseModels
{
    public class BaseModel
    {
        [Comment("Id bảng, khóa chính")]
        public int Id { get; set; }
        [Comment("Ngày tạo")]
        public DateTime CreatedDate { get; set; }
    }
}