﻿CREATE PROCEDURE [dbo].[usp_GetUserLogin]
    @Email NVARCHAR(256)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        UL.Id,
        UL.PasswordHash,
        UL.Salt,
        UL.UserId,
        U.FirstName,
        U.LastName,
        U.UserName,
        U.IsEmailVerified  AS IsVerified
    FROM UserLogins UL
    INNER JOIN LoginProviders LP ON UL.ProviderId = LP.Id
    INNER JOIN Users U ON U.Id = UL.UserId
    WHERE LP.[Name] = 'Email'
      --AND UL.Email = @Email
      AND (UL.Email = @Email OR U.UserName = @Email)
      AND UL.IsPasswordLogin = 1;
END


--EXEC GetUserLoginForEmail 