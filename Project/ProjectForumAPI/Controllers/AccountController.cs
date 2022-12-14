using System.Security.Claims;
using Articles.DTOs.UserRequest;
using Articles.Models.Data.AggregateUsers;
using Articles.Models.DTOs;
using Articles.Models.Response;
using Articles.Services.ImageRepositories;
using Articles.Services.Resource;
using Articles.Services.UserRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
namespace Articles.Controllers
{
    [Route("forum/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private UserManager<ApiUser> _userManager;
        private readonly SignInManager<ApiUser> _signInManager;
        private HttpContextAccessor _httpContextAccessor;
        private readonly IImageRepository _imageRepository;
        public AccountController(IUserRepository userRepository, IConfiguration configuration,
        UserManager<ApiUser> userManager,
        IImageRepository imageRepository,
        SignInManager<ApiUser> signInManager)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _userManager = userManager;
            _imageRepository = imageRepository;
            _signInManager = signInManager;
        }

        [HttpPost]
        [Route("/register")]
        public async Task<IActionResult> Register([FromBody] UserDTO userDTO)
        {
            var result = await _userRepository.RegisterAsync(userDTO);

            return Ok(new Response(Resource.REGISTER_SUCCESS));
        }

        [HttpPost]
        [Route("/login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO loginUserDTO)
        {
            var result = await _userRepository.LoginAsync(loginUserDTO);
            // var qr = _userManager.Users.Count();
            return Ok(new Response(Resource.LOGIN_SUCCESS, null, new { Token = result }));
        }

        [HttpGet("/logout")]
        public async Task<IActionResult> Logout()
        {

            var result = await _userRepository.LogoutAsync();
            return Ok(new Response(result));
        }

        [HttpGet("/confirmemail")]
        public async Task<IActionResult> ConfirmEmail(Guid userId, string token)
        {
            var result = await _userRepository.ConfirmEmailAsync(userId, token);
            return Redirect($"{_configuration["AppUrl"]}/confirmemail.html");
        }

        [HttpPost("/ForgetPassword")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var result = await _userRepository.ForgetPasswordAsync(email);
            return Ok(new Response(result));
        }

        [HttpPost("/ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromForm] ResetPasswordDTO resetPasswordDTO)
        {
            var result = await _userRepository.ResetPasswordAsync(resetPasswordDTO);
            return Ok(new Response(result));
        }
        [HttpGet("/UserInfo")]
        [Authorize]
        public async Task<IActionResult> UserInfo()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApiUser user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                throw new Exception("Không tìm thấy thông tin do Id không tồn tại.");
            }
            var result = new
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Avatar = user.Avatar,
                Id = id,
                IsAdmin = user.isAdmin
            };
            return Ok(result);
        }
        [HttpPost("/UpdateUser")]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromForm] UserUpdateRequest request)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApiUser user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                throw new Exception("Không tìm thấy thông tin do Id không tồn tại.");
            }
            if (!string.IsNullOrEmpty(request.FirstName))
                user.FirstName = request.FirstName;
            if (!string.IsNullOrEmpty(request.LastName))
                user.LastName = request.LastName;
            // if (request.Thumbnails != null)
            // {
            //     user.Avatar = await _imageRepository.SaveFile(request.Thumbnails);
            // }
            await _userManager.UpdateAsync(user);
            await _signInManager.RefreshSignInAsync(user);
            return Ok(user);
        }
        [HttpPost("/UpdateAvatarUser")]
        [Authorize]
        public async Task<IActionResult> UpdateAvatarUser([FromForm] UserUpdateAvatarRequest request)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApiUser user = await _userManager.FindByIdAsync(id);
            if (request.Thumbnails != null)
            {
                user.Avatar = await _imageRepository.SaveFile(request.Thumbnails);
            }
            await _userManager.UpdateAsync(user);
            await _signInManager.RefreshSignInAsync(user);
            return Ok(user);
        }

    }
}