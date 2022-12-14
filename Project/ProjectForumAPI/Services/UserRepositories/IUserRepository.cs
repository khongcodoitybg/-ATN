using Articles.Models.DTOs;

namespace Articles.Services.UserRepositories
{
    public interface IUserRepository
    {
        /// <summary>
        /// Xử lý đăng kí tài khoản
        /// </summary>
        Task<bool> RegisterAsync(UserDTO userDTO);
        /// <summary>
        /// Xử lý đăng nhập tài khoản
        /// </summary>
        Task<string> LoginAsync(LoginUserDTO loginUserDTO);
        /// <summary>
        /// Xử lý đăng suất tài khoản
        /// </summary>
        Task<string> LogoutAsync();
        /// <summary>
        /// Tạo mã token
        /// </summary>
        Task<string> CreateTokenAsync();
        /// <summary>
        /// Xác nhận email
        /// </summary>
        Task<string> ConfirmEmailAsync(Guid userId, string key);
        /// <summary>
        /// Xử lý quên mật khẩu
        /// </summary>
        Task<string> ForgetPasswordAsync(string email);
        /// <summary> 
        /// Xử lý đổi mật khẩu
        /// </summary>
        Task<string> ResetPasswordAsync(ResetPasswordDTO resetPasswordDTO);
    }

}
