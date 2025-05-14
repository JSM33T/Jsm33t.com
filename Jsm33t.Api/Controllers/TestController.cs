using Jsm33t.Contracts.Dtos;
using Jsm33t.Infra.Background;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Jsm33t.Api.Controllers
{
    [Route("/api")]
    [ApiController]
    public class TestController(IDispatcher dispatcher) : FcBaseController
    {
        public readonly IDispatcher _dispatcher = dispatcher;

        [HttpGet("status")]
        public IActionResult GetJsonStatus()
        {
            return Ok(new
            {
                status = "running",
                time = DateTime.UtcNow,
                version = "1.0.0",
                environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production",
                framework = System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription,
                csharpVersion = $"{(int)Environment.Version.Major}.{(int)Environment.Version.Minor}"
            });
        }


    }
}
