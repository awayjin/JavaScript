create DATABASE IF NOT EXISTS egg_trip ;

show DATABASES;

use egg_trip;

create table if not exists user(
	id int(10) not null auto_increment,
	username varchar(20) not null default 'admin' comment '用户名',
	pwd VARCHAR(50) not null comment '密码',
	primary key(id)
)engine=INNODB charset=utf8;

show tables;
drop table user;

SELECT * FROM user;

insert into user(username, pwd) VALUES('admin', 123);

desc user;

-- 修改表
UPDATE  user set pwd=123456 WHERE id=2;









