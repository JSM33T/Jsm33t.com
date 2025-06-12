using Jsm33t.Contracts.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jsm33t.Contracts.Interfaces.Repositories
{
    public interface IBlogRepository
    {
        Task<BlogDetailDto?> GetBlogBySlugAsync(string slug);
        Task<BlogListResponse> GetBlogListAsync(
            int pageNumber,
            int pageSize,
            string? categorySlug = null,
            int? categoryId = null,
            int? seriesId = null,
            bool? isPublished = null,
            string? search = null);
    }
}
