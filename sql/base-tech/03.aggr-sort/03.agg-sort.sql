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

-- 销售总数，进化总数
select sum(sale_price), sum(purchase_price) FROM Product;


