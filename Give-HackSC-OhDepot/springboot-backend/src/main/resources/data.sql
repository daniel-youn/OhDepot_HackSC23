DROP TABLE IF EXISTS Teams;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Feedback;

CREATE TABLE Users(
--    User_ID INT PRIMARY KEY AUTO_INCREMENT,
    User_name PRIMARY_KEY VARCHAR(100),
    Actual_name VARCHAR(50),
    Gender VARCHAR(50),
    Age INT,
    Email VARCHAR(50)
);

CREATE TABLE Organizations(
	title PRIMARY_KEY VARCHAR(100)
	message VARCHAR(2000),
	organization VARCHAR(50),
	tags VARCHAR(1000),
)
-- INSERT INTO Teams VALUES(1, 'Test', 'Test.com');
-- INSERT INTO Users VALUES('user1', 1);
-- INSERT INTO Users VALUES('user2', 1);
-- INSERT INTO Feedback VALUES(1, 'user1', 'user2', '2022-11-06 12:12:12', 7, 'filler text', 1);