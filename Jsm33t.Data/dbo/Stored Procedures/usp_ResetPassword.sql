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
        SELECT @UserId = Id FROM [User] WHERE UserName = @Username;
    END


    SELECT TOP 1 @UserLoginId = pr.UserLoginId
    FROM PasswordRecovery pr
    JOIN UserLogin ul ON pr.UserLoginId = ul.Id
    WHERE pr.IsUsed = 0 AND
    (
        (pr.Token = @Token AND @Token IS NOT NULL)
        OR
        (
            pr.Otp = @Otp AND
            pr.OtpExpiresAt > GETUTCDATE() AND
            --[UserLogin].[UserName] = @Username AND
            ul.UserId = @UserId AND
            @Otp IS NOT NULL AND @Username IS NOT NULL
        )
    );

    IF @UserLoginId IS NULL
    BEGIN
        SELECT 0 AS Success;
        RETURN;
    END

    UPDATE UserLogin
    SET PasswordHash = @PasswordHash,
        Salt = @Salt
    WHERE Id = @UserLoginId;

    UPDATE PasswordRecovery
    SET IsUsed = 1,
        UsedAt = GETUTCDATE()
    WHERE UserLoginId = @UserLoginId AND IsUsed = 0;

    SELECT 1 AS Success;
END