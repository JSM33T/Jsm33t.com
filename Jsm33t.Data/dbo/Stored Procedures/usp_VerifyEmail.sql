CREATE PROCEDURE [usp_VerifyEmail]
    @Token UNIQUEIDENTIFIER
AS
BEGIN
    UPDATE [User]
    SET IsEmailVerified = 1,
        EmailVerificationToken = NULL
    WHERE EmailVerificationToken = @Token;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR('Invalid or expired token.', 16, 1);
    END
END
