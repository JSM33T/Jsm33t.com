CREATE PROCEDURE [usp_DeleteChangeLogsByVersion]
    @Version NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM ChangeLog WHERE Version = @Version;
END