CREATE PROCEDURE [usp_CreateLoginSession]
    @UserLoginId   INT,
    @AccessToken   NVARCHAR(512),
    @RefreshToken  NVARCHAR(512),
    @ExpiresAt     DATETIME,
    @IssuedAt      DATETIME,
    @DeviceId      NVARCHAR(256),
    @IpAddress     NVARCHAR(64),
    @UserAgent     NVARCHAR(512)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM [LoginSession]
        WHERE [DeviceId] = @DeviceId AND [UserLoginId] = @UserLoginId
    )
    BEGIN
        UPDATE [LoginSession]
        SET 
            [AccessToken] = @AccessToken,
            [RefreshToken] = @RefreshToken,
            [IssuedAt] = @IssuedAt,
            [ExpiresAt] = @ExpiresAt,
            [IpAddress] = @IpAddress,
            [UserAgent] = @UserAgent
        WHERE [DeviceId] = @DeviceId AND [UserLoginId] = @UserLoginId;

        SELECT [Id]
        FROM [LoginSession]
        WHERE [DeviceId] = @DeviceId AND [UserLoginId] = @UserLoginId;
    END
    ELSE
    BEGIN
        INSERT INTO [LoginSession] (
            [UserLoginId], [AccessToken], [RefreshToken], [IssuedAt], [ExpiresAt],
            [DeviceId], [IpAddress], [UserAgent]
        )
        VALUES (
            @UserLoginId, @AccessToken, @RefreshToken, @IssuedAt, @ExpiresAt,
            @DeviceId, @IpAddress, @UserAgent
        );

        SELECT SCOPE_IDENTITY() AS [SessionId];
    END
END
