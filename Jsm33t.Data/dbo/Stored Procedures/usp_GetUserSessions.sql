﻿CREATE PROCEDURE [usp_GetUserSession]
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        LS.Id AS SessionId,
        LS.AccessToken,
        LS.RefreshToken,
        LS.IsActive,
        LS.IssuedAt,
        LS.ExpiresAt,
        LS.LoggedOutAt,
        LS.DeviceId,
        LS.IpAddress,
        LS.UserAgent
    FROM LoginSession LS
    INNER JOIN UserLogin UL ON LS.UserLoginId = UL.Id
    WHERE UL.UserId = @UserId
    ORDER BY LS.IssuedAt DESC;
END


--EXEC GetUserSessions @UserId = 1;