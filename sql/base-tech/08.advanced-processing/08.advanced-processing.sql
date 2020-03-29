
-- RANK 是用来计算记录排序的函数
select * from Product ORDER BY sale_price;

select
	product_name, product_type, sale_price,
	-- PARTITION BY 能够设定排序的对象范围， 为了按照商品种类进行排序，我们指定了 product_type
	-- ORDER BY 能够指定按照哪一列、何种顺序进行排序。
	-- 通过PARTTION BY分组后的记录的集合可以称为窗口
	-- 窗口函数兼具之前我们学过的 GROUP BY 子句的分组功能以及
ORDER BY 子句的排序功能。
	rank() over(partition by product_type ORDER BY sale_price ) as ranking
from Product;

select
	*,
	rank() over(partition by product_type order by sale_price) as ranking
FROM Product;

select product_type, count(*) FROM Product GROUP BY product_type;

select
	*,
	rank() over(partition by product_type order by sale_price) as ranking
FROM Product;
-- 无需指定PARTITION BY
select
	*,
	rank() over(order by sale_price) as ranking
FROM Product;
-- where 后的 order by
select * FROM Product  ORDER BY sale_price;


select
	product_name, product_type, sale_price,
	rank() over(order by sale_price) as ranking,
	dense_rank() over(order by sale_price) as dense_ranking,
	row_number() over(order by sale_price) as row_num
FROM product;

select
	*,
	row_number() over(order by sale_price) as ranking
FROM Product;

select
	product_id, product_name, sale_price, product_type,
-- 	row_number() over(order by sale_price) as ranking,
	sum(sale_price) over(order by product_id) as current_sum
FROM Product;

-- 将AVG函数作为窗口函数使用
SELECT
	*,
-- 	avg(sale_price) over(order by product_id) as avg_sum
	avg(sale_price) over(order by product_id) as avg_sum
FROM Product;
SELECT sum(sale_price) FROM Product;

-- 计算移动平均
SELECT
	*,
	-- 前面之和的平均数
	avg(sale_price) over(ORDER BY product_id) as avg_all,
	-- 指定“最靠近的3行”作为汇总对象
	avg(sale_price) over(ORDER BY product_id rows 2 preceding) as moving_avg,
	-- mysql 不支持
-- 	avg(sale_price) over(ORDER BY product_id rows 2 FOLLOWING) as following_avg,
	-- 前一行 自身 后一行
	avg(sale_price) over(ORDER BY product_id rows between 1 preceding and 1 following) as prceding_following_avg
FROM Product;


-- rollup
select
	product_type, sum(sale_price), avg(sale_price)
FROM
	product
GROUP BY product_type with rollup;

-- 将“登记日期”添加到聚合键当中
select product_type, regist_date, sum(sale_price)
FROM product
GROUP BY product_type, regist_date with ROLLUP;

SELECT * FROM product;




-- 两个ORDER BY
select
	*,
	rank() over(order by sale_price) as ranking
FROM Product;


SELECT product_name, product_type, sale_price,
RANK () OVER (ORDER BY sale_price) AS ranking
FROM Product
order by ranking;

-- 同时得到合计行
SELECT product_type, sum(sale_price) FROM Product GROUP BY product_type;

-- 分别计算出合计行和汇总结果再通过UNION ALL进行连接
select '合计' as product_type, sum(sale_price)
	FROM Product
union all
select product_type, sum(sale_price)
	FROM Product
GROUP BY product_type;

-- ROLLUP
select product_type, sum(sale_price)
	FROM Product
-- GROUP BY rollup(product_type);
GROUP BY product_type WITH ROLLUP;








