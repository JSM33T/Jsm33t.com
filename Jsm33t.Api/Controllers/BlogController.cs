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
        public async Task<ActionResult<ApiResponse<IEnumerable<BlogListDto>>>> GetBlogList(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] int? categoryId = null,
            [FromQuery] int? seriesId = null,
            [FromQuery] bool? isPublished = null,
            [FromQuery] string? search = null)
        {
            var blogs = await blogService.GetBlogListAsync(pageNumber, pageSize, categoryId, seriesId, isPublished, search);
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
           var blogCategory = new BlogCategory
           {
               Title = "Something",
               Slug = "something",
               IsActive = true
           };
           blogCategories.Add(blogCategory);
            return RESP_Success(blogCategories);
        }
    }
}
