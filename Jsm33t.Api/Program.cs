using Jsm33t.Api.Extensions;
using Jsm33t.Api.Filters;
using Jsm33t.Api.Middlewares;
using Jsm33t.Shared.ConfigModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("Logs/errors-.log", rollingInterval: RollingInterval.Day, retainedFileCountLimit: 10)
    .CreateLogger();
builder.Host.UseSerilog();

builder.Services.AddControllers(options =>
{
    options.Filters.Add<DeductPointsFilter>();
})
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.Never;
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});


var fcConfig = builder.Configuration
    .GetSection("FcConfig")
    .Get<FcConfig>()!;
builder.Services.AddSingleton(fcConfig);

builder.Services.AddOpenApi();

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = fcConfig.JwtConfig?.Issuer,
            ValidAudience = fcConfig.JwtConfig?.Issuer,
            ClockSkew = TimeSpan.Zero,
            IssuerSigningKey = new SymmetricSecurityKey(
                Convert.FromBase64String(fcConfig.JwtConfig?.Key!))
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://jsm33t.com")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddInfrastructureServices(builder.Environment);

var app = builder.Build();
app.UseDeveloperExceptionPage();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseCors("DevCors");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<RequestTimerMiddleware>();
app.UseMiddleware<FcRequestMiddleware>();
app.MapControllers();
app.MapFallbackToFile("index.html");

await app.RunAsync();
