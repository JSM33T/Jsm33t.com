using Jsm33t.Contracts.Dtos;

namespace Jsm33t.Contracts.Interfaces.Services
{
    public interface IBlogService
    {
        Task<BlogListResponse> GetBlogListAsync(
          int pageNumber,
          int pageSize,
          string? categorySlug = null,
          int? seriesId = null,
          bool? isPublished = null,
          string? search = null);

        Task<BlogDetailDto?> GetBlogBySlugAsync(string slug);
    }

}
