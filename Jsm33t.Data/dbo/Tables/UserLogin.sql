CREATE TABLE [UserLogin]
(
    [Id]               INT                PRIMARY KEY IDENTITY(1,1),
    [UserId]           INT                NOT NULL,
    [ProviderId]       INT                NOT NULL,
    [ProviderUserId]   NVARCHAR(256)      NULL,  -- for OAuth providers
    [Email]            NVARCHAR(256)      NULL,  -- only for email provider
    [PasswordHash]     NVARCHAR(512)      NULL,  -- only for email provider
    [Salt]             NVARCHAR(256)      NULL,  -- only for email provider
    [IsPasswordLogin]  BIT                NOT NULL DEFAULT 0,
    [LinkedAt]         DATETIME2          NOT NULL DEFAULT GETDATE(),
    [RowId]            UNIQUEIDENTIFIER   NOT NULL DEFAULT NEWID(),
    CONSTRAINT [UQ_User_Provider] UNIQUE ([UserId], [ProviderId]),
    CONSTRAINT [FK_UserLogin_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserLogin_LoginProvider] FOREIGN KEY ([ProviderId]) REFERENCES [LoginProvider]([Id])
);
