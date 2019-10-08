SELECT * FROM Product;
--  执行结果所示， product_type 列为 '厨房用具'，同时
-- regist_date 列为 '2009-09-20'的两条数据被合并成了一条

-- DDL
CREATE DATABASE myshop;
DROP TABLE chars;
CREATE TABLE Chars(
	chr CHAR (3) NOT NULL,
	PRIMARY KEY (chr)
);
-- DML
START TRANSACTION;
INSERT INTO Chars VALUES('10');
INSERT INTO Chars VALUES('6');
INSERT INTO Chars VALUES('5');
INSERT INTO Chars VALUES('3');
INSERT INTO Chars VALUES('1');
COMMIT;
