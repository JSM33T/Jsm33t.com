
CREATE PROCEDURE usp_GetUserLoginByUserId
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 1
        Id,
        UserId,
        Email,
        PasswordHash,
        Salt,
        IsPasswordLogin AS IsVerified
    FROM UserLogin
    WHERE UserId = @UserId AND IsPasswordLogin = 1;
END
