CREATE PROCEDURE [dbo].[usp_ValidateRefreshToken]
    @RefreshToken NVARCHAR(512),
    @DeviceId NVARCHAR(256)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        UL.UserId,
        UL.Id AS UserLoginId,
        LS.Id AS SessionId
    FROM LoginSessions LS
    INNER JOIN UserLogins UL ON LS.UserLoginId = UL.Id
    WHERE 
        LS.RefreshToken = @RefreshToken AND
        LS.DeviceId = @DeviceId AND
        LS.IsActive = 1 AND
        LS.ExpiresAt > GETUTCDATE();
END