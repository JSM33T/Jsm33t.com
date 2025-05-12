﻿using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Requests;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Services;
using Jsm33t.Infra.Background;
using Jsm33t.Infra.Telegram;
using Jsm33t.Shared.ConfigModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jsm33t.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService,IDispatcher dispatcher,ITelegramService telegramService,FcConfig config) : FcBaseController
{
    private readonly IAuthService _authService = authService;

    [HttpPost("signup")]
    public async Task<ActionResult<ApiResponse<bool>>> Signup(SignupUserDto dto)
    {
        var userId = await _authService.SignupAsync(dto);

        await dispatcher.EnqueueAsync(async token =>
        {
            var msg = $"🚨 User Signup \n\n {dto.FirstName} {dto.LastName} \n\n email: {dto.Email}";
            await telegramService.SendToOneAsync(config.TeleConfig.LogChatId.ToString(), msg);
        }, jobName: "SignUp NOtification", triggeredBy: "signupApi");

        return RESP_Success(userId, "User created successfully");
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

            // Pass updated device ID into dto for logging/tracking
            dto.DeviceId = deviceId.ToString();

            var (response, refreshToken) = await _authService.LoginAsync(dto);

            // Set RefreshToken cookie
            Response.Cookies.Append("RefreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = false,
                Secure = false,
                SameSite = SameSiteMode.None,
                Expires = response.ExpiresAt
            });

            // Set DeviceId cookie only if it's not already there
            if (Request.Cookies["DeviceId"] == null)
            {
                Response.Cookies.Append("DeviceId", deviceId.ToString(), new CookieOptions
                {
                    HttpOnly = false,
                    Secure = false,
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
        var sessions = await _authService.GetUserSessionsAsync(userId);
        return RESP_Success(sessions);
    }

    [HttpPost("logout/{sessionId}")]
    public async Task<ActionResult<ApiResponse<bool>>> Logout(int sessionId)
    {
        var result = await _authService.LogoutSessionAsync(sessionId);
        return result
            ? RESP_Success(true, "Logged out successfully")
            : RESP_BadRequestResponse<bool>("Logout failed");
    }

    [HttpGet("verify-email")]
    public async Task<ActionResult<ApiResponse<string>>> VerifyEmail([FromQuery] Guid token)
    {
        try
        {
            await _authService.VerifyEmailAsync(token);
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
        return RESP_Success<int>(1,"Authorization Setup Complete");
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
            var (response, newRefreshToken) = await _authService.RefreshTokenAsync(refreshToken, deviceId);

            Response.Cookies.Append("RefreshToken", newRefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
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
