namespace Jsm33t.Shared.ConfigModels
{
    public class FcConfig
    {
        public SqlConfig? SqlConfig { get; set; }
        public MongoConfig? MongoConfig { get; set; }
        public Toggles? Toggles { get; set; }
        public JwtConfig? JwtConfig { get; set; }
        public TelegramConfig? TeleConfig { get; set; }
        public CloudinaryConfig? CloudinaryConfig { get; set; }
        public SmtpConfig? SmtpSettings { get; set; }
        public Urls? BaseUrls { get; set; }
        public AppsApi appsApi { get; set; }
    }
    public class Urls
    {
        public string? BaseApiUrl{ get; set; }
        public string? BaseUiUrl { get; set; }
    }
    public class Toggles
    {
        public bool IncludeResponseTime { get; set; }
    }
    public class SqlConfig
    {
        public string? ConnectionString { get; set; }
    }

    public class MongoConfig
    {
        public string? ConnectionString { get; set; }
        public string? DatabaseName { get; set; }
    }

    public class JwtConfig {
        public string? Issuer { get; set; }
        public string? Audience { get; set; }
        public string? Key { get; set; }
    }
    public class TelegramConfig {
        public string? BotToken { get; set; }
        public double LogChatId { get; set; }
    }
    public class CloudinaryConfig
    {
        public string? CloudName { get; set; }
        public string? ApiKey { get; set; }
        public string? ApiSecret { get; set; }
    }

    public class SmtpConfig
    {
        public string Host { get; set; } = string.Empty;
        public int Port { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string From { get; set; } = string.Empty;
        public bool EnableSsl { get; set; } = true;
    }
    public class AppsApi
    {
        public required string Key { get; set; }
        public  required string Url{ get; set; }
    }
}
