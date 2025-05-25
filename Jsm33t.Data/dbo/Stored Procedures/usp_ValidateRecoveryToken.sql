CREATE PROCEDURE usp_ValidateRecoveryToken
    @Token UNIQUEIDENTIFIER = NULL,
    @Otp NVARCHAR(10) = NULL,
    @Username NVARCHAR(128) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1 FROM PasswordRecoveries pr
        JOIN UserLogins ul ON pr.UserLoginId = ul.Id
        WHERE pr.IsUsed = 0 AND
        (
            (pr.Token = @Token AND @Token IS NOT NULL)
            OR
            (
                pr.Otp = @Otp AND
                pr.OtpExpiresAt > GETUTCDATE() AND
                [UserLogins].[UserName] = @Username AND
                @Otp IS NOT NULL AND @Username IS NOT NULL
            )
        )
    )
        SELECT CAST(1 AS BIT);
    ELSE
        SELECT CAST(0 AS BIT);
END
