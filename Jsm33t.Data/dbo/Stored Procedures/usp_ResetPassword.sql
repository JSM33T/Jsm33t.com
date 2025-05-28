CREATE PROCEDURE usp_ResetPassword
    @Token UNIQUEIDENTIFIER = NULL,
    @Otp NVARCHAR(10) = NULL,
    @Username NVARCHAR(128) = NULL,
    @PasswordHash NVARCHAR(512),
    @Salt NVARCHAR(256)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserLoginId INT;

    
    DECLARE @UserId INT = NULL;

    IF @Username IS NOT NULL
    BEGIN
        SELECT @UserId = Id FROM Users WHERE UserName = @Username;
    END


    SELECT TOP 1 @UserLoginId = pr.UserLoginId
    FROM PasswordRecoveries pr
    JOIN UserLogins ul ON pr.UserLoginId = ul.Id
    WHERE pr.IsUsed = 0 AND
    (
        (pr.Token = @Token AND @Token IS NOT NULL)
        OR
        (
            pr.Otp = @Otp AND
            pr.OtpExpiresAt > GETUTCDATE() AND
            --[dbo].[UserLogins].[UserName] = @Username AND
            ul.UserId = @UserId AND
            @Otp IS NOT NULL AND @Username IS NOT NULL
        )
    );

    IF @UserLoginId IS NULL
    BEGIN
        SELECT 0 AS Success;
        RETURN;
    END

    UPDATE UserLogins
    SET PasswordHash = @PasswordHash,
        Salt = @Salt
    WHERE Id = @UserLoginId;

    UPDATE PasswordRecoveries
    SET IsUsed = 1,
        UsedAt = GETUTCDATE()
    WHERE UserLoginId = @UserLoginId AND IsUsed = 0;

    SELECT 1 AS Success;
END