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







