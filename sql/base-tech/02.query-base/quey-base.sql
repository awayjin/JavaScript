
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
start TRANSACTION;
insert into Chars values('222');
insert into Chars values('11');
insert into Chars values('10');
insert into Chars values('3');
insert into Chars values('2');
insert into Chars values('1');
commit;

-- 3 222
select chr from Chars where chr > '2';

select product_name, purchase_price FROM Product;

-- 没有数据
select * from Product;
select product_name, purchase_price FROM Product 
WHERE purchase_price >= 500 || purchase_price is null;
select product_name, purchase_price FROM Product WHERE purchase_price = NULL;

select product_name, purchase_price FROM Product WHERE purchase_price IS NULL;
select product_name, purchase_price FROM Product WHERE purchase_price IS Not NULL;

SELECT * FROM Product
WHERE sale_price >= 1000;

SELECT * FROM Product
WHERE sale_price >= 1000
OR product_type = '厨房用具';

SELECT * FROM Product
WHERE NOT sale_price >= 1000
AND product_type = '厨房用具';


START TRANSACTION;
INSERT INTO Chars VALUES('10');
INSERT INTO Chars VALUES('6');
INSERT INTO Chars VALUES('5');
INSERT INTO Chars VALUES('3');
INSERT INTO Chars VALUES('1');
COMMIT;





