-------------------------------------
-- version	:	1
-- date		:	2025/03/28
-- comment	:	Seed login providers

---------------------------------------
INSERT INTO LoginProvider ([Id],[Name], [Description], ProviderId)
VALUES 
(1,'Email', 'Email and password login', 'email'),
(2,'Google', 'Google Login', 'google'),
(3,'Github', 'Github Login', 'github'),
(4,'Facebook', 'Facebook Login', 'facebook'),
(5,'Twitter', 'Twitter Login', 'twitter'),
(6,'Apple', 'Apple Login', 'apple'),
(7,'Microsoft', 'Microsoft Login', 'microsoft');