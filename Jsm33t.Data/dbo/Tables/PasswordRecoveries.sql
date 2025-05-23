﻿CREATE TABLE PasswordRecoveries (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserLoginId INT NOT NULL,
    Token UNIQUEIDENTIFIER NULL UNIQUE,
    Otp NVARCHAR(10) NULL,
    OtpExpiresAt DATETIME2 NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UsedAt DATETIME2 NULL,
    IsUsed BIT NOT NULL DEFAULT 0,

    CONSTRAINT FK_PasswordRecoveries_UserLogins FOREIGN KEY (UserLoginId)
        REFERENCES UserLogins(Id)
        ON DELETE CASCADE
);
