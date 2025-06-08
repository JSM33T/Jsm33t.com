using Jsm33t.Contracts.Dtos.Requests;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Repositories;
using Jsm33t.Contracts.Interfaces.Services;

namespace Jsm33t.Application
{
	public class ChangeLogService(IChangeLogRepository repository) : IChangeLogService
	{
		private readonly IChangeLogRepository _repository = repository;

		public async Task<int> AddBulkChangeLogsAsync(ChangeLogBulkRequestDto bulkDto)
		{
			int insertedCount = 0;

			await _repository.DeleteByVersionAsync(bulkDto.Version);

			foreach (var change in bulkDto.Changes)
			{
				var dto = new ChangeLogRequestDto
				{
					Version = bulkDto.Version,
					Title = change.Title,
					Description = change.Description,
					ChangeType = change.ChangeType,
					Contributors = change.Contributors
				};

				await _repository.InsertChangeLogAsync(dto);
				insertedCount++;
			}

			return insertedCount;
		}

		public async Task<IEnumerable<VersionGroupedChangeLogDto>> GetGroupedByVersionAsync()
		{
			return await _repository.GetGroupedByVersionAsync();
		}

	}
}
