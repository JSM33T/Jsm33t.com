using Dapper;
using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Interfaces.Repositories;
using Jsm33t.Infra.Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jsm33t.Repositories
{
    public class BlogRepository(IDapperFactory factory) : IBlogRepository
    {

        private readonly IDbConnection _db = factory.CreateConnection();

        public async Task<BlogListResponse> GetBlogListAsync(
            int pageNumber,
            int pageSize,
            string? categorySlug = null,
            int? categoryId = null,
            int? seriesId = null,
            bool? isPublished = null,
            string? search = null)
        {
            var p = new DynamicParameters();
            p.Add("@PageNumber", pageNumber);
            p.Add("@PageSize", pageSize);
            p.Add("@CategorySlug", categorySlug);
            p.Add("@CategoryId", categoryId);
            p.Add("@SeriesId", seriesId);
            p.Add("@IsPublished", isPublished);
            p.Add("@Search", search);

            using var multi = await _db.QueryMultipleAsync(
                "usp_GetBlogList",
                p,
                commandType: CommandType.StoredProcedure
            );

            var items = await multi.ReadAsync<BlogListDto>();
            var total = await multi.ReadFirstAsync<int>();

            return new BlogListResponse
            {
                Items = items,
                TotalCount = total
            };
        }


        public async Task<BlogDetailDto?> GetBlogBySlugAsync(string slug)
        {
            var result = await _db.QueryFirstOrDefaultAsync<BlogDetailDto>(
                "SELECT b.Id, b.RowId, b.Title, b.Slug, b.Summary, b.Content, b.CoverImageUrl, " +
                "c.Title AS Category, s.Title AS Series, b.PublishedAt, b.ViewCount, b.LikeCount, " +
                "b.IsFeatured " +
                "FROM Blog b " +
                "LEFT JOIN BlogCategory c ON b.CategoryId = c.Id " +
                "LEFT JOIN BlogSeries s ON b.SeriesId = s.Id " +
                "WHERE b.Slug = @Slug",
                new { Slug = slug }
            );
            return result;
        }


    }
}
