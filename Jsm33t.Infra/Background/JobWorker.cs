using Jsm33t.Contracts.Interfaces.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Jsm33t.Infra.Background
{
	public class JobWorker(IServiceProvider serviceProvider, ILogger<JobWorker> logger) : BackgroundService
	{
		protected override async Task ExecuteAsync(CancellationToken stoppingToken)
		{
			var dispatcher = serviceProvider.GetRequiredService<IDispatcher>();

			while (!stoppingToken.IsCancellationRequested)
			{
				var (jobId, task) = await dispatcher.DequeueAsync(stoppingToken);
				using var scope = serviceProvider.CreateScope();
				var jobHistoryRepo = scope.ServiceProvider.GetRequiredService<IJobHistoryRepository>();
				try
				{
					var start = DateTime.UtcNow;
					await jobHistoryRepo.UpdateStatusAsync(jobId, "Running", startedAt: start, cancellationToken: stoppingToken);

					await task(stoppingToken);

					var end = DateTime.UtcNow;
					await jobHistoryRepo.UpdateStatusAsync(jobId, "Success", completedAt: end, durationMs: (int)(end - start).TotalMilliseconds, cancellationToken: stoppingToken);
				}
				catch (OperationCanceledException)
				{
					logger.LogInformation("Job {JobId} was cancelled.", jobId);
					await jobHistoryRepo.UpdateStatusAsync(jobId, "Cancelled", completedAt: null, cancellationToken: stoppingToken);
					break;
				}
				catch (Exception ex)
				{
					await jobHistoryRepo.UpdateStatusAsync(jobId, "Failed", completedAt: null, error: ex.Message, cancellationToken: stoppingToken);
				}
			}
		}
	}

}
