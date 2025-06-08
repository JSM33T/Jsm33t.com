namespace Jsm33t.Contracts.Dtos
{
    public class BlogCategory
    {
        public int Id { get; set; }
        public Guid RowId { get; set; }
        public required string Title { get; set; }
        public required string Slug { get; set; }
        public string? Summary { get; set; }
        public bool IsActive { get; set; }
    }

}
