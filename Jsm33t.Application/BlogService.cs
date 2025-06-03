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

        public Task<IEnumerable<BlogListDto>> GetBlogListAsync(
               int pageNumber, int pageSize,
               int? categoryId = null,
               int? seriesId = null,
               bool? isPublished = null,
               string? search = null
           ) =>
               _repo.GetBlogListAsync(pageNumber, pageSize, categoryId, seriesId, isPublished, search);
    }
}
