﻿CREATE TABLE [LoginProvider]
(
    [Id]            INT                PRIMARY KEY,
    [Name]          NVARCHAR(128)      NOT NULL, -- e.g. 'Email', 'Google'
    [Description]   NVARCHAR(128)      NOT NULL,
    [ProviderId]    NVARCHAR(128)      NOT NULL, -- e.g. 'email', 'google'
    [CreatedAt]     DATETIME2          NOT NULL DEFAULT GETDATE(),
    [RowId]         UNIQUEIDENTIFIER   NOT NULL DEFAULT NEWID()
);
