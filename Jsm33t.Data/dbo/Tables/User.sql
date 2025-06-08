CREATE TABLE [User]
(
    [Id]                       INT                PRIMARY KEY IDENTITY(1,1),
    [FirstName]                NVARCHAR(128)      NOT NULL,
    [LastName]                 NVARCHAR(128)      NULL,
    [UserName]                 NVARCHAR(128)      NOT NULL,
    [Email]                    NVARCHAR(256)      NOT NULL,
    [RoleId]                   INT                NOT NULL DEFAULT 1,
    [Avatar]                   NVARCHAR(256)      NULL,
    [Bio]                      NVARCHAR(256)      NULL,
    [Gender]                   NVARCHAR(1)        NULL,
    [IsEmailVerified]          BIT                NOT NULL DEFAULT 0,
    [EmailVerificationToken]   UNIQUEIDENTIFIER   NULL,
    [CreatedAt]                DATETIME2          NOT NULL DEFAULT GETDATE(),
    [UpdatedAt]                DATETIME2          NOT NULL DEFAULT GETDATE(),
    [RowId]                    UNIQUEIDENTIFIER   NOT NULL DEFAULT NEWID(),
    [Points]                   INT                NOT NULL DEFAULT(100) 
    CONSTRAINT [UQ_User_UserName] UNIQUE ([UserName]),
    CONSTRAINT [UQ_User_Email] UNIQUE ([Email]),
    CONSTRAINT [UQ_User_RowId] UNIQUE ([RowId]),
    CONSTRAINT [FK_User_Role] FOREIGN KEY ([RoleId]) REFERENCES [Role]([Id])
);
