namespace Jsm33t.Infra.Telegram
{
    public class MockTelegramService : ITelegramService
    {
        public Task SendToMultipleAsync(IEnumerable<string> chatIds, string message)
        {
            foreach (var chatId in chatIds)
                Console.WriteLine($"[MOCK TELEGRAM] To: {chatId} | Message: {message}");
            return Task.CompletedTask;
        }

        public Task SendToOneAsync(string chatId, string message)
        {
            Console.WriteLine($"[MOCK TELEGRAM] To: {chatId} | Message: {message}");
            return Task.CompletedTask;
        }
    }
}
