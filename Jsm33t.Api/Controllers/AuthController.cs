using System.Text.Json;
using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Requests;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Services;
using Jsm33t.Contracts.Models;
using Jsm33t.Infra.Background;
using Jsm33t.Infra.MailService;
using Jsm33t.Infra.Telegram;
using Jsm33t.Shared.ConfigModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jsm33t.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService, IMailService mailService, IDispatcher dispatcher, ITelegramService telegramService, FcConfig config) : FcBaseController
{

    [HttpPost("signup")]
    public async Task<ActionResult<ApiResponse<bool>>> Signup(SignupUserDto dto)
    {
        try
        {
            var userId = await authService.SignupAsync(dto);


            var verificationLink = $"https://jsm33t.com";
            var subject = "Verify your email address";
            var body = $@"
	            <p>Hello {dto.FirstName},</p>
	            <p>Thank you for registering. Please verify your email by clicking the link below:</p>
	            <p><a href='{verificationLink}'>Verify Email</a></p>
	            <p>If you did not request this, please ignore this email.</p>
            ";


            await dispatcher.EnqueueAsync(async token =>
            {
                var msg = $"User Signup \n\n {dto.FirstName} {dto.LastName} \n\n email: {dto.Email}";
                await telegramService.SendToOneAsync(config.TeleConfig.LogChatId.ToString()!, msg);

            }, jobName: "SignUp Notification", triggeredBy: "signupApi");


            await mailService.SendEmailAsync(dto.Email, subject, body, isHtml: true);

            await dispatcher.EnqueueAsync(async token =>
            {
                
              //  await mailService.SendEmailAsync(dto.Email, subject, body, isHtml: true);

            }, jobName: "Verificaiton Email", triggeredBy: "signupApi");

            return RESP_Success(userId, "User created successfully");
        }
        catch (Exception ex)
        {
            if (ex.Message.Contains("USERNAME_CONFLICT"))
                return RESP_ConflictResponse<bool>("Username already exists.");
            if (ex.Message.Contains("EMAIL_CONFLICT"))
                return RESP_ConflictResponse<bool>("Email already exists.");

            await dispatcher.EnqueueAsync(async token =>
            {
                var msg = $"User Signup Failed\n\n{JsonSerializer.Serialize(dto, new JsonSerializerOptions { WriteIndented = true })}";

                await telegramService.SendToOneAsync(config?.TeleConfig?.LogChatId.ToString()!, msg);

            }, jobName: "SignUp Error Notification", triggeredBy: "signupApi");

            return RESP_ServerErrorResponse<bool>("Something went wrong");
        }

    }

    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login(LoginRequestDto dto)
    {
        try
        {
            if (!Guid.TryParse(Request.Cookies["DeviceId"], out Guid deviceId) &&
                !Guid.TryParse(dto.DeviceId, out deviceId))
            {
                deviceId = Guid.NewGuid();
            }

            dto.DeviceId = deviceId.ToString();

            var (response, refreshToken) = await authService.LoginAsync(dto);

            Response.Cookies.Append("RefreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = false,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = response.ExpiresAt
            });

            // Set DeviceId cookie only if it's not already there
            if (Request.Cookies["DeviceId"] == null)
            {
                Response.Cookies.Append("DeviceId", deviceId.ToString(), new CookieOptions
                {
                    HttpOnly = false,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.UtcNow.AddYears(1)
                });
            }

            return RESP_Success(response, "Login successful");
        }
        catch (UnauthorizedAccessException ex)
        {
            return RESP_UnauthorizedResponse<LoginResponseDto>(ex.Message);
        }
    }

    [HttpGet("sessions/{userId}")]
    public async Task<ActionResult<ApiResponse<IEnumerable<SessionDto>>>> GetSessions(int userId)
    {
        var sessions = await authService.GetUserSessionsAsync(userId);
        return RESP_Success(sessions);
    }

    [HttpPost("logout/{sessionId}")]
    public async Task<ActionResult<ApiResponse<bool>>> Logout(int sessionId)
    {
        var result = await authService.LogoutSessionAsync(sessionId);
        return result
            ? RESP_Success(true, "Logged out successfully")
            : RESP_BadRequestResponse<bool>("Logout failed");
    }

    [HttpGet("verify-email")]
    public async Task<ActionResult<ApiResponse<string>>> VerifyEmail([FromQuery] Guid token)
    {
        try
        {
            await authService.VerifyEmailAsync(token);
            return RESP_Success("Email verified successfully");
        }
        catch
        {
            return RESP_BadRequestResponse<string>("Invalid or expired token");
        }
    }

    [Authorize]
    [HttpGet("claims")]
    public async Task<ActionResult<ApiResponse<int>>> GetMyId()
    {
        return RESP_Success<int>(1, "Authorization Setup Complete");
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> RefreshAccessToken()
    {
        var refreshToken = Request.Cookies["RefreshToken"];
        var deviceId = Request.Cookies["DeviceId"];

        if (string.IsNullOrWhiteSpace(refreshToken) || string.IsNullOrWhiteSpace(deviceId))
            return RESP_UnauthorizedResponse<LoginResponseDto>("Missing token or device ID");

        try
        {
            var (response, newRefreshToken) = await authService.RefreshTokenAsync(refreshToken, deviceId);

            Response.Cookies.Append("RefreshToken", newRefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = response.ExpiresAt
            });

            return RESP_Success(response, "Token refreshed");
        }
        catch (UnauthorizedAccessException ex)
        {
            return RESP_UnauthorizedResponse<LoginResponseDto>(ex.Message);
        }
    }

}
