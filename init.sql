UPDATE mysql.user SET Password=PASSWORD('reddy') WHERE User='root';
DELETE FROM mysql.user WHERE User='';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

CREATE DATABASE annotation_tool CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'reddy'@'%' IDENTIFIED BY 'reddy';
GRANT ALL ON annotation_tool.* TO 'reddy'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
