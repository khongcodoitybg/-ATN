
using Articles.Models.Data.DbContext;
using Articles.Services.ServiceSetting;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Articles
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.ConfigureCors();

            services.AddRazorPages();
            services.AddAuthorization(options =>
{
    options.AddPolicy("ElevatedRights", policy =>
          policy.RequireRole("Admin", "User"));
});
            services.ConfigureEmailService(Configuration);

            services.ConfigureIdentity();

            services.AddAutoMapper(typeof(Startup));

            services.AddControllers(opt =>
                    {
                        opt.AllowEmptyInputInBodyModelBinding = false;
                    }).AddNewtonsoftJson(op =>
                                op.SerializerSettings.ReferenceLoopHandling =
                                Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                                .AddFluentValidation();

            services.AddDbContext<DatabaseContext>(options =>
                      {
                          string connectString = Configuration.GetConnectionString("DatabaseContext");
                          options.UseSqlServer(connectString);
                      });

            services.ConfigureJWT(Configuration);

            services.ConfigureServices();

            services.ConfigureIdentityOptions();

            services.ConfigureSwagger();

            services.ConfigureValidation();
        }

        //* This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Article v1"));

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.ConfigureExceptionHandler();

            app.UseRouting();

            app.UseCors("AllowAll");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                endpoints.MapControllers();

            });
        }
    }
}