using Jsm33t.Contracts.Dtos;
using Jsm33t.Contracts.Dtos.Responses;

namespace Jsm33t.Contracts.Interfaces.Repositories
{
    /// <summary>
    /// Provides methods for managing user profiles and related device operations.
    /// </summary>
    public interface IProfileRepository
    {
        /// <summary>
        /// Retrieves detailed profile information for a user by their ID asynchronously.
        /// </summary>
        /// <param name="Id">The unique identifier of the user.</param>
        /// <returns>The user's profile details.</returns>
        Task<UserProfileDetailsDto> GetUserProfileById(int Id);

        /// <summary>
        /// Updates the user's profile details asynchronously.
        /// </summary>
        /// <param name="userProfileDetailsDto">The DTO containing updated profile information.</param>
        /// <returns>The number of affected records.</returns>
        Task<int> UpdateUserProfile(EditUserProfileDto userProfileDetailsDto);

        /// <summary>
        /// Retrieves the login devices associated with a user asynchronously.
        /// </summary>
        /// <param name="userId">The unique identifier of the user.</param>
        /// <returns>A collection of login device DTOs.</returns>
        Task<IEnumerable<LoginDeviceDto>> GetLoginDevicesForUser(int userId);

        /// <summary>
        /// Removes all login devices except the specified device for a user asynchronously.
        /// </summary>
        /// <param name="userId">The unique identifier of the user.</param>
        /// <param name="deviceId">The device ID to retain.</param>
        /// <returns>The number of devices removed.</returns>
        Task<int> RemoveAllDevicesExceptDevice(int userId, Guid deviceId);

        /// <summary>
        /// Removes a specific device for a user by device ID asynchronously.
        /// </summary>
        /// <param name="userId">The unique identifier of the user.</param>
        /// <param name="deviceId">The device ID to remove.</param>
        /// <returns>The number of devices removed.</returns>
        Task<int> RemoveDeviceByDeviceId(int userId, Guid deviceId);

        /// <summary>
        /// Updates the user's profile picture asynchronously.
        /// </summary>
        /// <param name="avatarUrl">The new avatar URL.</param>
        /// <param name="userId">The unique identifier of the user.</param>
        /// <returns>The number of records updated.</returns>
        Task<int> UpdateUserProfilePicture(string avatarUrl, int userId);
        Task DeductPointsAsync(string userId, int pointsToDeduct);

    }
}
