-- 表的加法——UNION
create table Product2 (
	product_id char(4) not null,
	product_name varchar(100) not null,
	product_type varchar(32) not null,
	sale_price integer,
	purchase_price integer,
	regist_date Date,
	primary key (product_id)
);

select CURRENT_TIMESTAMP;
insert into Product2(product_id, product_type, product_name, sale_price, purchase_price, regist_date)
values ('0000', 'type', 'name', 1, 1, (SELECT CURRENT_TIMESTAMP));


start transaction;

-- values ('0000', 'type', 'name', 1, 1, '2020-03-01 22:40');
INSERT INTO Product2 VALUES ('0001', 'T恤衫' ,'衣服', 1000, 500, '2008-09-20');
INSERT INTO Product2 VALUES ('0002', '打孔器', '办公用品', 500, 320, '2009-09-11');
INSERT INTO Product2 VALUES ('0003', '运动T恤', '衣服', 4000, 2800, NULL);
INSERT INTO Product2 VALUES ('0009', '手套', '衣服', 800, 500, NULL);
INSERT INTO Product2 VALUES ('0010', '水壶', '厨房用具', 2000, 1700, '2009-09-20');

commit;

select * from Product
union
select * from Product2;
select sale_price from Product
union
select product_name from Product2;

-- 列数不一致时会发生错误
SELECT product_id, product_name
FROM Product
UNION
SELECT product_id, product_name, sale_price
FROM Product2;

-- 数据类型不一致时会发生错误(mysql 可以)
SELECT product_id, sale_price
FROM Product
UNION
SELECT product_id, regist_date
FROM Product2;

-- ORDER BY子句只在最后使用一次
SELECT *
FROM Product
WHERE product_type = '厨房用具'
UNION
SELECT *
FROM Product2
WHERE product_type = '厨房用具'
ORDER BY product_id desc;

-- 包含重复行的集合运算——ALL选项
SELECT * FROM product  
union all
SELECT * FROM Product2;



