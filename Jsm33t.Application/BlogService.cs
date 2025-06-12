using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Repositories;
using Jsm33t.Contracts.Interfaces.Services;
using Microsoft.AspNetCore.Http;

namespace Jsm33t.Application
{
    public class BlogService(IBlogRepository repo) : IBlogService
    {
        private readonly IBlogRepository _repo = repo;

        public Task<BlogDetailDto?> GetBlogBySlugAsync(string slug) =>
         _repo.GetBlogBySlugAsync(slug);

        public async Task<BlogListResponse> GetBlogListAsync(
           int pageNumber,
           int pageSize,
           string? categorySlug = null,
           int? seriesId = null,
           bool? isPublished = null,
           string? search = null)
        {
            // Pass null for categoryId since you're only using slug
            return await _repo.GetBlogListAsync(
                pageNumber: pageNumber,
                pageSize: pageSize,
                categorySlug: categorySlug,
                categoryId: null,
                seriesId: seriesId,
                isPublished: isPublished,
                search: search
            );
        }

    }
}
