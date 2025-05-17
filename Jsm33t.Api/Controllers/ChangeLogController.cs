using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Requests;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jsm33t.Api.Controllers
{
    [Route("api/changelog")]
    [ApiController]
    public class ChangeLogController(IChangeLogService changeLogService) : FcBaseController
    {
        [HttpPost("upsert")]
        public async Task<ActionResult<ApiResponse<object>>> UpsertChangeLog([FromBody] ChangeLogBulkRequestDto dto)
        {
            var id = await changeLogService.AddBulkChangeLogsAsync(dto);

            return RESP_Success<object>(new { Id = id }, "Changelog saved successfully!");

        }

        [HttpGet("grouped")]
        public async Task<ActionResult<ApiResponse<IEnumerable<VersionGroupedChangeLogDto>>>> GetGroupedByVersion()
             => RESP_Success(await changeLogService.GetGroupedByVersionAsync());
    }
}
