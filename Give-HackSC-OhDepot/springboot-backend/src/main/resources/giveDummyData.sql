DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Cards;

CREATE TABLE Users(
    userName varchar(50) NOT NULL,
    userPassword varchar(50) NOT NULL,
    actualName varchar(50) NOT NULL,
    gender varchar(50),
    age int,
    email varchar(50) NOT NULL,
    PRIMARY KEY(userName)
);

CREATE TABLE Cards(
	title varchar(100),
    taxID varchar(10),
	orgMessage varchar(2000),
	organization varchar(50),
    PRIMARY KEY(taxID)
)

