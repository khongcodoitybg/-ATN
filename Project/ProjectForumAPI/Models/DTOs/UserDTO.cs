namespace Articles.Models.DTOs
{
    public class LoginUserDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }
    public class UserDTO : LoginUserDTO
    {
        public string ConfirmPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool isAdmin { get; set; }
        public ICollection<string> Roles { get; set; }
    }

    public class ResetPasswordDTO
    {
        public string Token { get; set; }
        public string Email { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}