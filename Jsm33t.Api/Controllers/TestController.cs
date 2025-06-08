using Jsm33t.Api.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jsm33t.Api.Controllers
{
    [Route("/api")]
    [ApiController]
    public class TestController(ILogger<TestController> logger) : FcBaseController
    {

        [HttpGet("status")]
        public IActionResult GetJsonStatus()
        {
            logger.LogInformation("started something");
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
