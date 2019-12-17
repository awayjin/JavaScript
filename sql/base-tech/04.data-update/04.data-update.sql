drop table ProductIns;
CREATE TABLE ProductIns(
	product_id CHAR(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	product_type VARCHAR(32) NOT NULL,
	sale_price INTEGER,
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





