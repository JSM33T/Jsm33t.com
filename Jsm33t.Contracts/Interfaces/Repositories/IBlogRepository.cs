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
        //Task<BlogPost?> GetBySlugAsync(string slug);
        Task<BlogDetailDto?> GetBlogBySlugAsync(string slug);
        Task<IEnumerable<BlogListDto>> GetBlogListAsync(int pageNumber, int pageSize, int? categoryId = null, int? seriesId = null, bool? isPublished = null, string? search = null);
    }


}
