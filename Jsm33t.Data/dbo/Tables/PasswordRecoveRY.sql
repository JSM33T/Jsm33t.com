CREATE TABLE [PasswordRecovery]
(
    [Id]            INT               IDENTITY(1,1) PRIMARY KEY,
    [UserLoginId]   INT               NOT NULL,
    [Token]         UNIQUEIDENTIFIER  NULL UNIQUE,
    [Otp]           NVARCHAR(10)      NULL,
    [OtpExpiresAt]  DATETIME2         NULL,
    [CreatedAt]     DATETIME2         NOT NULL DEFAULT GETUTCDATE(),
    [UsedAt]        DATETIME2         NULL,
    [IsUsed]        BIT               NOT NULL DEFAULT 0,
    CONSTRAINT [FK_PasswordRecovery_UserLogin] FOREIGN KEY ([UserLoginId])
        REFERENCES [UserLogin]([Id])
        ON DELETE CASCADE
);
