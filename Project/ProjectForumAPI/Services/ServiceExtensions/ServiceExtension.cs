using System.Security.Claims;
using System.Text;
using Articles.GenericRepository;
using Articles.Models.Data.AggregateMails;
using Articles.Models.Data.AggregateUsers;
using Articles.Models.Data.DbContext;
using Articles.Models.DTOs;
using Articles.Models.DTOs.ArticleRequest;
using Articles.Models.DTOs.Validation;
using Articles.Models.Errors;
using Articles.Services.ArticleRepositories;
using Articles.Services.ImageRepositories;
using Articles.Services.Mail;
using Articles.Services.StorageServices;
using Articles.Services.UserRepositories;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;

namespace Articles.Services.ServiceSetting
{
    public static class Services
    {
        public static IConfiguration Configuration { get; }
        /// <summary>
        /// Đăng kí dịch vụ user, role
        /// </summary>
        public static void ConfigureIdentity(this IServiceCollection services)
        {
            services.AddIdentity<ApiUser, IdentityRole>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<DatabaseContext>()
            .AddDefaultTokenProviders();
        }

        /// <summary>
        /// Đăng kí dịch vụ JWT provider
        /// </summary>
        public static void ConfigureJWT(this IServiceCollection services, IConfiguration Configuration)
        {
            var jwtSettings = Configuration.GetSection("Jwt");
            var key = jwtSettings.GetSection("Key").Value;
            services.AddAuthentication(option =>
                {
                    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
            .AddJwtBearer(option =>
              {
                  option.TokenValidationParameters = new TokenValidationParameters()
                  {
                      ValidateIssuer = true,
                      ValidateAudience = false,
                      ValidateLifetime = true,
                      ValidateIssuerSigningKey = true,
                      ValidIssuer = jwtSettings.GetSection("Issuer").Value,
                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                  };
              });
        }

        /// <summary>
        /// Đăng kí dịch vụ ngoại lệ
        /// </summary>
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(
                error =>
                {
                    error.Run(async context =>
                    {
                        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                        context.Response.ContentType = "application/json";
                        var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                        if (contextFeature != null)
                        {
                            Log.Error($"Something Went Wrong in the {contextFeature.Error}");

                            await context.Response.WriteAsync(new Error
                            {
                                StatusCode = context.Response.StatusCode,
                                Message = contextFeature.Error.Message
                            }.ToString());
                        }
                    });
                }
            );
        }

        /// <summary>
        /// Đăng kí dịch vụ validate dữ liệu đầu vào
        /// </summary>
        public static void ConfigureValidation(this IServiceCollection services)
        {
            services.AddTransient<IValidator<UserDTO>, UserValidation>();
            services.AddTransient<IValidator<ArticleCreateRequest>, ArticleValidation>();
        }

        /// <summary>
        /// Đăng kí các dịch vụ liên quan tới service
        /// </summary>
        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddTransient<IStorageService, StorageService>();
            services.AddTransient<IImageRepository, ImageRepository>();
            services.AddTransient<IArticleRepository, ArticleRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<ISendMailService, SendMailService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        /// <summary>
        /// Setup
        /// </summary>
        public static void ConfigureIdentityOptions(this IServiceCollection services)
        {
            services.Configure<IdentityOptions>(options =>
            {
                // : Setting Password
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 1;
                options.Password.RequiredUniqueChars = 1;

                // Cấu hình Lockout - khóa user
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(1);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;
                // Cấu hình về User.
                options.User.AllowedUserNameCharacters =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = true;
                // Cấu hình đăng nhập.
                options.SignIn.RequireConfirmedEmail = false;
                options.SignIn.RequireConfirmedPhoneNumber = false;
            });
        }

        /// <summary>
        /// Cấu hình Swagger
        /// </summary>
        public static void ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Articles API", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                  {
                    {
                      new OpenApiSecurityScheme
                      {
                        Reference = new OpenApiReference
                          {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                          },
                          Scheme = "oauth2",
                          Name = "Bearer",
                          In = ParameterLocation.Header,
                        },
                        new List<string>()
                      }
                    });
            });
            IMvcBuilder builder = services.AddRazorPages();
        }
        /// <summary>
        /// Cấu hình gửi mail
        /// </summary>
        public static void ConfigureEmailService(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddOptions();
            var mailSettings = Configuration.GetSection("Mailsettings");
            services.Configure<MailSettings>(mailSettings);
        }
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(o =>
                       {
                           o.AddPolicy("AllowAll", builder =>
                               builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader());
                       });
        }
    }
}
