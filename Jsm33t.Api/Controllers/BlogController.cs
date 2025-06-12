using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Jsm33t.Api.Controllers
{
    [Route("api")]
    [ApiController]
    public class BlogController(IBlogService blogService) : FcBaseController
    {
        [HttpGet("blog/list")]
        public async Task<ActionResult<ApiResponse<BlogListResponse>>> GetBlogList(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? categorySlug = null,
            [FromQuery] int? seriesId = null,
            [FromQuery] bool? isPublished = null,
            [FromQuery] string? search = null)
        {
            var blogs = await blogService.GetBlogListAsync(pageNumber, pageSize, categorySlug, seriesId, isPublished, search);
            return RESP_Success(blogs);
        }

        [HttpGet("blog/{slug}")]
        public async Task<ActionResult<ApiResponse<BlogDetailDto>>> GetBlogBySlug(string slug)
        {
            var blog = await blogService.GetBlogBySlugAsync(slug);
            if (blog == null)
                return RESP_NotFoundResponse<BlogDetailDto>($"Blog not found for slug: {slug}");
            return RESP_Success(blog);
        }

        [HttpGet("blogs/categories")]
        public async Task<ActionResult<ApiResponse<List<BlogCategory>>>> GetBlogByCategories()
        {
            var blogCategories = new List<BlogCategory>();

            var category1 = new BlogCategory
            {
                Id = 1,
                Title = "Technology",
                Slug = "tech",
                IsActive = true
            };

            var category2 = new BlogCategory
            {
                Id = 2,
                Title = "General",
                Slug = "general",
                IsActive = true
            };

            blogCategories.Add(category1);
            blogCategories.Add(category2);

            return RESP_Success(blogCategories);
        }

    }
}
