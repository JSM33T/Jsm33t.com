/*
Deployment script for jsm33t_db

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "jsm33t_db"
:setvar DefaultFilePrefix "jsm33t_db"
:setvar DefaultDataPath "C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\"
:setvar DefaultLogPath "C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\"

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
PRINT N'Creating Table [dbo].[ChangeLogs]...';


GO
CREATE TABLE [dbo].[ChangeLogs] (
    [Id]           INT              IDENTITY (1, 1) NOT NULL,
    [Version]      NVARCHAR (50)    NOT NULL,
    [Title]        NVARCHAR (255)   NOT NULL,
    [Description]  NVARCHAR (MAX)   NULL,
    [ChangeType]   NVARCHAR (50)    NOT NULL,
    [Contributors] NVARCHAR (500)   NULL,
    [ChangedAt]    DATETIME         NOT NULL,
    [RowId]        UNIQUEIDENTIFIER NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[JobHistory]...';


GO
CREATE TABLE [dbo].[JobHistory] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [JobName]     NVARCHAR (100) NOT NULL,
    [Status]      NVARCHAR (20)  NOT NULL,
    [ScheduledAt] DATETIME       NOT NULL,
    [StartedAt]   DATETIME       NULL,
    [CompletedAt] DATETIME       NULL,
    [DurationMs]  INT            NULL,
    [Error]       NVARCHAR (MAX) NULL,
    [TriggeredBy] NVARCHAR (100) NULL,
    [Metadata]    NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[LoginProviders]...';


GO
CREATE TABLE [dbo].[LoginProviders] (
    [Id]          INT              IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (128)   NOT NULL,
    [Description] NVARCHAR (128)   NOT NULL,
    [ProviderId]  NVARCHAR (128)   NOT NULL,
    [CreatedAt]   DATETIME         NOT NULL,
    [RowId]       UNIQUEIDENTIFIER NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[LoginSessions]...';


GO
CREATE TABLE [dbo].[LoginSessions] (
    [Id]           INT              IDENTITY (1, 1) NOT NULL,
    [UserLoginId]  INT              NOT NULL,
    [AccessToken]  NVARCHAR (512)   NOT NULL,
    [RefreshToken] NVARCHAR (512)   NULL,
    [IsActive]     BIT              NOT NULL,
    [IssuedAt]     DATETIME         NULL,
    [ExpiresAt]    DATETIME         NULL,
    [LoggedOutAt]  DATETIME         NULL,
    [DeviceId]     UNIQUEIDENTIFIER NULL,
    [IpAddress]    NVARCHAR (64)    NULL,
    [UserAgent]    NVARCHAR (512)   NULL,
    [RowId]        UNIQUEIDENTIFIER NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[Roles]...';


GO
CREATE TABLE [dbo].[Roles] (
    [Id]          INT              NOT NULL,
    [Name]        NVARCHAR (128)   NOT NULL,
    [Slug]        NVARCHAR (64)    NOT NULL,
    [Description] NVARCHAR (256)   NULL,
    [CreatedAt]   DATETIME         NOT NULL,
    [RowId]       UNIQUEIDENTIFIER NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[UserLogins]...';


GO
CREATE TABLE [dbo].[UserLogins] (
    [Id]              INT              IDENTITY (1, 1) NOT NULL,
    [UserId]          INT              NOT NULL,
    [ProviderId]      INT              NOT NULL,
    [ProviderUserId]  NVARCHAR (256)   NULL,
    [Email]           NVARCHAR (256)   NULL,
    [PasswordHash]    NVARCHAR (512)   NULL,
    [Salt]            NVARCHAR (256)   NULL,
    [IsPasswordLogin] BIT              NOT NULL,
    [LinkedAt]        DATETIME         NOT NULL,
    [RowId]           UNIQUEIDENTIFIER NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [UQ_User_Provider] UNIQUE NONCLUSTERED ([UserId] ASC, [ProviderId] ASC)
);


GO
PRINT N'Creating Table [dbo].[Users]...';


GO
CREATE TABLE [dbo].[Users] (
    [Id]                     INT              IDENTITY (1, 1) NOT NULL,
    [FirstName]              NVARCHAR (128)   NOT NULL,
    [LastName]               NVARCHAR (128)   NULL,
    [UserName]               NVARCHAR (128)   NOT NULL,
    [Email]                  NVARCHAR (256)   NOT NULL,
    [RoleId]                 INT              NOT NULL,
    [Avatar]                 NVARCHAR (256)   NULL,
    [Bio]                    NVARCHAR (256)   NULL,
    [Gender]                 NVARCHAR (1)     NULL,
    [IsEmailVerified]        BIT              NOT NULL,
    [EmailVerificationToken] UNIQUEIDENTIFIER NULL,
    [CreatedAt]              DATETIME         NOT NULL,
    [UpdatedAt]              DATETIME         NOT NULL,
    [RowId]                  UNIQUEIDENTIFIER NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[ChangeLogs]...';


GO
ALTER TABLE [dbo].[ChangeLogs]
    ADD DEFAULT GETDATE() FOR [ChangedAt];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[ChangeLogs]...';


GO
ALTER TABLE [dbo].[ChangeLogs]
    ADD DEFAULT NEWID() FOR [RowId];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[LoginProviders]...';


GO
ALTER TABLE [dbo].[LoginProviders]
    ADD DEFAULT GETDATE() FOR [CreatedAt];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[LoginProviders]...';


GO
ALTER TABLE [dbo].[LoginProviders]
    ADD DEFAULT NEWID() FOR [RowId];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[LoginSessions]...';


GO
ALTER TABLE [dbo].[LoginSessions]
    ADD DEFAULT 1 FOR [IsActive];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[LoginSessions]...';


GO
ALTER TABLE [dbo].[LoginSessions]
    ADD DEFAULT NEWID() FOR [RowId];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[Roles]...';


GO
ALTER TABLE [dbo].[Roles]
    ADD DEFAULT GETDATE() FOR [CreatedAt];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[Roles]...';


GO
ALTER TABLE [dbo].[Roles]
    ADD DEFAULT NEWID() FOR [RowId];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[UserLogins]...';


GO
ALTER TABLE [dbo].[UserLogins]
    ADD DEFAULT 0 FOR [IsPasswordLogin];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[UserLogins]...';


GO
ALTER TABLE [dbo].[UserLogins]
    ADD DEFAULT GETDATE() FOR [LinkedAt];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[UserLogins]...';


GO
ALTER TABLE [dbo].[UserLogins]
    ADD DEFAULT NEWID() FOR [RowId];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[Users]...';


GO
ALTER TABLE [dbo].[Users]
    ADD DEFAULT (1) FOR [RoleId];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[Users]...';


GO
ALTER TABLE [dbo].[Users]
    ADD DEFAULT 0 FOR [IsEmailVerified];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[Users]...';


GO
ALTER TABLE [dbo].[Users]
    ADD DEFAULT GETDATE() FOR [CreatedAt];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[Users]...';


GO
ALTER TABLE [dbo].[Users]
    ADD DEFAULT GETDATE() FOR [UpdatedAt];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[Users]...';


GO
ALTER TABLE [dbo].[Users]
    ADD DEFAULT NEWID() FOR [RowId];


GO
PRINT N'Creating Foreign Key unnamed constraint on [dbo].[LoginSessions]...';


GO
ALTER TABLE [dbo].[LoginSessions] WITH NOCHECK
    ADD FOREIGN KEY ([UserLoginId]) REFERENCES [dbo].[UserLogins] ([Id]);


GO
PRINT N'Creating Foreign Key unnamed constraint on [dbo].[UserLogins]...';


GO
ALTER TABLE [dbo].[UserLogins] WITH NOCHECK
    ADD FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]);


GO
PRINT N'Creating Foreign Key unnamed constraint on [dbo].[UserLogins]...';


GO
ALTER TABLE [dbo].[UserLogins] WITH NOCHECK
    ADD FOREIGN KEY ([ProviderId]) REFERENCES [dbo].[LoginProviders] ([Id]);


GO
PRINT N'Creating Foreign Key unnamed constraint on [dbo].[Users]...';


GO
ALTER TABLE [dbo].[Users] WITH NOCHECK
    ADD FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles] ([Id]);


GO
PRINT N'Creating Procedure [dbo].[usp_CreateLoginSession]...';


GO
CREATE PROCEDURE [dbo].[usp_CreateLoginSession]
    @UserLoginId INT,
    @AccessToken NVARCHAR(512),
    @RefreshToken NVARCHAR(512),
    @ExpiresAt DATETIME,
    @IssuedAt DATETIME,
    @DeviceId NVARCHAR(256),
    @IPAddress NVARCHAR(64),
    @UserAgent NVARCHAR(512)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1 FROM LoginSessions
        WHERE DeviceId = @DeviceId AND UserLoginId = @UserLoginId
    )
    BEGIN
        UPDATE LoginSessions
        SET 
            AccessToken = @AccessToken,
            RefreshToken = @RefreshToken,
            IssuedAt = @IssuedAt,
            ExpiresAt = @ExpiresAt,
            IPAddress = @IPAddress,
            UserAgent = @UserAgent
        WHERE DeviceId = @DeviceId AND UserLoginId = @UserLoginId;

        SELECT Id
        FROM LoginSessions
        WHERE DeviceId = @DeviceId AND UserLoginId = @UserLoginId;
    END
    ELSE
    BEGIN
        INSERT INTO LoginSessions (
            UserLoginId, AccessToken, RefreshToken, IssuedAt, ExpiresAt,
            DeviceId, IPAddress, UserAgent
        )
        VALUES (
            @UserLoginId, @AccessToken, @RefreshToken, @IssuedAt, @ExpiresAt,
            @DeviceId, @IPAddress, @UserAgent
        );

        SELECT SCOPE_IDENTITY() AS SessionId;
    END
END
GO
PRINT N'Creating Procedure [dbo].[usp_DeleteChangeLogsByVersion]...';


GO
CREATE PROCEDURE [dbo].[usp_DeleteChangeLogsByVersion]
    @Version NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM ChangeLogs WHERE Version = @Version;
END
GO
PRINT N'Creating Procedure [dbo].[usp_GetProfileDetailsById]...';


GO
CREATE PROCEDURE [dbo].[usp_GetProfileDetailsById]
    @Id NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT RowId as UserId, FirstName,LastName,UserName,CreatedAt,Avatar,Gender,Email,RoleId,Bio FROM Users WHERE Id = @Id;
END
GO
PRINT N'Creating Procedure [dbo].[usp_GetUserLoginForEmail]...';


GO
CREATE PROCEDURE [dbo].[usp_GetUserLoginForEmail]
    @Email NVARCHAR(256)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        UL.Id,
        UL.PasswordHash,
        UL.Salt,
        UL.UserId,
        U.FirstName,
        U.LastName,
        U.UserName,
        U.IsEmailVerified  AS IsVerified
    FROM UserLogins UL
    INNER JOIN LoginProviders LP ON UL.ProviderId = LP.Id
    INNER JOIN Users U ON U.Id = UL.UserId
    WHERE LP.[Name] = 'Email'
      AND UL.Email = @Email
      AND UL.IsPasswordLogin = 1;
END


--EXEC GetUserLoginForEmail 
GO
PRINT N'Creating Procedure [dbo].[usp_GetUserSessions]...';


GO
CREATE PROCEDURE [dbo].[usp_GetUserSessions]
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        LS.Id AS SessionId,
        LS.AccessToken,
        LS.RefreshToken,
        LS.IsActive,
        LS.IssuedAt,
        LS.ExpiresAt,
        LS.LoggedOutAt,
        LS.DeviceId,
        LS.IPAddress,
        LS.UserAgent
    FROM LoginSessions LS
    INNER JOIN UserLogins UL ON LS.UserLoginId = UL.Id
    WHERE UL.UserId = @UserId
    ORDER BY LS.IssuedAt DESC;
END


--EXEC GetUserSessions @UserId = 1;
GO
PRINT N'Creating Procedure [dbo].[usp_InsertChangeLog]...';


GO
CREATE PROCEDURE [dbo].[usp_InsertChangeLog]
    @Version       NVARCHAR(50),
    @Title         NVARCHAR(255),
    @Description   NVARCHAR(MAX),
    @ChangeType    NVARCHAR(50),
    @Contributors  NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO ChangeLogs (
        Version,
        Title,
        Description,
        ChangeType,
        Contributors,
        ChangedAt,
        RowId
    )
    VALUES (
        @Version,
        @Title,
        @Description,
        @ChangeType,
        @Contributors,
        GETDATE(),
        NEWID()
    );

    SELECT SCOPE_IDENTITY() AS Id;
END
GO
PRINT N'Creating Procedure [dbo].[usp_SignupUser]...';


GO
CREATE PROCEDURE [dbo].[usp_SignupUser]
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
    IF EXISTS (SELECT 1 FROM Users WHERE UserName = @UserName)
    BEGIN
	    RAISERROR('EMAIL_CONFLICT', 16, 1);
	    RETURN;
    END

    -- Check for existing email
    IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
    BEGIN
	    RAISERROR('USERNAME_CONFLICT', 16, 1);
	    RETURN;
    END

    -- Insert into Users with email token
    INSERT INTO Users (FirstName, LastName, UserName, Email, EmailVerificationToken)
    VALUES (@FirstName, @LastName, @UserName, @Email, @EmailToken);

    SET @UserId = SCOPE_IDENTITY();

    -- Get or create Email provider
    SELECT @ProviderId = Id FROM LoginProviders WHERE [Name] = 'Email';
    IF @ProviderId IS NULL
    BEGIN
        INSERT INTO LoginProviders ([Name], [Description], ProviderId)
        VALUES ('Email', 'Email and password login', 'email');

        SET @ProviderId = SCOPE_IDENTITY();
    END

    -- Create login entry
    INSERT INTO UserLogins (UserId, ProviderId, Email, PasswordHash, Salt, IsPasswordLogin)
    VALUES (@UserId, @ProviderId, @Email, @PasswordHash, @Salt, 1);

    SELECT 
    @UserId AS UserId,
    @EmailToken AS EmailVerificationToken,
    @FirstName AS FirstName,
    @LastName AS LastName,
    @UserName AS UserName,
    @Email AS Email

END
GO
PRINT N'Creating Procedure [dbo].[usp_UpdateUserProfile]...';


GO
CREATE PROCEDURE [dbo].[usp_UpdateUserProfile]
    @Id INT,
    @FirstName NVARCHAR(128),
    @LastName NVARCHAR(128),
    @UserName NVARCHAR(128),
    @Gender NVARCHAR(1),
    @Bio NVARCHAR(256),
    @Avatar NVARCHAR(256),
    @ResultCode INT OUTPUT -- 0 = success, 1 = username conflict
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1 FROM Users
        WHERE UserName = @UserName AND Id <> @Id
    )
    BEGIN
        SET @ResultCode = 1;
        RETURN;
    END

    UPDATE Users
    SET
        FirstName = @FirstName,
        LastName = @LastName,
        UserName = @UserName,
        Gender = @Gender,
        Bio = @Bio,
        Avatar = @Avatar,
        UpdatedAt = GETDATE()
    WHERE Id = @Id;

    SET @ResultCode = 0;
END
GO
PRINT N'Creating Procedure [dbo].[usp_ValidateRefreshToken]...';


GO
CREATE PROCEDURE [dbo].[usp_ValidateRefreshToken]
    @RefreshToken NVARCHAR(512),
    @DeviceId NVARCHAR(256)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        UL.UserId,
        UL.Id AS UserLoginId,
        LS.Id AS SessionId
    FROM LoginSessions LS
    INNER JOIN UserLogins UL ON LS.UserLoginId = UL.Id
    WHERE 
        LS.RefreshToken = @RefreshToken AND
        LS.DeviceId = @DeviceId AND
        LS.IsActive = 1 AND
        LS.ExpiresAt > GETUTCDATE();
END
GO
PRINT N'Creating Procedure [dbo].[usp_VerifyEmail]...';


GO
CREATE PROCEDURE [dbo].[usp_VerifyEmail]
    @Token UNIQUEIDENTIFIER
AS
BEGIN
    UPDATE Users
    SET IsEmailVerified = 1,
        EmailVerificationToken = NULL
    WHERE EmailVerificationToken = @Token;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR('Invalid or expired token.', 16, 1);
    END
END
GO
PRINT N'Checking existing data against newly created constraints';


GO
USE [$(DatabaseName)];


GO
CREATE TABLE [#__checkStatus] (
    id           INT            IDENTITY (1, 1) PRIMARY KEY CLUSTERED,
    [Schema]     NVARCHAR (256),
    [Table]      NVARCHAR (256),
    [Constraint] NVARCHAR (256)
);

SET NOCOUNT ON;

DECLARE tableconstraintnames CURSOR LOCAL FORWARD_ONLY
    FOR SELECT SCHEMA_NAME([schema_id]),
               OBJECT_NAME([parent_object_id]),
               [name],
               0
        FROM   [sys].[objects]
        WHERE  [parent_object_id] IN (OBJECT_ID(N'dbo.LoginSessions'), OBJECT_ID(N'dbo.UserLogins'), OBJECT_ID(N'dbo.Users'))
               AND [type] IN (N'F', N'C')
                   AND [object_id] IN (SELECT [object_id]
                                       FROM   [sys].[check_constraints]
                                       WHERE  [is_not_trusted] <> 0
                                              AND [is_disabled] = 0
                                       UNION
                                       SELECT [object_id]
                                       FROM   [sys].[foreign_keys]
                                       WHERE  [is_not_trusted] <> 0
                                              AND [is_disabled] = 0);

DECLARE @schemaname AS NVARCHAR (256);

DECLARE @tablename AS NVARCHAR (256);

DECLARE @checkname AS NVARCHAR (256);

DECLARE @is_not_trusted AS INT;

DECLARE @statement AS NVARCHAR (1024);

BEGIN TRY
    OPEN tableconstraintnames;
    FETCH tableconstraintnames INTO @schemaname, @tablename, @checkname, @is_not_trusted;
    WHILE @@fetch_status = 0
        BEGIN
            PRINT N'Checking constraint: ' + @checkname + N' [' + @schemaname + N'].[' + @tablename + N']';
            SET @statement = N'ALTER TABLE [' + @schemaname + N'].[' + @tablename + N'] WITH ' + CASE @is_not_trusted WHEN 0 THEN N'CHECK' ELSE N'NOCHECK' END + N' CHECK CONSTRAINT [' + @checkname + N']';
            BEGIN TRY
                EXECUTE [sp_executesql] @statement;
            END TRY
            BEGIN CATCH
                INSERT  [#__checkStatus] ([Schema], [Table], [Constraint])
                VALUES                  (@schemaname, @tablename, @checkname);
            END CATCH
            FETCH tableconstraintnames INTO @schemaname, @tablename, @checkname, @is_not_trusted;
        END
END TRY
BEGIN CATCH
    PRINT ERROR_MESSAGE();
END CATCH

IF CURSOR_STATUS(N'LOCAL', N'tableconstraintnames') >= 0
    CLOSE tableconstraintnames;

IF CURSOR_STATUS(N'LOCAL', N'tableconstraintnames') = -1
    DEALLOCATE tableconstraintnames;

SELECT N'Constraint verification failed:' + [Schema] + N'.' + [Table] + N',' + [Constraint]
FROM   [#__checkStatus];

IF @@ROWCOUNT > 0
    BEGIN
        DROP TABLE [#__checkStatus];
        RAISERROR (N'An error occurred while verifying constraints', 16, 127);
    END

SET NOCOUNT OFF;

DROP TABLE [#__checkStatus];


GO
PRINT N'Update complete.';


GO
