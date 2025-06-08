namespace Jsm33t.Contracts.Dtos.Responses
{
    public class ChangeLogResponseDto
    {
        public int Id { get; set; }
        public string Version { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ChangeType { get; set; }
        public string Contributors { get; set; }
        public DateTime ChangedAt { get; set; }
        
    }
    public class VersionGroupedChangeLogDto
    {
        public string Version { get; set; }
        public List<ChangeLogResponseDto> Changes { get; set; }
    }
    public class ChangeLogListResponseDto
    {
        public string Title { get; set; }
    }

}
