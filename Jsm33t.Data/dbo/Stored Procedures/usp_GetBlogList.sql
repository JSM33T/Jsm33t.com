
CREATE PROCEDURE [dbo].[usp_GetBlogList]
    @PageNumber     INT = 1,
    @PageSize       INT = 10,
    @CategorySlug   NVARCHAR(100) = NULL,
    @CategoryId     INT = NULL,
    @SeriesId       INT = NULL,
    @IsPublished    BIT = NULL,
    @Search         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Main paginated query
    SELECT 
        b.Id,
        b.RowId,
        b.Title,
        b.Slug,
        b.Summary,
        b.CoverImageUrl,
        c.Title AS Category,
        ISNULL(s.Id, 0) AS Series,
        b.CreatedAt,
        b.ViewCount,
        b.LikeCount,
        b.IsFeatured,
        1 AS Status
    FROM Blog b
    LEFT JOIN BlogCategory c ON b.CategoryId = c.Id
    LEFT JOIN BlogSeries s ON b.SeriesId = s.Id
    WHERE 
        (
            (@CategoryId IS NOT NULL AND b.CategoryId = @CategoryId) OR
            (@CategorySlug IS NOT NULL AND c.Slug = @CategorySlug)
            OR (@CategoryId IS NULL AND @CategorySlug IS NULL)
        ) AND
        (@SeriesId IS NULL OR b.SeriesId = @SeriesId) AND
        (@IsPublished IS NULL OR b.IsPublished = @IsPublished) AND
        (
            @Search IS NULL OR
            b.Title LIKE '%' + @Search + '%' OR
            b.Summary LIKE '%' + @Search + '%'
        )
    ORDER BY 
        b.PublishedAt DESC,
        b.Id DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS 
    FETCH NEXT @PageSize ROWS ONLY;

    -- Total Count
    SELECT COUNT(1)
    FROM Blog b
    LEFT JOIN BlogCategory c ON b.CategoryId = c.Id
    WHERE 
        (
            (@CategoryId IS NOT NULL AND b.CategoryId = @CategoryId) OR
            (@CategorySlug IS NOT NULL AND c.Slug = @CategorySlug)
            OR (@CategoryId IS NULL AND @CategorySlug IS NULL)
        ) AND
        (@SeriesId IS NULL OR b.SeriesId = @SeriesId) AND
        (@IsPublished IS NULL OR b.IsPublished = @IsPublished) AND
        (
            @Search IS NULL OR
            b.Title LIKE '%' + @Search + '%' OR
            b.Summary LIKE '%' + @Search + '%'
        );
END