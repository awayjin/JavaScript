-- 第5章　复杂查询
-- 实际上视图保存的是 SELECT 语句

-- 5-1 视图的优点
-- 第一点是由于视图无需保存数据，因此可以节省存储设备的容量。
SELECT 
product_type, COUNT(*),SUM(sale_price), SUM(purchase_price) 
FROM Product GROUP BY product_type;

-- 第二个优点就是可以将频繁使用的 SELECT 语句保存成视图，这样
-- 就不用每次都重新书写了。

-- 创建视图的方法
CREATE VIEW product_sum2 (product_type, cnt_product)
AS
SELECT product_type, count(*)
FROM Product  
GROUP BY product_type;

DELETE FROM Product;
truncate product;
SELECT * FROM Product;
select * from product_sum;
-- 删除视图
drop view product_sum;

create view product_sum(product_type, count_pro_type)
as
select product_type, count(*) FROM Product
group by product_type;

insert into product(product_id, product_name, product_type)
values('0009', '小本子', '办公用品');


-- 创建视图
create view product_sum2(product_type, count_product_type)
as 
select product_type, count(*) from product
group by product_type
order by product_type;  -- mysql 可以插入


select * FROM product_sum2;


-- 视图的限制② ——对视图进行更新
insert into product_sum values ('添加类型', 1)


-- 不是通过汇总得到的视图就可以进行更新。
create view product_jim(
	product_id, product_name, product_type, purchase_price, sale_price, regist_date
)
as
SELECT * FROM product
WHERE product_type = '办公用品';

insert into product_jim VALUES ('0009', '印章', '办公用品', 50,  150, '2020-01-13');

update product_jim set  
purchase_price = '10', sale_price = '95', sale_price = '95'
WHERE product_id = '0009';

select * FROM product_jim;
select * FROM product_jim WHERE product_id = '0009';

-- 删除视图
drop view product_sum;


-- 根据商品种类统计商品数量的视图
-- 在FROM子句中直接书写定义视图的SELECT语句
SELECT product_type, cnt_product
FROM ( SELECT product_type, COUNT(*) AS cnt_product
FROM Product
GROUP BY product_type ) AS ProductSum;

-- 5-2 子查询
select * from 
(select product_type, count(*) from product GROUP BY product_type )
as prod; -- as 不是必须的


-- 增加子查询的层数
SELECT
	product_type,
	cnt_product 
FROM
	( SELECT * FROM ( SELECT product_type, COUNT( * ) AS cnt_product FROM Product GROUP BY product_type ) AS ProductSum WHERE cnt_product = 3 ) AS ProductSum2;


select 
	*
from
	(
		select * from 
			(select product_type, count(*)  as count_pro_type from product GROUP BY product_type) as product_sum 
		where count_pro_type = 2
	)
as aa;

-- 作为别名, where 
select * from 
	(
		select * from 
		(
			select product_type, count(*) as cnt from product group by product_type
		) as product_sum2 where cnt = 3
	)
as product_sum;

-- 在WHERE子句中使用标量子查询

-- 查询出销售单价高于平均销售单价的商品
select * from product 
where sale_price > (select AVG(sale_price) from product);

-- -- 标量子查询的书写位置

-- 在SELECT子句中使用标量子查询
select 
product_id, product_name, sale_price
, (select avg(sale_price)  from product) as avg_sale_price
from product;

-- 在HAVING子句中使用标量子查询
-- WHERE子句用来指定数据行的条件， HAVING子句用来指定分组的条件
select product_type, count(*) as cnt from product GROUP BY product_type having cnt > 2;

select product_type, avg(sale_price) from product
GROUP BY product_type
having avg(sale_price) > (select avg(sale_price) FROM product);


-- 使用标量子查询时的注意事项
select 
product_id, product_name, sale_price, 
(select sale_price FROM product)
as avg_price
from product;

drop table Product;
select * from product;
select avg(sale_price) from product WHERE product_type = '厨房用具';
select product_type, count(*) as cnt_product_type FROM Product
GROUP BY product_type
having count(*) = 2 ;

-- 使用子查询就能选取出销售单价（ sale_price）高
-- 于全部商品平均销售单价的商品
select * from product WHERE sale_price > (select avg(sale_price) from product);

select AVG(sale_price) FROM Product;
select * FROM Product WHERE sale_price > (SELECT AVG(sale_price) FROM Product);

SELECT AVG(sale_price) FROM Product GROUP BY product_type;
SELECT * FROM Product GROUP BY product_type;
SELECT count(regist_date) FROM Product;
SELECT count(purchase_price) FROM Product;
SELECT MAX(sale_price), min(purchase_price) FROM Product;
SELECT count(distinct product_type) FROM Product;
SELECT product_type, count(*) FROM Product GROUP BY product_type;
SELECT sale_price, count(*) FROM Product GROUP BY sale_price;
SELECT product_type, count(*) FROM Product group by product_type;
select avg(sale_price) FROM Product;
SELECT * FROM Product WHERE product_type='厨房用具';
SELECT product_type, count(*) as pt FROM Product 
WHERE product_type = '衣服'
GROUP BY product_type HAVING pt = 2;

-- 按照商品种类计算平均价格
SELECT avg(sale_price) FROM Product GROUP BY product_type;
select sum(sale_price) FROM Product GROUP BY regist_date;
SELECT product_id, product_name, sale_price
FROM Product
WHERE sale_price > (SELECT AVG(sale_price)
FROM Product
GROUP BY product_type);

-- 通过关联子查询按照商品种类对平均销售单价进行比较
SELECT product_id, product_name, sale_price, product_type
FROM Product as P1
WHERE sale_price > (SELECT AVG(sale_price)
FROM Product as P2
-- 关键: 在同一商品种类中对各商品的销售单价和平均单价进行比较
WHERE P1.product_type = P2.product_type
GROUP BY product_type);
-- 这样我们就能选取出办公用品、衣服和厨房用具三类商品中高于该类
-- 商品的平均销售单价的商品了

-- 销售单价高于平均销售价格
SELECT avg(sale_price) FROM Product;
SELECT * FROM Product WHERE sale_price > (SELECT avg(sale_price) FROM Product);

SELECT * FROM Product WHERE product_type = '厨房用具';
-- 厨房用具的平均销售单价
SELECT avg(sale_price) FROM Product WHERE product_type = '厨房用具';
SELECT * FROM Product as p1 
WHERE product_type = '厨房用具' && sale_price > (
	SELECT avg(sale_price) FROM Product as p2
)
-- 按照商品种类计算平均价格
SELECT avg(sale_price) FROM Product GROUP BY product_type;
-- 对商品种类进行分组并统计个数
SELECT product_type, count(*) FROM Product GROUP BY product_type;

SELECT * FROM Product as p1 
WHERE
sale_price > (
SELECT avg(sale_price) FROM Product as p2 
WHERE p1.product_type = p2.product_type
GROUP BY product_type
);






