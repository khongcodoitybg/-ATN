using System.ComponentModel.DataAnnotations;

namespace Articles.DTOs.UserRequest
{
    public class UserUpdateAvatarRequest
    {
        [DataType(DataType.Upload)]
        public IFormFile Thumbnails { get; set; }
    }
}