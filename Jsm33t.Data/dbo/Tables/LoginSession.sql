CREATE TABLE [LoginSession]
(
    [Id]             INT               PRIMARY KEY IDENTITY(1,1),
    [UserLoginId]    INT               NOT NULL,
    [AccessToken]    NVARCHAR(512)     NOT NULL,
    [RefreshToken]   NVARCHAR(512)     NULL,
    [IsActive]       BIT               NOT NULL DEFAULT 1,
    [IssuedAt]       DATETIME2         NULL,
    [ExpiresAt]      DATETIME2         NULL,
    [LoggedOutAt]    DATETIME2         NULL,
    [DeviceId]       UNIQUEIDENTIFIER  NULL,
    [IpAddress]      NVARCHAR(64)      NULL,
    [UserAgent]      NVARCHAR(512)     NULL,
    [RowId]          UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWID(),
    CONSTRAINT [FK_LoginSession_UserLogin] FOREIGN KEY ([UserLoginId]) REFERENCES [UserLogin]([Id])
);
