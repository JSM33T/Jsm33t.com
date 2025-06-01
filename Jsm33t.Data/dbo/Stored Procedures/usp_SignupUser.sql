CREATE PROCEDURE [usp_SignupUser]
    @FirstName NVARCHAR(128),
    @LastName NVARCHAR(128),
    @UserName NVARCHAR(128),
    @Email NVARCHAR(256),
    @PasswordHash NVARCHAR(512),
    @Salt NVARCHAR(256)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserId INT, @ProviderId INT;
    DECLARE @EmailToken UNIQUEIDENTIFIER = NEWID();

    -- Check for existing username
    IF EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName)
    BEGIN
	    RAISERROR('EMAIL_CONFLICT', 16, 1);
	    RETURN;
    END

    -- Check for existing email
    IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email)
    BEGIN
	    RAISERROR('USERNAME_CONFLICT', 16, 1);
	    RETURN;
    END

    -- Insert into Users with email token
    INSERT INTO [User] (FirstName, LastName, UserName, Email, EmailVerificationToken)
    VALUES (@FirstName, @LastName, @UserName, @Email, @EmailToken);

    SET @UserId = SCOPE_IDENTITY();

    -- Get or create Email provider
    SELECT @ProviderId = Id FROM LoginProvider WHERE [Name] = 'Email';
    IF @ProviderId IS NULL
    BEGIN
        INSERT INTO LoginProvider ([Name], [Description], ProviderId)
        VALUES ('Email', 'Email and password login', 'email');

        SET @ProviderId = SCOPE_IDENTITY();
    END

    -- Create login entry
    INSERT INTO UserLogin (UserId, ProviderId, Email, PasswordHash, Salt, IsPasswordLogin)
    VALUES (@UserId, @ProviderId, @Email, @PasswordHash, @Salt, 1);

    SELECT 
    @UserId AS UserId,
    @EmailToken AS EmailVerificationToken,
    @FirstName AS FirstName,
    @LastName AS LastName,
    @UserName AS UserName,
    @Email AS Email

END