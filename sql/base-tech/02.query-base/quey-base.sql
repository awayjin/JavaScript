select * from Product;
--  执行结果所示， product_type 列为 '厨房用具'，同时
-- regist_date 列为 '2009-09-20'的两条数据被合并成了一条

-- DDL
drop table chars;
CREATE TABLE Chars(
	chr CHAR (3) NOT NULL,
	PRIMARY KEY (chr)
);
-- DML
start TRANSACTION;
insert into Chars values('10');
insert into Chars values('6');
insert into Chars values('5');
insert into Chars values('3');
insert into Chars values('1');
commit;
