CREATE TABLE [Role]
(
    [Id]            INT                NOT NULL PRIMARY KEY,
    [Name]          NVARCHAR(128)      NOT NULL,
    [Slug]          NVARCHAR(64)       NOT NULL,
    [Description]   NVARCHAR(256)      NULL,
    [CreatedAt]     DATETIME2          NOT NULL DEFAULT GETDATE(),
    [RowId]         UNIQUEIDENTIFIER   NOT NULL DEFAULT NEWID()
);
