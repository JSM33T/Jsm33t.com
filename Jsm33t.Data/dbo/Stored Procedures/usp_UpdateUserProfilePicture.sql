CREATE PROCEDURE [dbo].[usp_UpdateUserProfilePicture]
    @Id INT,
    @Avatar NVARCHAR(256),
    @ResultCode INT OUTPUT -- 0 = success
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET
        Avatar = @Avatar,
        UpdatedAt = GETDATE()
    WHERE Id = @Id;

    SET @ResultCode = 0;
END
