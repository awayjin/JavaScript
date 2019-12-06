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