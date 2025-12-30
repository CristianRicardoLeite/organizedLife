namespace OrganizedLife.API.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Add AutoMapper
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        // Register repositories
        // services.AddScoped<IUserRepository, UserRepository>();
        // services.AddScoped<ITransactionRepository, TransactionRepository>();
        // services.AddScoped<ICategoryRepository, CategoryRepository>();

        // Register services
        // services.AddScoped<IAuthService, AuthService>();
        // services.AddScoped<ITransactionService, TransactionService>();
        // services.AddScoped<ICategoryService, CategoryService>();

        return services;
    }

    // Configure JWT Authentication
    // public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
    // {
    //     var jwtSettings = configuration.GetSection("JwtSettings");
    //     var secretKey = jwtSettings["Secret"];
    //
    //     services.AddAuthentication(options =>
    //     {
    //         options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    //         options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    //     })
    //     .AddJwtBearer(options =>
    //     {
    //         options.TokenValidationParameters = new TokenValidationParameters
    //         {
    //             ValidateIssuerSigningKey = true,
    //             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
    //             ValidateIssuer = false,
    //             ValidateAudience = false,
    //             ClockSkew = TimeSpan.Zero
    //         };
    //     });
    //
    //     return services;
    // }
}
