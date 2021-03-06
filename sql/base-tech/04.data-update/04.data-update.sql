drop table ProductIns;
CREATE TABLE ProductIns(
	product_id CHAR(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	product_type VARCHAR(32) NOT NULL,
	sale_price INTEGER DEFAULT 0,
	purchase_price INTEGER,
	regist_date DATE,
	PRIMARY KEY (product_id)
);

INSERT INTO ProductIns
(product_id, product_name, product_type, sale_price, purchase_price, regist_date)
VALUES
('0001', 'T恤衫', '衣服', 1000, 500, '2009-09-20');
-- INSERT
INSERT INTO ProductIns VALUES('0006', '圆珠笔', '办公用品', 3, 1.2, '2019-12-09');
INSERT INTO ProductIns VALUES('07-2', '圆珠笔', '办公用品', 3, null, '2019-12-09');
SELECT * FROM ProductIns;

-- 多行INSERT （Oracle以外）
INSERT INTO ProductIns VALUES 
('0002', '打孔器', '办公用品', 500, 320, '2009-09-11'),
('0003', '运动T恤', '衣服', 4000, 2800, NULL),
('0004', '菜刀', '厨房用具', 3000, 2800, '2009-09-20');

SELECT * FROM productins;

-- DEFAULT 约束, 创建表时来设定默认值
DROP TABLE DefaultProduct;
CREATE TABLE DefaultProduct(
	product_id CHAR(4) NOT NULL,
	sale_price INTEGER DEFAULT 0, -- 销售单值的默认值设为 0
	PRIMARY KEY (product_id)
);
INSERT INTO DefaultProduct VALUES(1, DEFAULT);
SELECT * FROM DefaultProduct;

SELECT * FROM ProductIns;

INSERT INTO ProductIns
(
  product_id, product_name, product_type, sale_price
)
VALUES
(
  '0007', '擦菜板', '厨房用具', DEFAULT
);

select * from ProductIns WHERE product_id = '0007'

-- 从其他表中复制数据
DROP TABLE ProductCopy;
CREATE TABLE ProductCopy(
	product_id CHAR(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	product_type VARCHAR(32) NOT NULL,
	sale_price INTEGER,
	purchase_price INTEGER,
	regist_date DATE,
	PRIMARY KEY(product_id)
)

-- 将商品表中的数据复制到商品复制表中
-- insert...select...from
INSERT INTO 
ProductCopy ( product_id, product_name, product_type, sale_price, purchase_price, regist_date ) 
SELECT
product_id, product_name, product_type, sale_price, purchase_price,regist_date 
FROM Product;

SELECT * FROM ProductCopy;

SELECT * FROM product;

-- 多种多样的SELECT语句
SELECT product_type, count(*) FROM ProductCopy GROUP BY product_type; -- 分组,为聚合结果指定条件
SELECT * FROM ProductCopy ORDER BY regist_date ASC; -- 对查询结果进行排序

-- 使用包含 GROUP BY 子句的 SELECT 语句进行插入
-- 根据商品种类进行汇总的表 
DROP TABLE productType;
CREATE TABLE product_type(
	product_type VARCHAR(32) NOT NULL,
	sum_sale_price INTEGER,
	sum_purchase_price INTEGER,
	primary key (product_type)
);

-- 插入其他表中数据合计值的INSERT ... SELECT语句
INSERT INTO product_type(product_type, sum_sale_price, sum_purchase_price )
SELECT product_type, sum(sale_price), sum(purchase_price) FROM productGROUP BY product_type;

SELECT * FROM product_type;

select * FROM product;
-- 分组
SELECT product_type, count(*) FROM product GROUP BY product_type;
SELECT * FROM product ORDER BY purchase_price asc;
SELECT * FROM product WHERE sale_price >= 1000;SELECT * FROM product WHERE regist_date IS NOT NULL;

show DATABASES;
show tables;

DROP TABLE defaultproduct;
delete FROM defaultproduct

DELETE FROM product WHERE sale_price >= 4000;

-- HAVING 选定特定组
SELECT product_type, avg(sale_price), count(*) FROM product 
GROUP BY product_type
HAVING avg(sale_price) >= 1000;

SELECT sale_price, sum(sale_price) FROM product 
GROUP BY sale_price
HAVING sale_price >= 200;

-- 只能删除表中全部数据的TRUNCATE语句
TRUNCATE chars;

-- 4-3 数据的更新（UPDATE语句的使用方法）
UPDATE product set regist_date = '2009-10-10';
-- 将登记日期全部更新为“2009-10-10
SELECT * FROM product ORDER BY product_id desc;

-- 指定条件的UPDATE语句（搜索型UPDATE）
-- 将商品种类为厨房用具的记录的销售单价更新为原来的10倍
UPDATE product SET sale_price = sale_price * 10 
WHERE product_type = '厨房用具';

UPDATE product SET regist_date = null WHERE product_id = '0008';



-- 多列更新
UPDATE product SET purchase_price = null WHERE product_id = '0008';
UPDATE product SET purchase_price = 790 WHERE product_id = '0007';

UPDATE product SET
sale_price = sale_price * 10, purchase_price = purchase_price / 10 / 2 
WHERE product_type = '厨房用具';
UPDATE product SET
sale_price = sale_price * 2 WHERE product_type = '厨房用具';

select * from product WHERE product_name = 'T恤衫';

-- 创建事务
START TRANSACTION;
UPDATE product SET regist_date = '2005-08-08' WHERE product_id = '0004';
COMMIT;

START TRANSACTION;
UPDATE product SET sale_price = sale_price - 1001 WHERE product_name = '运动T恤';
UPDATE product SET sale_price = sale_price + 1002 WHERE product_name = 'T恤衫';
COMMIT;

START TRANSACTION;
-- 将运动T恤的销售单价降低1000日元
UPDATE Product
SET sale_price = sale_price - 1000
WHERE product_name = '运动T恤';
-- 将T恤衫的销售单价上浮1000日元
UPDATE Product
SET sale_price = sale_price + 1000
WHERE product_name = 'T恤衫';
ROLLBACK;


select * from product;
select * from productcopy;

TRUNCATE productcopy;
-- 从其他表复制数据 insert...select...from
INSERT INTO productcopy
SELECT *
FROM product
WHERE product_type = '办公用品';

INSERT INTO Product VALUES 
('0003', '运动T恤', '衣服', 4000, 2800, NULL);


