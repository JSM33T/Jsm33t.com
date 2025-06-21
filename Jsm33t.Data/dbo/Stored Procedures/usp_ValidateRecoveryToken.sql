CREATE PROCEDURE usp_ValidateRecoveryToken
    @Token UNIQUEIDENTIFIER = NULL,
    @Otp NVARCHAR(10) = NULL,
    @Username NVARCHAR(128) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserId INT = NULL;

    IF @Username IS NOT NULL
    BEGIN
        SELECT @UserId = Id FROM [User] WHERE UserName = @Username;
    END

    IF EXISTS (
        SELECT 1 FROM PasswordRecovery pr
        JOIN UserLogin ul ON pr.UserLoginId = ul.Id
        WHERE pr.IsUsed = 0 AND
        (
            (pr.Token = @Token AND @Token IS NOT NULL)
            OR
            (
                pr.Otp = @Otp AND
                pr.OtpExpiresAt > GETUTCDATE() AND
                pr.UserLoginId = @UserId AND
                @Otp IS NOT NULL AND @UserId IS NOT NULL
            )
        )
    )

    --HERE UPDATE THE User table too delete toje and set isemail verified as 1 TOO
        SELECT CAST(1 AS BIT);
    ELSE
        SELECT CAST(0 AS BIT);
END