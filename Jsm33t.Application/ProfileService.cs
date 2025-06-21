using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Repositories;
using Jsm33t.Contracts.Interfaces.Services;
using Jsm33t.Shared.Helpers;
using Microsoft.AspNetCore.Http;

namespace Jsm33t.Application
{
    public class ProfileService(IProfileRepository profileRepository, IHttpContextAccessor httpContextAccessor) : IProfileService
    {
        public async Task<UserProfileDetailsDto> GetUserProfileById(int id)
        {
            var profile = await profileRepository.GetUserProfileById(id);

            if (!string.IsNullOrEmpty(profile.Avatar))
            {
                var request = httpContextAccessor.HttpContext?.Request;
                var baseUrl = $"{request?.Scheme}://{request?.Host}";
                profile.Avatar = profile.Avatar.Replace(
                    "https://res.cloudinary.com/",
                    $"{baseUrl}/api/media/"
                );
            }
            return profile;
        }

        public async Task<int> UpdateUserProfile(EditUserProfileDto userProfileDetails)
        {
            return await profileRepository.UpdateUserProfile(userProfileDetails);
        }

        public async Task<IEnumerable<LoginDeviceDto>> GetLoginDevices(int userId)
            => await profileRepository.GetLoginDevicesForUser(userId);

        public async Task<int> RemoveAllDevicesExceptDevice(int userId, Guid deviceId)
         => await profileRepository.RemoveAllDevicesExceptDevice(userId, deviceId);

        public async Task<int> RemoveDeviceByDeviceId(int userId, Guid deviceId)
            => await profileRepository.RemoveDeviceByDeviceId(userId, deviceId);

        public async Task<int> UpdateUserProfilePicture(string avatarUrl,int userId)
           => await profileRepository.UpdateUserProfilePicture(avatarUrl, userId);

        public async Task<bool> ChangePasswordAsync(int userId, string currentPassword, string newPassword)
        {
            var login = await profileRepository.GetLoginDataByUserIdAsync(userId);
            if (login == null || !PasswordHelper.VerifyPassword(currentPassword, login.PasswordHash, login.Salt))
                return false;

            var salt = PasswordHelper.GenerateSalt();
            var hash = PasswordHelper.HashPassword(newPassword, salt);
            return await profileRepository.UpdatePasswordAsync(userId, hash, salt);
        }


    }
}
