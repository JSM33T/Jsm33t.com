namespace Jsm33t.Infra.MailService
{
    public class MockMailService : IMailService
    {
        public List<(string To, string Subject, string Body, bool IsHtml)> SentEmails { get; } = new();

        public Task SendEmailAsync(string to, string subject, string body, bool isHtml = true)
        {
            SentEmails.Add((to, subject, body, isHtml));
            Console.WriteLine($"[MOCK EMAIL] To: {to}, Subject: {subject}, IsHtml: {isHtml} \n {body}");
            return Task.CompletedTask;
        }

        public Task SendEmailWithAttachmentAsync(string to, string subject, string body, byte[] attachment, string fileName, bool isHtml = true)
        {
            SentEmails.Add((to, subject, body, isHtml));
            Console.WriteLine($"[MOCK EMAIL W/ATTACHMENT] To: {to}, Subject: {subject}, File: {fileName}, IsHtml: {isHtml}");
            return Task.CompletedTask;
        }

        public Task SendBulkEmailAsync(IEnumerable<string> recipients, string subject, string body, bool isHtml = true)
        {
            foreach (var to in recipients)
                SentEmails.Add((to, subject, body, isHtml));
            Console.WriteLine($"[MOCK BULK EMAIL] Count: {(recipients is ICollection<string> c ? c.Count : 0)}, Subject: {subject}");
            return Task.CompletedTask;
        }
    }
}
