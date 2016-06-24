use churchmanager;

CREATE TABLE rfm_tithe
(
id int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
amount DOUBLE NOT NULL ,
dateCreated DATETIME,
member int NOT NULL
);