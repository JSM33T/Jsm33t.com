using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Services;
using Jsm33t.Infra.ImageHost;
using Jsm33t.Shared.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jsm33t.Api.Controllers
{
    public class RemoveDeviceRequest {
        public Guid? DeviceId { get; set; }
        public bool DeleteAll { get; set; } = false;
    }

    [Route("api/profile")]
    [Authorize] 
    [ApiController]
    public class ProfileController(IProfileService profileService,ICloudinaryService cloudinaryService) : FcBaseController
    {
        [HttpGet("get")]
        public async Task<ActionResult<ApiResponse<UserProfileDetailsDto>>> GetProfile()
        {
            var userId = HttpContextHelper.GetUserId(HttpContext!);

            var ss = await profileService.GetUserProfileById(userId);

            return RESP_Success(ss);
        }

        [HttpPost("update")]
        public async Task<ActionResult<ApiResponse<UserProfileDetailsDto>>> EditProfile([FromBody] EditUserProfileDto dto)
        {
            dto.Id = HttpContextHelper.GetUserId(HttpContext!);
            var userGuid = await profileService.GetUserProfileById(dto.Id);
           
            var result = await profileService.UpdateUserProfile(dto);

            if (result == 1)
                return RESP_ConflictResponse<UserProfileDetailsDto>("Username already exists");

            var updated = await profileService.GetUserProfileById(dto.Id);
            return RESP_Success(updated);
        }


        [HttpPost("updatepfp")]
        public async Task<ActionResult<ApiResponse<bool>>> EditProfilepFP([FromForm] EditUserProfilePfpDto dto)
        {
            var Id = HttpContextHelper.GetUserId(HttpContext!);
            var userGuid = await profileService.GetUserProfileById(Id);

            string? avatarUrl = null;
            if (dto.Avatar != null)
                avatarUrl = await cloudinaryService.UploadProfilePictureAsync(dto.Avatar, userGuid.UserId);

            var result = await profileService.UpdateUserProfilePicture(avatarUrl, Id);

            return RESP_Success(true);
        }

        [HttpGet("devices")]
        public async Task<ActionResult<ApiResponse<IEnumerable<LoginDeviceDto>>>> GetDevices()
        {
            var userId = HttpContextHelper.GetUserId(HttpContext!);
            var deviceId = HttpContextHelper.GetDeviceId(HttpContext!);

            var devices = (await profileService.GetLoginDevices(userId)).ToList();

            // Mark isCurrent for each device using DeviceId
            var devicesWithCurrentFlag = devices.Select(d => new LoginDeviceDto
            {
                SessionId = d.SessionId,
                AccessToken = d.AccessToken,
                DeviceId = d.DeviceId,
                IpAddress = d.IpAddress,
                UserAgent = d.UserAgent,
                IssuedAt = d.IssuedAt,
                ExpiresAt = d.ExpiresAt,
                IsActive = d.IsActive,
                LoggedOutAt = d.LoggedOutAt,
                IsCurrent = d.DeviceId == deviceId // << correct comparison!
            });

            return RESP_Success(devicesWithCurrentFlag);
        }


        [HttpPost("devices/remove")]
        public async Task<ActionResult<ApiResponse<int>>> RemoveDevice([FromBody] RemoveDeviceRequest? request)
        {
            var userId = HttpContextHelper.GetUserId(HttpContext!);

            if (request?.DeleteAll == true)
            {
                var currentDeviceId = HttpContextHelper.GetDeviceId(HttpContext!);
                var removed = await profileService.RemoveAllDevicesExceptDevice(userId, currentDeviceId);
                return RESP_Success(removed, "All other devices removed");
            }
            else if (request?.DeviceId != null)
            {
                var removed = await profileService.RemoveDeviceByDeviceId(userId, request.DeviceId.Value);
                return removed > 0
                    ? RESP_Success(removed, "Device removed")
                    : RESP_NotFoundResponse<int>("Device not found or already removed");
            }
            else
            {
                //// Remove current device if no DeviceId specified
                //var currentDeviceId = HttpContextHelper.GetDeviceId(HttpContext!);
                //var removed = await profileService.RemoveDeviceByDeviceId(userId, currentDeviceId);
                //return removed > 0
                //    ? RESP_Success(removed, "Device removed")
                //    : RESP_NotFoundResponse<int>("Device not found or already removed");
                 return RESP_NotFoundResponse<int>("Device id not found");
            }
        }


    }
}
