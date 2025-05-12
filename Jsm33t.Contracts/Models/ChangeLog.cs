﻿namespace Jsm33t.Contracts.Models
{
    public class ChangeLog
    {
        public int Id { get; set; }
        public string Version { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ChangeType { get; set; }
        public string Contributors { get; set; }
        public int? ChangedBy { get; set; }
        public DateTime ChangedAt { get; set; }
        public Guid RowId { get; set; }
    }
}
