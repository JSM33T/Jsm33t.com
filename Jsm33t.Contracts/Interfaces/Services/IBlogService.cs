using Jsm33t.Contracts.Dtos;

namespace Jsm33t.Contracts.Interfaces.Services
{
    public interface IBlogService
    {
        Task<IEnumerable<BlogListDto>> GetBlogListAsync(
         int pageNumber, int pageSize,
         int? categoryId = null,
         int? seriesId = null,
         bool? isPublished = null,
         string? search = null);

        Task<BlogDetailDto?> GetBlogBySlugAsync(string slug);
    }

}
