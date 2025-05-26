using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Jsm33t.Shared.Helpers
{
    public static class HttpContextHelper
    {
        public static int GetUserId(HttpContext context)
        {
            var claim = context?.User?.FindFirst(ClaimTypes.NameIdentifier);
            return int.TryParse(claim?.Value, out var id) ? id: 0;
        }

        public static int GetSessionId(HttpContext context)
        {
            // Assumes SessionId is set as a claim in JWT or stored in HttpContext.Items during authentication middleware
            // Example for claim:
            var sessionIdClaim = context.User?.Claims.FirstOrDefault(c => c.Type == "SessionId");
            if (sessionIdClaim != null && int.TryParse(sessionIdClaim.Value, out var sessionId))
                return sessionId;

            // Alternative: stored in HttpContext.Items (set by middleware)
            if (context.Items.TryGetValue("SessionId", out var obj) && obj is int sessionIdFromItems)
                return sessionIdFromItems;

            throw new Exception("SessionId not found in HttpContext.");
        }

        public static Guid GetDeviceId(HttpContext context)
        {
            // 1. Try claim (e.g. set by JWT or identity system)
            var claim = context.User?.Claims.FirstOrDefault(c => c.Type == "DeviceId");
            if (claim != null && Guid.TryParse(claim.Value, out var deviceIdFromClaim))
                return deviceIdFromClaim;

            // 2. Try HttpContext.Items (set by custom middleware)
            if (context.Items.TryGetValue("DeviceId", out var obj) && obj is Guid deviceIdFromItems)
                return deviceIdFromItems;

            // 3. Try cookie
            if (context.Request.Cookies.TryGetValue("DeviceId", out var cookieVal) && Guid.TryParse(cookieVal, out var deviceIdFromCookie))
                return deviceIdFromCookie;

            throw new Exception("DeviceId not found in HttpContext.");
        }
    }
}
