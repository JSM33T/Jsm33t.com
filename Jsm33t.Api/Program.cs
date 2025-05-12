using Jsm33t.Api.Extensions;
using Jsm33t.Api.Middlewares;
using Jsm33t.Shared.ConfigModels;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
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
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true,
            ValidIssuer = fcConfig.JwtConfig?.Issuer,
            ValidAudience = fcConfig.JwtConfig?.Issuer,
            ClockSkew = TimeSpan.Zero,
            IssuerSigningKey = new SymmetricSecurityKey(
                Convert.FromBase64String(fcConfig.JwtConfig?.Key!))
        };
    });

builder.Services.AddCors(o => o.AddPolicy("OpenPolicy", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));

builder.Services.AddInfrastructureServices();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseCors("OpenPolicy");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<RequestTimerMiddleware>();
app.UseMiddleware<FcRequestMiddleware>();
app.MapControllers();

await app.RunAsync();
