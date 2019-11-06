-- 聚合
select * FROM Product;
select COUNT(*) FROM Product;

-- 计算NULL之外的数据的行数
select COUNT(purchase_price), COUNT(product_id) FROM Product;

-- 对于 COUNT 函数来说，参数列不同计
-- 算的结果也会发生变化
CREATE TABLE NullTbl(col_1 VARCHAR(4));
INSERT INTO NullTbl VALUES(null);
SELECT COUNT(*), COUNT(col_1) FROM NullTbl;

-- SUM 函数 求出销售单价的合计值
SELECT SUM(sale_price) FROM Product;

-- 销售总数，进价总数
select sum(sale_price), sum(purchase_price) FROM Product;

-- 计算平均值
select AVG(sale_price) FROM Product;

-- 计算最大值和最小值
select *  FROM product;
select MAX(sale_price), MIN(sale_price), AVG(sale_price) FROM Product;

-- 计算登记日期的最大值和最小值
select MAX(regist_date), MIN(regist_date) FROM product;


select * FROM product;
select DISTINCT (purchase_price) FROM product;

-- 计算去除重复数据后的数据行数
-- DISTINCT 必须写在括号中
select COUNT(DISTINCT (product_type)) FROM product;

-- 使不使用DISTINCT时的动作差异（SUM函数）
SELECT SUM(sale_price), SUM(distinct sale_price) FROM product;

-- 3-2 对表进行分组
-- GROUP BY子句
select product_type FROM Product;
-- 商品种类来统计一下数据行数（= 商品数量）
select product_type, count(*) FROM Product GROUP BY product_type;
select avg(sale_price) FROM Product;
select max(sale_price) FROM Product ;
select regist_date, count(*) FROM product GROUP BY regist_date;

-- 聚合键中包含NULL的情况
select purchase_price, count(*) FROM product GROUP BY purchase_price;

-- 使用WHERE子句时GROUP BY的执行结果
SELECT purchase_price, count(*), product_type 
FROM product where product_type='衣服' GROUP BY purchase_price;


-- 常见错误1: 与聚合函数和GROUP BY子句有关的常见错误
SELECT 
'商品' AS string, product_id as p_id, product_name, 38 as dd
FROM Product;

SELECT product_id, product_type, count(*) 
FROM product 
GROUP BY product_type;

-- 常见错误2 ——在GROUP BY子句中写了列的别名
-- 这样的写法在其他 DBMS 中并不是通用的
SELECT product_type AS pt, count(*)
FROM Product
GROUP BY pt;

-- 常见错误3 —— GROUP BY子句的结果能排序吗
-- 答案是：“随机的。”

-- 常见错误4 ——在WHERE子句中使用聚合函数
SELECT product_type, count(*)
FROM Product
-- 只有 SELECT 子句和 HAVING 子句中能够使用 COUNT 等聚合函数
WHERE COUNT(*) = 2 -- 错误
GROUP BY product_type;

SELECT product_type, count(*) FROM product GROUP BY product_type having count(*) = 4;


-- 在“想要删除选择结果中的重复记录”时使用 DISTINCT，
-- 在“想要计算汇总结果”时使用 GROUP BY
select distinct product_type FROM Product;
select product_type FROM Product GROUP BY product_type;
select product_type, count(*) FROM Product GROUP BY product_type;
select purchase_price FROM Product GROUP BY purchase_price;
select purchase_price, count(*) FROM Product GROUP BY purchase_price;


-- 为3-3 为聚合结果指定条件
-- 分组后取出结果为2行的结果
SELECT product_type, COUNT(product_type) 
FROM product 
group by product_type
having COUNT(*) = 2;

-- 销售单价的平均值大于等于 2500 日元
select product_type, avg(sale_price) 
from Product 
group by product_type 
having avg(sale_price) >= 2500;

select regist_date, sum(sale_price) FROM product GROUP BY regist_date;
select regist_date, sum(sale_price) FROM product GROUP BY regist_date HAVING regist_date = '2009-09-11';
























