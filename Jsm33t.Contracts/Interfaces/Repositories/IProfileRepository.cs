using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Responses;

namespace Jsm33t.Contracts.Interfaces.Repositories
{
    public interface IProfileRepository
    {
        Task<UserProfileDetailsDto> GetUserProfileById(int Id);
        Task<int> UpdateUserProfile(EditUserProfileDto userProfileDetailsDto);
        Task<IEnumerable<LoginDeviceDto>> GetLoginDevicesForUser(int userId);
        //Task<int> RemoveDevice(int userId, int sessionId);
        //Task<int> RemoveAllDevicesExcept(int userId, int currentSessionId);
        Task<int> RemoveAllDevicesExceptDevice(int userId, Guid deviceId);
        Task<int> RemoveDeviceByDeviceId(int userId, Guid deviceId);
        Task<int> UpdateUserProfilePicture(string avatarUrl, int userId);
    }
}
