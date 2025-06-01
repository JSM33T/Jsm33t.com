CREATE TABLE [BlogAuthor]
(
    [BlogId]  UNIQUEIDENTIFIER NOT NULL,
    [UserId]  UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_BlogAuthor] PRIMARY KEY ([BlogId], [UserId]),
    CONSTRAINT [FK_BlogAuthor_Blog] FOREIGN KEY ([BlogId]) REFERENCES [Blog]([RowId]),
    CONSTRAINT [FK_BlogAuthor_User] FOREIGN KEY ([UserId]) REFERENCES [User]([RowId])
);
