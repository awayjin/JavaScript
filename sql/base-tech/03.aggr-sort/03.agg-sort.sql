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


