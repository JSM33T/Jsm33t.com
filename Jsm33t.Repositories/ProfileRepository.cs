using Dapper;
using Jsm33t.Contracts.Dtos.Responses;
using Jsm33t.Contracts.Interfaces.Repositories;
using Jsm33t.Infra.Dapper;
using System.Data;

namespace Jsm33t.Repositories
{
    public class ProfileRepository(IDapperFactory dapperFactory) : IProfileRepository
    {
        public async Task<UserProfileDetailsDto> EditProfile(UserProfileDetailsDto userProfileDetails)
        {
            throw new NotImplementedException();
        }

        public async Task<UserProfileDetailsDto?> GetUserProfileById(int id)
        {
            using var conn = dapperFactory.CreateConnection();

            return await conn.QuerySingleOrDefaultAsync<UserProfileDetailsDto>(
                "usp_GetProfileDetailsById",
                new { Id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<int> UpdateUserProfile(EditUserProfileDto dto, string AvatarUrl)
        {
            using var conn = dapperFactory.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("Id", dto.Id);
            parameters.Add("FirstName", dto.FirstName);
            parameters.Add("LastName", dto.LastName);
            parameters.Add("UserName", dto.UserName);
            parameters.Add("Gender", dto.Gender);
            parameters.Add("Avatar", AvatarUrl);
            parameters.Add("Bio", dto.Bio);
            parameters.Add("ResultCode", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await conn.ExecuteAsync(
                "usp_UpdateUserProfile",
                parameters,
                commandType: CommandType.StoredProcedure);

            return parameters.Get<int>("ResultCode");
        }


    }
}
