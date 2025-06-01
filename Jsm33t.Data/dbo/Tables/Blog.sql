CREATE TABLE [Blog]
(
    [Id]               INT               IDENTITY(1,1) PRIMARY KEY,
    [RowId]            UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWID(),
    [Title]            NVARCHAR(200)     NOT NULL,
    [Slug]             NVARCHAR(150)     NOT NULL UNIQUE,
    [Content]          NVARCHAR(MAX)     NOT NULL,
    [Summary]          NVARCHAR(512)     NULL,
    [CoverImageUrl]    NVARCHAR(512)     NULL,
    [CategoryId]       INT               NOT NULL,  -- FK to BlogCategory
    [SeriesId]         INT               NULL,      -- FK to BlogSeries
    [ParentId]         INT               NULL,      -- Parent blog in the same series (self-referencing)
    [IsPublished]      BIT               NOT NULL DEFAULT 0,
    [PublishedAt]      DATETIME2         NULL,
    [CreatedAt]        DATETIME2         NOT NULL DEFAULT GETDATE(),
    [UpdatedAt]        DATETIME2         NULL,
    [AuthorNotes]      NVARCHAR(1000)    NULL,
    [ViewCount]        INT               NOT NULL DEFAULT 0,
    [LikeCount]        INT               NOT NULL DEFAULT 0,
    [MetaTitle]        NVARCHAR(150)     NULL,
    [MetaDescription]  NVARCHAR(300)     NULL,
    [IsFeatured]       BIT               NOT NULL DEFAULT 0,
    [Status]           NVARCHAR(50)      NOT NULL DEFAULT 'Draft',
    CONSTRAINT [UQ_Blog_RowId] UNIQUE ([RowId]),
    CONSTRAINT [FK_Blog_BlogCategory] FOREIGN KEY ([CategoryId]) REFERENCES [BlogCategory]([Id]),
    CONSTRAINT [FK_Blog_BlogSeries] FOREIGN KEY ([SeriesId]) REFERENCES [BlogSeries]([Id]),
    CONSTRAINT [FK_Blog_ParentBlog] FOREIGN KEY ([ParentId]) REFERENCES [Blog]([Id])
);
