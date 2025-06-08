
CREATE PROCEDURE [dbo].[usp_GetBlogList]
    @PageNumber INT = 1,
    @PageSize   INT = 10,
    @CategoryId INT = NULL,
    @SeriesId   INT = NULL,
    @IsPublished BIT = NULL,
    @Search NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        b.Id, b.RowId, b.Title, b.Slug, b.Summary, b.CoverImageUrl,
        c.Title AS Category,
        s.Title AS Series,
        b.CreatedAt, b.ViewCount, b.LikeCount, b.IsFeatured, b.Status
    FROM Blog b
    LEFT JOIN BlogCategory c ON b.CategoryId = c.Id
    LEFT JOIN BlogSeries s ON b.SeriesId = s.Id
    WHERE 
        (@CategoryId IS NULL OR b.CategoryId = @CategoryId) AND
        (@SeriesId IS NULL OR b.SeriesId = @SeriesId) AND
        (@IsPublished IS NULL OR b.IsPublished = @IsPublished)
        AND (@Search IS NULL OR b.Title LIKE '%' + @Search + '%' OR b.Summary LIKE '%' + @Search + '%')
    ORDER BY b.PublishedAt DESC, b.Id DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS FETCH NEXT @PageSize ROWS ONLY;
END
