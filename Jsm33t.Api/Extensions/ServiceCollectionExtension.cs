using FluentValidation;
using Jsm33t.Application;
using Jsm33t.Contracts.Interfaces.Repositories;
using Jsm33t.Contracts.Interfaces.Services;
using Jsm33t.Infra.Background;
using Jsm33t.Infra.Dapper;
using Jsm33t.Infra.ImageHost;
using Jsm33t.Infra.MailService;
using Jsm33t.Infra.MailService.SmtpMail;
using Jsm33t.Infra.Telegram;
using Jsm33t.Infra.Token;
using Jsm33t.Repositories;
using System.Reflection;

namespace Jsm33t.Api.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IWebHostEnvironment env)
        {
            services.AddValidatorsFromAssembly(Assembly.Load("Jsm33t.Validators"));

            

            services.AddSingleton<ICloudinaryService, CloudinaryService>();
            services.AddScoped<IChangeLogRepository, ChangeLogRepository>();
            services.AddScoped<IChangeLogService, ChangeLogService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IDapperFactory, DapperFactory>();
            
            services.AddScoped<IJobHistoryRepository, JobHistoryRepository>();
            services.AddHostedService<JobWorker>();
            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<IProfileRepository, ProfileRepository>();

            if (env.IsDevelopment())
            {
                services.AddScoped<IMailService, MockMailService>();
                services.AddSingleton<ITelegramService, MockTelegramService>();
                services.AddScoped<ITokenService, MockTokenService>();
            }
            else
            {
                services.AddScoped<IMailService, SmtpMailService>();
                services.AddHttpClient<ITelegramService, TelegramService>();
                services.AddScoped<ITokenService, TokenService>();
            }

            services.AddSingleton<IDispatcher, Dispatcher>();

            return services;
        }
    }
}
