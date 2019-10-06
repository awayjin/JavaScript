-- CREATE DATABASE myshop;
USE myshop;
drop table Product;
CREATE TABLE Product (
	product_id CHAR ( 4 ) NOT NULL,
	product_name VARCHAR ( 100 ) NOT NULL,
	product_type VARCHAR ( 32 ) NOT NULL,
	sale_price INTEGER,
	purchase_price INTEGER,
	regist_date Date,
	PRIMARY KEY ( product_id ) 
);
ALTER TABLE Product ADD COLUMN ( demo_alter VARCHAR ( 20 ) NOT NULL );
ALTER TABLE Product ADD COLUMN ( product_name_pinyin VARCHAR ( 100 ) );
ALTER TABLE Product DROP COLUMN demo;
ALTER TABLE Product DROP COLUMN product_name_pinyin 


-- START TRANSACTION;
START TRANSACTION;

INSERT INTO Product
VALUES
	( '0002', 'T恤衫', '衣服', 2000, 600, '2008-10-05' ) ;
COMMIT;

INSERT INTO Product
VALUES
	( '0004', '菜刀', '厨房用具', 2000, 500, '2009-09-20' );
	
	
ALTER TABLE Product DROP COLUMN demo_alter;

rename table product to pro_demo;
rename table pro_demo to Product;

SELECT * from Product where  product_type='厨房用具';


