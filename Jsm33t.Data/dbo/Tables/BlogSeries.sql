CREATE TABLE [BlogSeries]
(
    [Id]        INT                 IDENTITY(1,1) PRIMARY KEY,
    [RowId]     UNIQUEIDENTIFIER    DEFAULT(NEWID()),
    [Title]     NVARCHAR(128)    NOT NULL,
    [Slug]      NVARCHAR(150)    NOT NULL UNIQUE,
    [IsActive]  BIT              NOT NULL DEFAULT 1
);
