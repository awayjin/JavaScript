-- 表的加法——UNION
create table Product2 (
	product_id char(4) not null,
	product_name varchar(100) not null,
	product_type varchar(32) not null,
	sale_price integer,
	purchase_price integer,
	regist_date Date,
	primary key (product_id)
);

select CURRENT_TIMESTAMP;
insert into Product2(product_id, product_type, product_name, sale_price, purchase_price, regist_date)
values ('0000', 'type', 'name', 1, 1, (SELECT CURRENT_TIMESTAMP));


start transaction;

-- values ('0000', 'type', 'name', 1, 1, '2020-03-01 22:40');
INSERT INTO Product2 VALUES ('0001', 'T恤衫' ,'衣服', 1000, 500, '2008-09-20');
INSERT INTO Product2 VALUES ('0002', '打孔器', '办公用品', 500, 320, '2009-09-11');
INSERT INTO Product2 VALUES ('0003', '运动T恤', '衣服', 4000, 2800, NULL);
INSERT INTO Product2 VALUES ('0009', '手套', '衣服', 800, 500, NULL);
INSERT INTO Product2 VALUES ('0010', '水壶', '厨房用具', 2000, 1700, '2009-09-20');

commit;

select * from Product
union
select * from Product2;
select sale_price from Product
union
select product_name from Product2;

-- 列数不一致时会发生错误
SELECT product_id, product_name
FROM Product
UNION
SELECT product_id, product_name, sale_price
FROM Product2;

-- 数据类型不一致时会发生错误(mysql 可以)
SELECT product_id, sale_price
FROM Product
UNION
SELECT product_id, regist_date
FROM Product2;

-- ORDER BY子句只在最后使用一次
SELECT *
FROM Product
WHERE product_type = '厨房用具'
UNION
SELECT *
FROM Product2
WHERE product_type = '厨房用具'
ORDER BY product_id desc;

-- 包含重复行的集合运算——ALL选项
SELECT * FROM product  
union all
SELECT * FROM Product2;

SELECT a.product_id FROM product as a; 
-- 交集
SELECT * FROM product as a
intersect
SELECT * FROM Product2
order by product_id
;
-- 交集
SELECT product_id FROM product as a
INNER JOIN Product2 as b using(product_id)
;
-- 交集
SELECT * FROM product as a
except
SELECT * FROM Product2
order by product_id
;

-- 内联结——INNER JOIN
SELECT * FROM Product;
SELECT * FROM ShopProduct;

-- 将两张表进行内联结
SELECT
	sp.shop_id, sp.shop_name, sp.product_id, p.product_name, p.sale_price 
FROM
	ShopProduct AS sp
	INNER JOIN Product AS p
	on sp.product_id = p.product_id;
	
	
	-- 内联结，使用了两张表
	select sp.shop_id, sp.shop_name, sp.product_id, product_name, p.sale_price
	FROM ShopProduct as sp 
	INNER JOIN product as p
	on sp.product_id = p.product_id
	-- 只想知道东京店（ 000A）的信息时
	WHERE shop_id = '000a'
	;
	
CREATE VIEW shop_product_info ( shop_id, shop_name, product_id, product_name, sale_price ) AS (
	SELECT
		sp.shop_id,
		sp.shop_name,
		sp.product_id,
		product_name,
		p.sale_price 
	FROM
		ShopProduct AS sp
		INNER JOIN product AS p ON sp.product_id = p.product_id
);
select * from shop_product_info;


SELECT * FROM Product;
SELECT * FROM shop_product_info;
SELECT sp.shop_id, sp.shop_name, p.product_id, p.product_name, p.sale_price 
	FROM
		ShopProduct AS sp
		right outer  JOIN product AS p ON sp.product_id = p.product_id;
		
SELECT sp.shop_id, sp.shop_name, p.product_id, p.product_name, p.sale_price 
FROM ShopProduct AS sp
left outer JOIN product AS p ON sp.product_id = p.product_id;
		
	
drop table  inventory_product;
-- 创建一张用来管理库存商品的表
create table inventory_product (
	inventory_id char(4) not null,
	product_id char(4) not null,
	inventory_quantity integer not null,
	primary key (inventory_id, product_id)
);

start transaction;
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P001', '0001', 0);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P001', '0002', 120);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P001', '0003', 200);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P001', '0004', 3);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P001', '0005', 0);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P001', '0006', 99);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P001', '0007', 999);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P001', '0008', 200);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P002', '0001', 10);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P002', '0002', 25);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P002', '0003', 34);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P002', '0004', 19);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P002', '0005', 99);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P002', '0006', 0);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P002', '0007', 0);
INSERT INTO  inventory_product (inventory_id, product_id, inventory_quantity) VALUES ('P002', '0008', 18)
commit;

select * from inventory_product;
select * from ShopProduct;

-- 对3张表进行内联结
select 
	sp.shop_id, sp.shop_name, sp.product_id, 
	p.product_name, p.sale_price,
	ip.inventory_quantity, ip.inventory_id
FROM ShopProduct as sp
inner join product as p
on sp.product_id = p.product_id
inner join inventory_product as ip
on ip.product_id = sp.product_id;

select * from ShopProduct;
select * from Product;
-- 交叉联结——CROSS JOIN
select 
	sp.shop_id, sp.shop_name, sp.product_id, sp.quantity, p.product_name
FROM ShopProduct as sp 
cross join product as p
-- on sp.product_id = p.product_id;

-- 使用过时语法的内联结（结果与代码清单7-9相同）
select 
	sp.shop_id, sp.shop_name, sp.product_id, sp.quantity, p.product_name, p.sale_price
FROM ShopProduct as sp, product p
WHERE sp.product_id = p.product_id
and sp.shop_id = '000A';



-- 高压锅和圆珠笔 2 条
-- 记录的商店编号（shop_id）和商店名称（shop_name）都是 NULL。请使
-- 用字符串“不确定”替换其中的 NULL. coalesce
select 
	coalesce(sp.shop_id, '不确定'), coalesce(sp.shop_name, 'unknown'), sp.product_id, 
	p.product_name, p.sale_price
FROM ShopProduct as sp
right outer join Product as p
on sp.product_id = p.product_id;

-- 对于外联结来说，只要数据存在于某一张表当中，就能够读取出来。
SELECT SP.shop_id, SP.shop_name, p.product_id, P.product_name, P.sale_price
FROM ShopProduct AS SP RIGHT OUTER JOIN Product AS P 
ON SP.product_id = P.product_id;

select * from ShopProduct;
select * from Product;



select VERSION();


