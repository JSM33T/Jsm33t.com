﻿using FluentValidation;
using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Requests;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Services;
using Jsm33t.Infra.Background;
using Jsm33t.Infra.MailService;
using Jsm33t.Infra.Telegram;
using Jsm33t.Shared.ConfigModels;
using Jsm33t.Shared.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Text.Json;

namespace Jsm33t.Api.Controllers;

[ApiController]
[AllowAnonymous]
[Route("api/auth")]
public class AuthController(
    IAuthService authService,
    IMailService mailService,
    IDispatcher dispatcher,
    FcConfig fcConfig,
    ITelegramService telegramService,
    IValidator<SignupUserRequestDto> signupValidator,
    IValidator<LoginRequestDto> loginValidator,

    FcConfig config) : FcBaseController
{
    [HttpPost("signup")]
    public async Task<ActionResult<ApiResponse<bool>>> Signup(SignupUserRequestDto dto)
    {

        var validationResult = await signupValidator.ValidateAsync(dto);
        if (!validationResult.IsValid)
            return FcResponse(new ApiResponse<bool>(400, "Validation Error", false)
            {
                Hints = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
            });

        try
        {
            var result = await authService.SignupAsync(dto);

            var link = $"{fcConfig?.BaseUrls?.BaseUiUrl}/landings/verification?token={result.EmailVerificationToken}";

            const string subject = "Verify your email address";

            var body = Template.EmailVerificationHtml
                .Replace("{FirstName}", dto.FirstName)
                .Replace("{Link}", link)
                .Replace("{DateTime.Now.Year}", DateTime.Now.Year.ToString());

            await dispatcher.EnqueueAsync(_ => telegramService.SendToOneAsync(config.TeleConfig?.LogChatId.ToString(CultureInfo.InvariantCulture)!,
                $"User Signup\n\n{dto.FirstName} {dto.LastName}\n\nEmail: {dto.Email}"),
                jobName: nameof(Signup), triggeredBy: nameof(AuthController));

            await dispatcher.EnqueueAsync(_ => mailService.SendEmailAsync(dto.Email, subject, body, true),
                jobName: "VerificationEmail", triggeredBy: nameof(AuthController));

            return RESP_Success(true, "User created successfully");
        }
        catch (Exception ex)
        {
            if (ex.Message.Contains("USERNAME_CONFLICT"))
                return RESP_ConflictResponse<bool>("Username already exists.");
            if (ex.Message.Contains("EMAIL_CONFLICT"))
                return RESP_ConflictResponse<bool>("Email already exists.");

            await dispatcher.EnqueueAsync(_ => 
                telegramService.SendToOneAsync(
                  config.TeleConfig?.LogChatId.ToString(CultureInfo.InvariantCulture)!,
                          $"Signup Failed\n\n{JsonSerializer.Serialize(dto)}"
                      ),
                      jobName: "SignupFailedNotification",
                      triggeredBy: nameof(AuthController)
                  );

            throw;
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login(LoginRequestDto dto)
    {

        var validationResult = await loginValidator.ValidateAsync(dto);
        if (!validationResult.IsValid)
            return FcResponse(new ApiResponse<LoginResponseDto>(400, "Validation Error", null)
            {
                Hints = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
            });

        try
        {
            dto.IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
            dto.UserAgent = Request.Headers["User-Agent"].ToString();

            var cookieExpiry = DateTimeOffset.UtcNow.AddMinutes(1);
            var deviceIdCookie = Request.Cookies["DeviceId"];
            if (!Guid.TryParse(deviceIdCookie, out var deviceId))
            {
                deviceId = Guid.NewGuid();
                Response.Cookies.Append("DeviceId", deviceId.ToString(), new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = cookieExpiry
                });
            }

            dto.DeviceId = deviceId.ToString();

            var (res, refreshToken) = await authService.LoginAsync(dto);

            Response.Cookies.Append("RefreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = cookieExpiry
            });

            return RESP_Success(res, "Login successful");
        }
        catch (UnauthorizedAccessException ex)
        {
            return RESP_BadRequestResponse<LoginResponseDto>(ex.Message);
        }
        catch (Exception)
        {
            throw;
        }
    }

    [HttpPost("logout/{sessionId}")]
    public async Task<ActionResult<ApiResponse<bool>>> Logout(int sessionId)
    {
        var success = await authService.LogoutSessionAsync(sessionId);
        return success ? RESP_Success(true, "Logged out") : RESP_BadRequestResponse<bool>("Logout failed");
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<ApiResponse<LoginResponseDto>>> RefreshToken()
    {
        var refreshToken = Request.Cookies["RefreshToken"];
        var deviceId = Request.Cookies["DeviceId"];

        if (string.IsNullOrWhiteSpace(refreshToken) || string.IsNullOrWhiteSpace(deviceId))
            return RESP_UnauthorizedResponse<LoginResponseDto>("Missing refresh token or device ID");

        var (res, newToken) = await authService.RefreshTokenAsync(refreshToken, deviceId);
        Response.Cookies.Append("RefreshToken", newToken, new CookieOptions { HttpOnly = true, Secure = true, SameSite = SameSiteMode.None, Expires = res.ExpiresAt });
        return RESP_Success(res, "Token refreshed");
    }

    [HttpGet("sessions/{userId}")]
    public async Task<ActionResult<ApiResponse<IEnumerable<SessionDto>>>> GetSessions(int userId) =>
        RESP_Success(await authService.GetUserSessionsAsync(userId));

    [HttpGet("verify-email")]
    public async Task<ActionResult<ApiResponse<string>>> VerifyEmail([FromQuery] Guid token)
    {
        await authService.VerifyEmailAsync(token);
        return RESP_Success("Email verified successfully");
    }

    [HttpPost("recover-request")]
    public async Task<ActionResult<ApiResponse<string>>> RequestRecovery([FromBody] RecoveryRequestDtos dto)
    {
        await authService.RequestPasswordRecoveryAsync(dto.Email);
        return RESP_Success("Recovery email sent");
    }

    [HttpPost("recover-complete")]
    public async Task<ActionResult<ApiResponse<string>>> CompleteRecovery([FromBody] ResetPasswordDto dto)
    {
        await authService.CompletePasswordRecoveryAsync(dto.Token, dto.Otp, dto.NewPassword);
        return RESP_Success("Password has been reset successfully");
    }

}