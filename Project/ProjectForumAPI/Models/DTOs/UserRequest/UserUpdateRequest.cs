using System.ComponentModel.DataAnnotations;

namespace Articles.DTOs.UserRequest
{
    public class UserUpdateRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        // [DataType(DataType.Upload)]
        // public IFormFile Thumbnails { get; set; }
    }
}