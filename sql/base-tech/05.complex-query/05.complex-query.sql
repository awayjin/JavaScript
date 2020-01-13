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