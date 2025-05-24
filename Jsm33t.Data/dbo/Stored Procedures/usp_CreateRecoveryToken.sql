CREATE PROCEDURE usp_CreateRecoveryToken
    @Email NVARCHAR(256)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserLoginId INT, @Token UNIQUEIDENTIFIER = NEWID(), @Otp NVARCHAR(10), @OtpExpires DATETIME2;

    SELECT @UserLoginId = Id FROM UserLogins WHERE Email = @Email;
    IF @UserLoginId IS NULL
        THROW 50000, 'EMAIL_NOT_FOUND', 1;

    SET @Otp = RIGHT(CAST(100000 + ABS(CHECKSUM(NEWID())) % 900000 AS NVARCHAR), 6);
    SET @OtpExpires = DATEADD(MINUTE, 10, GETUTCDATE());

    INSERT INTO PasswordRecoveries (UserLoginId, Token, Otp, OtpExpiresAt)
    VALUES (@UserLoginId, @Token, @Otp, @OtpExpires);

    SELECT @Token AS Token, @Otp AS Otp;
END