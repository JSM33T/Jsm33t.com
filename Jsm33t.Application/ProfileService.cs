using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Repositories;
using Jsm33t.Contracts.Interfaces.Services;
using Microsoft.AspNetCore.Http;

namespace Jsm33t.Application
{
    //public class ProfileService(IProfileRepository profileRepository) : IProfileService
    //{
    //    public async Task<UserProfileDetailsDto> GetUserProfileById(int id)
    //    {
    //        var profile = await profileRepository.GetUserProfileById(id);

    //        if (!string.IsNullOrEmpty(profile.Avatar))
    //        {
    //            // Replace "https://res.cloudinary.com/" with your app's media cache endpoint
    //            profile.Avatar = profile.Avatar.Replace(
    //                "https://res.cloudinary.com/",
    //                "/api/media/"
    //            );
    //        }

    //        return profile;
    //    }

    //    public async Task<int> UpdateUserProfile(EditUserProfileDto userProfileDetails, string AvatarUrl)
    //    {
    //        return await profileRepository.UpdateUserProfile(userProfileDetails,AvatarUrl);
    //    }
    //}
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


        public async Task<int> UpdateUserProfile(EditUserProfileDto userProfileDetails, string AvatarUrl)
        {
            return await profileRepository.UpdateUserProfile(userProfileDetails, AvatarUrl);
        }

    }
}
