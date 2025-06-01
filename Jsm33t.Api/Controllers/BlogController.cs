using Jsm33t.Contracts.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Jsm33t.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        //[HttpGet("{slug}")]
        //public async Task<ActionResult<ApiResponse<BlogPostDto>>> GetBlogBySlug(string slug) { ... }

        //[HttpGet("browse")]
        //public async Task<ActionResult<ApiResponse<PaginatedResult<BlogPostDto>>>> BrowseBlogs(
        //    [FromQuery] BlogSearchFilter filter, int page = 1, int pageSize = 10)
        //{ ... }

    }
}
