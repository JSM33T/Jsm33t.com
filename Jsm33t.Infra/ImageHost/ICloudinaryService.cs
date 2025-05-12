using Microsoft.AspNetCore.Http;

namespace Jsm33t.Infra.ImageHost
{
    public interface ICloudinaryService
    {
        Task<string?> UploadProfilePictureAsync(IFormFile file, Guid userId);
    }
}