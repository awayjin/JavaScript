
BEGIN;
INSERT INTO movie VALUES ('2020-04-22 07:22:33', '1', '1', 'images/movie.8.png', '人生不能像做菜，把所有的料准备好才下锅', '2018-06-22', '165', '李安《饮食男女 》', '100', '2019-04-18 02:40:48', null), ('2020-04-22 00:00:00', '1', '2', 'images/movie.4.png', '在变换的生命里，岁月原来是最大的小偷', '2018-06-22', '46', '罗启锐《岁月神偷》', '100', '2019-04-09 04:34:38', null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

SELECT * FROM movie;

show variables like 'sql_mode';
	
SET GLOBAL sql_mode = 'strict_trans_tables,no_zero_in_date,error_for_division_by_zero,no_auto_create_user,no_engine_substitution';

select @@sql_mode;

SET GLOBAL sql_mode="STRICT_ALL_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ZERO_IN_DATE,NO_AUTO_CREATE_USER";

-- 重启数据库
bash mysql.server restart

SELECT `id`, `index`, `art_id`, `type` FROM `flow` AS `Flow` ORDER BY `Flow`.`index` DESC LIMIT 1


SELECT * FROM `flow` AS `Flow` ORDER BY `Flow`.`index` LIMIT 1;


