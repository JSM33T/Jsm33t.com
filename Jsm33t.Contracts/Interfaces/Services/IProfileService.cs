using Jsm33t.Contracts.Dtos.Responses;

namespace Jsm33t.Contracts.Interfaces.Services
{
    public interface IProfileService
    {
        Task<UserProfileDetailsDto> GetUserProfileById(int Id);
        Task<int> UpdateUserProfile(EditUserProfileDto userProfileDetails,string AvatarUrl);
    }
}
