using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Articles.Models;
using Articles.Models.Data.AggregateMails;
using Articles.Models.Data.AggregateUsers;
using Articles.Models.DTOs;
using Articles.Services.Mail;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Tokens;

namespace Articles.Services.UserRepositories
{
    public class UserRepository : IUserRepository
    {
        private ApiUser _user;
        private readonly UserManager<ApiUser> _userManager;
        private readonly SignInManager<ApiUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ISendMailService _sendMailService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;



        public UserRepository(UserManager<ApiUser> userManager,
                           SignInManager<ApiUser> signInManager,
                           IConfiguration configuration,
                           ISendMailService sendMailService,
                           IHttpContextAccessor httpContextAccessor,
                           IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _sendMailService = sendMailService;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }

        public async Task<bool> RegisterAsync(UserDTO userDTO)
        {
            var user = _mapper.Map<ApiUser>(userDTO);
            user.UserName = userDTO.Email;
            var result = await _userManager.CreateAsync(user, userDTO.Password);
            if (!result.Succeeded)
            {
                List<string> error = new List<string>();
                foreach (var e in result.Errors)
                {
                    error.Add(e.Description);
                }
                throw new BusinessException(error[0]);
            }

            var confirmEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var encodedEmailToken = Encoding.UTF8.GetBytes(confirmEmailToken);
            var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

            string url = $"{_configuration["AppUrl"]}/api/account/confirmemail?userid={user.Id}&token={validEmailToken}";

            var mailContent = new MailContent();
            mailContent.To = userDTO.Email;
            mailContent.Subject = "test";
            mailContent.Body = $"<p> test <a href='{url}'>Click here</a></p>";
            await _sendMailService.SendMailAsync(mailContent);
            await _userManager.AddToRolesAsync(user, userDTO.Roles);
            return true;
        }

        // TODO: Login --- done

        public async Task<string> LoginAsync(LoginUserDTO loginUserDTO)
        {
            _user = await _userManager.FindByEmailAsync(loginUserDTO.Email);
            var validPassword = await _userManager.CheckPasswordAsync(_user, loginUserDTO.Password);
            if (_user != null && validPassword)
            {
                return await CreateTokenAsync();
            }
            throw new BusinessException(Resource.Resource.LOGIN_FAIL);
        }

        // TODO:: LogoutAsync
        public async Task<string> LogoutAsync()
        {
            var identity = (ClaimsIdentity)_httpContextAccessor.HttpContext.User.Identity;

            IEnumerable<Claim> claims = identity.Claims;

            var usernameClaim = claims
                .Where(x => x.Type == ClaimTypes.Name)
                .FirstOrDefault();

            var user = await _userManager.FindByNameAsync(usernameClaim.Value);
            var result = await _userManager.RemoveAuthenticationTokenAsync(user, "Web", "Access");
            if (result.Succeeded)
            {
                return Resource.Resource.LOGOUT_SUCCESS;
            }
            throw new BusinessException(Resource.Resource.LOGOUT_FAIL);
        }

        // TODO: CreateTokenAsync
        public async Task<string> CreateTokenAsync()
        {
            var signingCredentials = GetSigningCredentials();
            var claims = await GetClaims();
            var token = GenerateTokenOptions(signingCredentials, claims);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var expiration = DateTime.Now.AddMinutes(Convert.ToDouble(
                jwtSettings.GetSection("lifetime").Value));

            var token = new JwtSecurityToken(
                issuer: jwtSettings.GetSection("Issuer").Value,
                claims: claims,
                expires: expiration,
                signingCredentials: signingCredentials
                );
            return token;
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, _user.UserName),
                new Claim(ClaimTypes.NameIdentifier, _user.Id),
            };
            var roles = await _userManager.GetRolesAsync(_user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            return claims;
        }

        private SigningCredentials GetSigningCredentials()
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = jwtSettings.GetSection("Key").Value;
            var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }


        // TODO: Confirm Email --- done
        public async Task<string> ConfirmEmailAsync(Guid userId, string key)
        {
            List<string> error = new List<string>();
            var user = await _userManager.FindByIdAsync(userId.ToString());
            var code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(key));
            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded)
            {
                return Resource.Resource.CONFIRMED_SUCCESS;
            }
            else
            {
                foreach (var e in result.Errors)
                {
                    error.Add(e.Description);
                }
                throw new BusinessException(error[0]);
            }
        }


        // TODO: Forget Password --- done
        public async Task<string> ForgetPasswordAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
            {
                return Resource.Resource.FORGET_PASSWORD_SUCCESS;
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = Encoding.UTF8.GetBytes(token);
            var validToken = WebEncoders.Base64UrlEncode(encodedToken);
            string url = $"{_configuration["AppUrl"]}/ResetPassword?email={email}&token={validToken}";

            var mailContent = new MailContent();
            mailContent.To = email;
            mailContent.Subject = "Sign In Articles Page";
            mailContent.Body = "<h1>Follow the instructions to reset your password</h1>" + $"<p>Please click the link to reset your password: <a href='{url}'>Click here</a></p>";
            await _sendMailService.SendMailAsync(mailContent);
            throw new BusinessException(Resource.Resource.FORGET_PASSWORD_SUCCESS);
        }
        // TODO: Reset Password --- done    

        public async Task<string> ResetPasswordAsync(ResetPasswordDTO resetPasswordDTO)
        {
            if (resetPasswordDTO.Token == null)
            {
                throw new BusinessException(Resource.Resource.ERROR_400);
            }
            var user = await _userManager.FindByEmailAsync(resetPasswordDTO.Email);
            if (user == null)
            {
                throw new BusinessException(Resource.Resource.ERROR_400);
            }
            if (resetPasswordDTO.NewPassword != resetPasswordDTO.ConfirmPassword)
            {
                throw new BusinessException(Resource.Resource.ERROR_400);
            }

            var decodedToken = WebEncoders.Base64UrlDecode(resetPasswordDTO.Token);
            string normalToken = Encoding.UTF8.GetString(decodedToken);

            var result = await _userManager.ResetPasswordAsync(user, normalToken, resetPasswordDTO.NewPassword);
            if (result.Succeeded)
            {
                return Resource.Resource.RESET_PASSWORD_SUCCESS;
            }
            return Resource.Resource.RESET_PASSWORD_FAIL;
        }


    }

}
