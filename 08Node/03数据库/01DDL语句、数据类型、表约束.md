### 1.SQL语句的分类

- DDL：操作数据库或表
- DML：添加、删除、修改：表中数据
- DQL：查询：表中数据
- DCL：操作数据库或表的权限

### 2.DDL对数据库进行操作

- 查看所有数据库：SHOW DATABASES;

- 使用某一个数据库：USE coderhub;

- 查看哪一个数据库正在被使用：SELECT DATABASE();

- 创建一个数据库：CREATE DATABASE IF NOT EXISTS bilibili;

  ```mysql
  CREATE DATABASE IF NOT EXISTS bilibili
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
  ```

  - 第二句一般不写，默认就是这样的

- 删除某一个数据库：DROP DATABASE IF EXISTS bilibili;

- 修改数据库：ALTER DATABASE bilibili CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;

  - 不要乱改，用默认的就行

### 3.DDL对表进行操作

- 查看表：SHOW TABLES;

- 查看某一张表的结构：DESC user;

- 查看用什么SQL语句创建了此表：SHOW CREATE TABLE user;

- 创建一张表

  ```mysql
  CREATE TABLE IF NOT EXISTS `user`(
      name VARCHAR(20),
      age INT,
      height DOUBLE
  );
  ```

- 删除一张表：DROP TABLE IF EXISTS user;

### 4.数据类型

- 数字类型
  - 整数数字类型：INTEGER，INT，SMALLINT，TINYINT，MEDIUMINT，BIGINT
  - 浮点数字类型：FLOAT，DOUBLE（FLOAT是4个字节，DOUBLE是8个字节）
  - 精确数字类型：DECIMAL，NUMERIC（DECIMAL是NUMERIC的实现形式）

- 日期类型
  - YEAR：YYYY，范围：1901 ~ 2155 和 0000
  - DATE：YYYY-MM-DD ，范围： 1000-01-01 ~ 9999-12-31
  - DATETIME：YYYY-MM-DD hh:mm:ss，范围：1000-01-01 00:00:00 ~ 9999-12-31 23:59:59
  - TIMESTAMP：YYYY-MM-DD hh:mm:ss，范围：1970-01-01 00:00:01 ~ 2038-01-19 03:14:07
- 字符串类型
  - CHAR类型在创建表时为固定长度，长度可以是0到255之间的任何值
    - 在被查询时，会删除后面的空格；
  - VARCHAR类型的值是可变长度的字符串，长度可以指定为0到65535之间的值
    - 在被查询时，不会删除后面的空格；
  - BINARY和VARBINARY 类型用于存储二进制字符串，存储的是字节字符串
  - BLOB用于存储大的二进制类型
  - TEXT用于存储大的字符串类型

### 5.表约束

- 主键：PRIMARY KEY，永不重复，不会为空，与业务无关，表中唯一索引
  - 主键也可以是多列索引，我们一般称其为联合主键，后面再说
- 唯一：UNIQUE，用于约束手机号码、身份证号码这些不会重复的东西
  - 允许有重复的NULL
- 不能为空：NOT NULL
- 默认值：DEFAULT
- 自动递增：AUTO_INCREMENT
- 外键约束：多表时再说

- 举例：完整的创建一个表

  ```mysql
  CREATE TABLE IF NOT EXISTS `users`(
  	id INT PRIMARY KEY AUTO_INCREMENT,
  	name VARCHAR(20) NOT NULL,
  	age INT DEFAULT 0,
  	phoneNum VARCHAR(20) UNIQUE DEFAULT '',
  	createTime TIMESTAMP
  );
  ```

### 6.DDL语句 - 修改表

- 修改表名

  ```mysql
  ALTER TABLE `users` RENAME TO `user`;
  ```

- 添加一个新的字段

  ```mysql
  ALTER TABLE `user` ADD `updateTime` TIMESTAMP;
  ```

- 删除一个字段

  ```mysql
  ALTER TABLE `user` DROP `age`;
  ```

- 修改字段的名称

  ```mysql
  ALTER TABLE `user` CHANGE phoneNum telPhone VARCHAR(20) UNIQUE DEFAULT '';
  ```

- 修改字段的数据类型

  ```mysql
  ALTER TABLE `user` MODIFY `name` VARCHAR(30) NOT NULL;
  ```

- 注意：涉及到修改，就要自习注意细节，很多约束是不能漏掉的

### 7.DDL语句 - 补充

- 根据一个表结构去创建另一个表

  ```mysql
  CREATE TABLE `user1` LIKE `user`;
  ```

  - user1会将user整个表的约束进行继承，比如主键，唯一等

- 根据另外一个表中的所有内容，创建一个新的表

  ```mysql
  CREATE TABLE `user2` (SELECT * FROM user);
  ```

  - 这个只是继承了内容和字段，很多约束不会进行继承

