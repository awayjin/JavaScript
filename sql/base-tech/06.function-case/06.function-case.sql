SELECT * FROM Product;
SELECT count(*) FROM Product;
SELECT avg(purchase_price) FROM Product;
SELECT  max(purchase_price) FROM Product;
SELECT  min(purchase_price) FROM Product;
SELECT  sum(purchase_price) FROM Product;

SELECT *,
(
	SELECT avg(purchase_price) FROM Product p2 
		WHERE p1.product_type = p2.product_type
) as avg_purchase_price
FROM Product p1;

-- DDL 创建SampleMath表
CREATE TABLE SampleMath(
	m NUMERIC(10, 3),
	n integer,
	p Integer
);

-- DML ：插入数据
START TRANSACTION;
INSERT INTO SampleMath(m, n, p) VALUES (500, 0, NULL);
INSERT INTO SampleMath(m, n, p) VALUES (-180, 0, NULL);
INSERT INTO SampleMath(m, n, p) VALUES (NULL, NULL, NULL);
INSERT INTO SampleMath(m, n, p) VALUES (NULL, 7, 3);
INSERT INTO SampleMath(m, n, p) VALUES (NULL, 5, 2);
INSERT INTO SampleMath(m, n, p) VALUES (NULL, 4, NULL);
INSERT INTO SampleMath(m, n, p) VALUES (8, NULL, 3);
INSERT INTO SampleMath(m, n, p) VALUES (2.27, 1, NULL);
INSERT INTO SampleMath(m, n, p) VALUES (5.555,2, NULL);
INSERT INTO SampleMath(m, n, p) VALUES (NULL, 1, NULL);
INSERT INTO SampleMath(m, n, p) VALUES (8.76, NULL, NULL);
COMMIT;

SELECT * FROM SampleMath;
SELECT m, ABS(m) FROM SampleMath;

-- 求余
SELECT n, p, MOD(n, p) FROM SampleMath;

SELECT m, ROUND(m, 1) FROM SampleMath;
SELECT m, TRUNCATE(m, 1), ROUND(m, 1) FROM SampleMath;

START TRANSACTION;
INSERT INTO SampleStr (str1, str2, str3) VALUES ('opx', 'rt',NULL);
INSERT INTO SampleStr (str1, str2, str3) VALUES ('abc', 'def' ,NULL);
INSERT INTO SampleStr (str1, str2, str3) VALUES ('山田', '太郎' ,'是我');
INSERT INTO SampleStr (str1, str2, str3) VALUES ('aaa', NULL ,NULL);
INSERT INTO SampleStr (str1, str2, str3) VALUES (NULL, 'xyz',NULL);
INSERT INTO SampleStr (str1, str2, str3) VALUES ('@!#$%', NULL ,NULL);
INSERT INTO SampleStr (str1, str2, str3) VALUES ('ABC', NULL ,NULL);
INSERT INTO SampleStr (str1, str2, str3) VALUES ('aBC', NULL ,NULL);
INSERT INTO SampleStr (str1, str2, str3) VALUES ('abc太郎', 'abc' ,'ABC');
INSERT INTO SampleStr (str1, str2, str3) VALUES ('abcdefabc', 'abc' ,'ABC');
INSERT INTO SampleStr (str1, str2, str3) VALUES ('micmic', 'i' ,'I');
commit;

select * FROM SampleStr;

-- 字符串拼接
SELECT str1, str2, str3,
-- str1 || str2 as str_concat 
CONCAT(str1, str2, str3) as str_concat,
-- (str1 + str2 + str3) as str_plus_concat,
CONCAT(str1, str2) as str12_concat,
CONCAT(str2, str3) as str23_concat 
FROM SampleStr;

-- 字符串长度
SELECT str1, LENGTH(str1) FROM SampleStr;

-- LOWER函数
SELECT str1, LOWER(str1), UPPER(str1) FROM SampleStr;

-- REPLACE(对象字符串，替换前的字符串，替换后的字符串)
SELECT str1, str2, str3, replace(str1, str2, str3) FROM SampleStr;

select str1, substring(str1, 2, 3) FROM SampleStr;

SELECT CURRENT_DATE;
SELECT CURRENT_TIME;
SELECT current_timestamp;

select current_timestamp, extract(year from current_timestamp);
SELECT CURRENT_TIMESTAMP,
EXTRACT(YEAR FROM CURRENT_TIMESTAMP) AS year,
EXTRACT(MONTH FROM CURRENT_TIMESTAMP) AS month,
EXTRACT(DAY FROM CURRENT_TIMESTAMP) AS day,
EXTRACT(HOUR FROM CURRENT_TIMESTAMP) AS hour,
EXTRACT(MINUTE FROM CURRENT_TIMESTAMP) AS minute,
EXTRACT(SECOND FROM CURRENT_TIMESTAMP) AS second;

-- cast 转换为数字
SELECT cast('0002' as SIGNED INTEGER);
SELECT CAST('0001' AS SIGNED INTEGER) AS int_col;
select cast('2020-3-22' as date)

-- coalesce
SELECT coalesce(null, 3)

-- 6-2 LIKE谓词——字符串的部分一致查询
create table sample_like
(
	strcol VARCHAR(6) NOT NULL,
	primary key (strcol)
);

insert into sample_like(strcol) VALUE('abcdef');

start transaction;
INSERT INTO sample_like (strcol) VALUES ('abcddd');
INSERT INTO sample_like (strcol) VALUES ('dddabc');
INSERT INTO sample_like (strcol) VALUES ('abdddc');
INSERT INTO sample_like (strcol) VALUES ('abcdd');
INSERT INTO sample_like (strcol) VALUES ('ddabc');
INSERT INTO sample_like (strcol) VALUES ('abddc');
commit;

SELECT * FROM sample_like;
-- 前方一致
SELECT * FROM sample_like WHERE strcol like 'ddd%';

-- 中间一致查询
select * FROM sample_like WHERE strcol like '%ddd%';

-- 后方一致查询
select * FROM sample_like WHERE strcol like '%ddd';
select * FROM sample_like WHERE strcol like '%abc%';

-- 范围查询
select * FROM Product WHERE sale_price between 1000 and 3000;

-- IS NULL、 IS NOT NULL——判断是否为NULL
select * FROM Product WHERE purchase_price is null;
select * FROM Product WHERE purchase_price is not null;

-- 通过OR指定多个进货单价进行查询
select * FROM Product 
WHERE purchase_price = 500 or purchase_price = 2800;
-- 使用子查询作为IN谓词的参数
select * FROM Product WHERE purchase_price in(500, 2800);

SELECT * FROM Product WHERE sale_price > (SELECT avg(sale_price) FROM product);

-- 创建 ShopProduct 表
create table ShopProduct(
	shop_id char(4) not null,
	shop_name VARCHAR(200) not null,
	product_id char(4) not null,
	quantity integer not null,
	primary key (shop_id, product_id)
)

start transaction;
INSERT INTO ShopProduct (shop_id, shop_name, product_id, quantity) VALUES ('000A', '东京', '0001', 30);
INSERT INTO ShopProduct (shop_id, shop_name, product_id, quantity) VALUES ('000A', '东京', '0002', 50);
INSERT INTO ShopProduct (shop_id, shop_name, product_id, quantity) VALUES ('000A', '东京', '0003', 15);
INSERT INTO ShopProduct (shop_id, shop_name, product_id, quantity) VALUES ('000B', '名古屋', '0002', 30);
INSERT INTO ShopProduct (shop_id, shop_name, product_id, quantity) VALUES ('000B', '名古屋', '0003', 120);
INSERT INTO ShopProduct (shop_id, shop_name, product_id, quantity) VALUES ('000B', '名古屋', '0004', 20);
INSERT INTO ShopProduct (shop_id, shop_name, product_id, quantity) VALUES ('000B', '名古屋', '0006', 10);
INSERT INTO ShopProduct (shop_id, shop_name, product_id, quantity) VALUES ('000B', '名古屋', '0007', 40);
INSERT INTO ShopProduct (shop_id, shop_name, product_id, quantity) VALUES ('000C', '大阪', '0003', 20);
INSERT INTO ShopProduct (shop_id, shop_name, product_id, quantity) VALUES ('000C', '大阪', '0004', 50);
INSERT INTO ShopProduct (shop_id, shop_name, product_id, quantity) VALUES ('000C', '大阪', '0006', 90);
INSERT INTO ShopProduct (shop_id, shop_name, product_id, quantity) VALUES ('000C', '大阪', '0007', 70);
INSERT INTO ShopProduct (shop_id, shop_name, product_id, quantity) VALUES ('000D', '福冈', '0001', 100);
commit;

select * FROM ShopProduct;
select * FROM ShopProduct WHERE shop_id = '000c';

-- 读取出“大阪店（ 000C）在售商品（ product_id）的销售单价（ sale_price）”
select * FROM Product
WHERE product_id in(select product_id FROM ShopProduct WHERE shop_id = '000c');

select * FROM Product
WHERE product_id not in(select product_id FROM ShopProduct WHERE shop_id = '000c');


select * FROM ShopProduct WHERE shop_name like '%大阪%';
select * FROM ShopProduct WHERE shop_id='000c';

-- 大阪店（ 000C）在售商品（ product_id）的销售单价（ sale_price）
SELECT 
product_name, sale_price,  
 '000C大阪'
FROM Product WHERE product_id
in(
-- 	'0003', 4
	select product_id FROM ShopProduct WHERE shop_id = '000c'
);

-- exists 关联子查询
SELECT product_name, sale_price
FROM Product as P1 
WHERE exists (
	-- select 3 也可以
	SELECT * FROM ShopProduct as SP
	WHERE shop_id = '000C'
	AND P1.product_id = Sp.product_id
);

SELECT *
FROM Product as P1 
WHERE not exists (
	SELECT * FROM ShopProduct as SP
	WHERE shop_id = '000C'
	AND P1.product_id = Sp.product_id
);

-- 6-3 CASE表达式
SELECT product_name,
	CASE 
		WHEN product_type = '衣服' THEN  concat('A ：', product_type) 
		WHEN product_type = '办公用品' THEN concat('B ：', product_type) 
		WHEN product_type = '厨房用具' THEN concat('C ：', product_type) 
		ELSE NULL
	END AS abc_product_type
FROM Product;

-- 计算出销售单价的合计值
SELECT product_type, count(product_type), sum(sale_price) FROM Product 
GROUP BY product_type;

SELECT product_type, sum(sale_price)
FROM Product 
GROUP BY product_type;

-- 对按照商品种类计算出的销售单价合计值进行行列转换
SELECT 
	sum(
		case when product_type = '衣服' 
		then sale_price 
		else 0 end 
	) as sum_price_clothes,
	sum(
		case when product_type = '厨房用具'
		then sale_price
		else 0 end 
	) as sum_price_kitchen,
	sum(
		case when product_type = '办公用品'
		then sale_price
		else 0 end
	) as sum_price_office
FROM Product;

-- -- 使用简单CASE表达式的情况
SELECT 
	product_name,
	case product_type
		when '衣服' then concat('A:', product_type)
		when '厨房用具' then concat('B:', product_type)
		when '办公用品' then concat('C:', product_type)
	else 0
	end
FROM Product;

-- MySQL 中的 IF 将字符串 A ～ C 添加到商品种

SELECT product_name, purchase_price
FROM Product
WHERE purchase_price not in (500, 2800, 5000);

SELECT product_id, product_name, purchase_price
FROM Product
-- WHERE purchase_price  is not null;
WHERE purchase_price is null;

 select length(NULL), length(''), length('1')

SELECT 
	sum(
		case when sale_price <= 1000 
		then 1
		else 0 end
	) as low_price_count,
	sum(
-- 		case when sale_price between  1000 and 3000
		case when sale_price >  1000 and sale_price <= 3000
		then 1
		else 0 end
	) as middle_price_count,
	sum(
		case when sale_price > 3000
		then 1
		else 0 end
	) as high_price_count
FROM Product;

SELECT * FROM Product;

SELECT count(sale_price between 1000 and 3000) FROM Product;












