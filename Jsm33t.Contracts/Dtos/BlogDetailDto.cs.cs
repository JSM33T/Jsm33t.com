namespace Jsm33t.Contracts.Dtos
{
    public class BlogDetailDto
    {
        public int Id { get; set; }
        public Guid RowId { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Summary { get; set; }
        public string Content { get; set; }
        public string CoverImageUrl { get; set; }
        public string Category { get; set; }
        public string Series { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int BlogYear => CreatedAt?.Year ?? 0;
        public int ViewCount { get; set; }
        public int LikeCount { get; set; }
        public bool IsFeatured { get; set; }
        public int Status { get; set; }
    }
}
