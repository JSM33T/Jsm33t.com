using Jsm33t.Contracts.Dtos.Requests;
using Jsm33t.Contracts.Dtos.Responses;

namespace Jsm33t.Contracts.Interfaces.Services
{
    /// <summary>
    /// Provides methods for managing and querying application change logs.
    /// </summary>
    public interface IChangeLogRepository
    {
        /// <summary>
        /// Inserts a new change log entry asynchronously.
        /// </summary>
        /// <param name="dto">The change log data transfer object to insert.</param>
        /// <returns>The number of records inserted.</returns>
        Task<int> InsertChangeLogAsync(ChangeLogRequestDto dto);

        /// <summary>
        /// Deletes all change log entries associated with a specific version asynchronously.
        /// </summary>
        /// <param name="version">The version identifier to delete logs for.</param>
        Task DeleteByVersionAsync(string version);

        /// <summary>
        /// Retrieves change log entries grouped by version asynchronously.
        /// </summary>
        /// <returns>An enumerable collection of grouped change log data transfer objects.</returns>
        Task<IEnumerable<VersionGroupedChangeLogDto>> GetGroupedByVersionAsync();
    }
}
