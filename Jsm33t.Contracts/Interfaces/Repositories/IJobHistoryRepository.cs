using Jsm33t.Contracts.Models;

namespace Jsm33t.Contracts.Interfaces.Repositories
{
    /// <summary>
    /// Provides methods for managing and querying job history records.
    /// </summary>
    public interface IJobHistoryRepository
    {
        /// <summary>
        /// Adds a new job history record asynchronously.
        /// </summary>
        /// <param name="job">The job history entity to add.</param>
        /// <param name="cancellationToken">A cancellation token for the async operation.</param>
        /// <returns>The ID of the newly added job history record.</returns>
        Task<int> AddAsync(JobHistory job, CancellationToken cancellationToken = default);

        /// <summary>
        /// Updates the status and timing details of an existing job history record asynchronously.
        /// </summary>
        /// <param name="jobId">The unique identifier of the job.</param>
        /// <param name="status">The new status of the job.</param>
        /// <param name="startedAt">The start time of the job, if applicable.</param>
        /// <param name="completedAt">The completion time of the job, if applicable.</param>
        /// <param name="durationMs">The duration of the job in milliseconds, if applicable.</param>
        /// <param name="error">Any error message associated with the job, if applicable.</param>
        /// <param name="cancellationToken">A cancellation token for the async operation.</param>
        Task UpdateStatusAsync(
            int jobId,
            string status,
            DateTime? startedAt = null,
            DateTime? completedAt = null,
            int? durationMs = null,
            string? error = null,
            CancellationToken cancellationToken = default);

        /// <summary>
        /// Retrieves a job history record by its ID asynchronously.
        /// </summary>
        /// <param name="jobId">The unique identifier of the job.</param>
        /// <param name="cancellationToken">A cancellation token for the async operation.</param>
        /// <returns>The job history record if found; otherwise, null.</returns>
        Task<JobHistory?> GetByIdAsync(int jobId, CancellationToken cancellationToken = default);

        /// <summary>
        /// Retrieves a collection of recent job history records asynchronously.
        /// </summary>
        /// <param name="count">The maximum number of recent records to retrieve.</param>
        /// <param name="cancellationToken">A cancellation token for the async operation.</param>
        /// <returns>A collection of recent job history records.</returns>
        Task<IEnumerable<JobHistory>> GetRecentAsync(int count = 50, CancellationToken cancellationToken = default);
    }
}
