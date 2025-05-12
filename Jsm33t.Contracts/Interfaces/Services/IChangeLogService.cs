using Jsm33t.Contracts.Dtos.Requests;
using Jsm33t.Contracts.Dtos.Responses;

namespace Jsm33t.Contracts.Interfaces.Repositories
{
    public interface IChangeLogService
    {
        Task<int> AddBulkChangeLogsAsync(ChangeLogBulkRequestDto bulkDto);
        Task<IEnumerable<VersionGroupedChangeLogDto>> GetGroupedByVersionAsync();

    }
}
