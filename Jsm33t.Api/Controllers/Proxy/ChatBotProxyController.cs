using Jsm33t.Contracts.Dtos;
using Jsm33t.Shared.ConfigModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Jsm33t.Api.Controllers.Proxy
{
    public class ChatRequest
    {
        public string Message { get; set; }
        public string System { get; set; } = "You are a helpful assistant.";
    }

    public class ChatResponse
    {
        public string Reply { get; set; }
    }

    [Route("api/chat")]
    [ApiController]
    public class ChatBotProxyController : FcBaseController
    {
        private readonly HttpClient _httpClient;
        private readonly string baseUrl;

        public ChatBotProxyController(IHttpClientFactory httpClientFactory,FcConfig config)
        {
            _httpClient = httpClientFactory.CreateClient();
            baseUrl = config.appsApi.Url;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<ChatResponse?>>> ChatProxy([FromBody] ChatRequest request)
        {
            var response = await _httpClient.PostAsJsonAsync(baseUrl + "/chat", request);
            if (!response.IsSuccessStatusCode)
                return RESP_BadRequestResponse<ChatResponse>("Error calling FastAPI backend");

            var result = await response.Content.ReadFromJsonAsync<ChatResponse>();

            return RESP_Success(result);
        }
    }
}
