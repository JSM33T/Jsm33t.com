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
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
        {
            services.AddValidatorsFromAssembly(Assembly.Load("Jsm33t.Validators"));

            services.AddScoped<IMailService, SmtpMailService>();
            services.AddSingleton<ICloudinaryService, CloudinaryService>();
            services.AddScoped<IChangeLogRepository, ChangeLogRepository>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IChangeLogService, ChangeLogService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IDapperFactory, DapperFactory>();

            services.AddSingleton<IDispatcher, Dispatcher>();
            services.AddScoped<IJobHistoryRepository, JobHistoryRepository>();
            services.AddHostedService<JobWorker>();

            services.AddHttpClient<ITelegramService, TelegramService>();

            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<IProfileRepository, ProfileRepository>();
            

            return services;
        }
    }
}
