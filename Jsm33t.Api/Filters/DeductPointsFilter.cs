using Jsm33t.Contracts.Interfaces.Repositories;
using Jsm33t.Shared.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Jsm33t.Api.Filters
{
    public class DeductPointsFilter : IAsyncActionFilter
    {
        private readonly IProfileRepository _userRepository;
        private readonly IHttpContextAccessor contextAccessor;

        public DeductPointsFilter(IProfileRepository userRepository, IHttpContextAccessor contextAccessor)
        {
            _userRepository = userRepository;
            this.contextAccessor = contextAccessor;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if (resultContext.Result is ObjectResult objectResult &&
                objectResult.StatusCode >= 200 && objectResult.StatusCode < 300)
            {
                var attr = context.ActionDescriptor.EndpointMetadata
                    .OfType<DeductPointsAttribute>().FirstOrDefault();

                if (attr != null)
                {
                    
                    var userId = (HttpContextHelper.GetUserId(this.contextAccessor.HttpContext!)).ToString();
                    if (!string.IsNullOrEmpty(userId))
                        await _userRepository.DeductPointsAsync(userId, attr.Points);
                }
            }
        }
    }

}
