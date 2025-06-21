using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Repositories;

namespace Jsm33t.Contracts.Interfaces.Services
{
    public interface IProfileService
    {
        Task<UserProfileDetailsDto> GetUserProfileById(int Id);
        Task<int> UpdateUserProfile(EditUserProfileDto userProfileDetails);
        Task<IEnumerable<LoginDeviceDto>> GetLoginDevices(int userId);
        Task<int> RemoveAllDevicesExceptDevice(int userId, Guid deviceId);
        Task<int> RemoveDeviceByDeviceId(int userId, Guid deviceId);
        Task<int> UpdateUserProfilePicture(string avatarUrl, int userId);
        Task<bool> ChangePasswordAsync(int userId, string currentPassword, string newPassword);
    }
}
