namespace Jsm33t.Contracts.Dtos
{
    public class BlogListDto
    {
        public int Id { get; set; }
        public Guid RowId { get; set; }
        public required string Title { get; set; }
        public required string Slug { get; set; }
        public string? Summary { get; set; }
        public string? CoverImageUrl { get; set; }
        public required string Category { get; set; }
        public int Series { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int BlogYear => CreatedAt?.Year ?? 0;
        public int ViewCount { get; set; }
        public int LikeCount { get; set; }
        public bool IsFeatured { get; set; }
        public int Status { get; set; }
    }

}
