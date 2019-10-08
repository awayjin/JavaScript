

drop table Product;
CREATE TABLE Product
(product_id      CHAR(4)      NOT NULL,
 product_name    VARCHAR(100) NOT NULL,
 product_type    VARCHAR(32)  NOT NULL,
 sale_price      INTEGER ,
 purchase_price  INTEGER ,
 regist_date     DATE ,
 PRIMARY KEY (product_id));
 
 START TRANSACTION;
INSERT INTO Product VALUES ('0001', 'T恤衫', '衣服',
1000, 500, '2009-09-20');
INSERT INTO Product VALUES ('0002', '打孔器', '办公用品',
500, 320, '2009-09-11');
INSERT INTO Product VALUES ('0003', '运动T恤', '衣服',
4000, 2800, NULL);
INSERT INTO Product VALUES ('0004', '菜刀', '厨房用具',
3000, 2800, '2009-09-20');
INSERT INTO Product VALUES ('0005', '高压锅', '厨房用具',
6800, 5000, '2009-01-15');
INSERT INTO Product VALUES ('0006', '叉子', '厨房用具',
500, NULL, '2009-09-20');
INSERT INTO Product VALUES ('0007', '擦菜板', '厨房用具',
880, 790, '2008-04-28');
INSERT INTO Product VALUES ('0008', '圆珠笔', '办公用品',
100, NULL,'2009-11-11');
COMMIT;


-- CREATE DATABASE myshop;
USE myshop;
drop table Product;
CREATE TABLE Product (
	product_id CHAR ( 4 ) NOT NULL,
	product_name VARCHAR ( 100 ) NOT NULL,
	product_type VARCHAR ( 32 ) NOT NULL,
	sale_price INTEGER,
	purchase_price INTEGER,
	regist_date Date,
	PRIMARY KEY ( product_id ) 
);
ALTER TABLE Product ADD COLUMN ( demo_alter VARCHAR ( 20 ) NOT NULL );
ALTER TABLE Product ADD COLUMN ( product_name_pinyin VARCHAR ( 100 ) );
ALTER TABLE Product DROP COLUMN demo;
ALTER TABLE Product DROP COLUMN product_name_pinyin 


-- START TRANSACTION;
START TRANSACTION;

INSERT INTO Product
VALUES
	( '0002', 'T恤衫', '衣服', 2000, 600, '2008-10-05' ) ;
COMMIT;

INSERT INTO Product
VALUES
	( '0004', '菜刀', '厨房用具', 2000, 500, '2009-09-20' );
	
	
ALTER TABLE Product DROP COLUMN demo_alter;

rename table product to pro_demo;
rename table pro_demo to Product;

SELECT * from Product where  product_type='厨房用具';

SELECT * FROM Product;

SELECT purchase_price, product_id, product_name, purchase_price FROM Product;

INSERT INTO Product VALUES('0005', '筷子', '厨房用具', 20, 4, '2019-10-06');

-- 为列设定别名
-- SELECT product_id AS id, sale_price AS "价格" FROM Product;
SELECT product_id AS id, sale_price AS '价格' FROM Product;

--  书写常数
SELECT 
'商品' AS string, 38 as number, '2019-10-03' as date, product_id, product_name 
FROM Product;

-- 从结果中删除重复行
SELECT distinct product_type FROM Product;
SELECT distinct purchase_price FROM Product;

--  执行结果所示， product_type 列为 '厨房用具'，同时
-- regist_date 列为 '2009-09-20'的两条数据被合并成了一条
SELECT distinct product_type, regist_date FROM Product;

SELECT distinct product_type, regist_date, product_id FROM Product;

-- where 子句
SELECT * FROM Product WHERE product_type = '衣服';

SELECT product_type, product_name, product_id
FROM Product 
WHERE product_type = '衣服';

/* 从结果删除重复行 */
SELECT distinct product_type from Product;

-- 2.2 算术运算符和比较运算符
SELECT *, sale_price * 2 as 'sale_price_*2' FROM Product;

SELECT *, (sale_price * 2 + 2 - 1 ) / 2 as 'sale_price_*2' FROM Product;

SELECT *, sale_price * NULL as 'sale_price_*2' FROM Product;






 