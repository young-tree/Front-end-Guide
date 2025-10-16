### 1.DML语句 - 增

- 普通插入数据

  ```mysql
  INSERT INTO `user` VALUES (110, 'why', '020-110110','2020-03-03', '1999-11-15');
  
  INSERT INTO `user` (name, telPhone, createTime, updateTime) VALUES ('kobe', '000-100100','2020-02-02', '1999-11-15');
  
  INSERT INTO `user` (name, telPhone) VALUES ('jams', '010-100100');
  ```

- createTime和updateTime可以自动设置

  ```mysql
  ALTER TABLE `user` MODIFY `createTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
  
  ALTER TABLE `user` MODIFY `updateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
  ```

### 2.DML语句 - 删和改

- 删除符合条件的数据

  ```mysql
  DELETE FROM user WHERE id = 110;
  ```

- 更新符合条件的数据

  ```mysql
  UPDATE user SET name = 'liei', telphone = 10010 WHERE id = 115;
  ```

### 3.DQL语句 - 基本查询

- 查询products表中的所有字段和数据

  ```mysql
  SELECT * FROM products;
  ```

- 查询products表中指定的字段

  ```mysql
  SELECT title, price FROM products;
  ```

- 对字段结果起别名，别名一般在多张表或者给客户端返回对应的key时会使用到；

  ```mysql
  SELECT title as phoneTitle, price as currentPrice FROM products;
  ```

### 4.DQL语句 - where查询

- WHERE的比较运算符（条件判断语句）

  ```mysql
  # 查询价格小于1000的手机
  SELECT * FROM products WHERE price < 1000;
  # 查询价格等于999的手机
  SELECT * FROM products WHERE price = 999;
  # 查询价格不等于999的手机
  SELECT * FROM products WHERE price != 1000;
  SELECT * FROM products WHERE price <> 1000;
  # 查询品牌是华为的手机
  SELECT * FROM products WHERE brand = "华为";
  ```

- WHERE的逻辑运算符（逻辑运算语句）

  ```mysql
  # 查询1000到2000之间的手机
  SELECT * FROM products WHERE price > 1000 AND price < 2000;
  SELECT * FROM products WHERE price > 1000 && price < 2000;
  # BETWEEN AND 是包含等于的
  SELECT * FROM products WHERE price BETWEEN 1000 AND 2000;
  
  # 价格在5000以上或者品牌是华为的手机
  SELECT * FROM products WHERE price >5000 or brand = "华为";
  SELECT * FROM products WHERE price >5000 || brand = "华为";
  
  # 将某些值设置为null值
  UPDATE products SET url = NULL WHERE id>= 85 and id <= 88;
  # 查询某一个为值null的字段
  SELECT * FROM products WHERE url IS NULL;
  SELECT * FROM products WHERE url IS NOT NULL;
  
  # IN取多个值中的其中一个
  SELECT * FROM products WHERE brand = "小米" || brand = "华为" || brand = "苹果";
  SELECT * FROM products WHERE brand IN ("小米", "华为", "苹果");
  ```

- 模糊查询使用LIKE关键字，结合两个特殊符号
  ```mysql
  # 查询所有以M开头的title
  SELECT * FROM products WHERE title LIKE "M%";
  # 只要有M就行
  SELECT * FROM products WHERE title LIKE "%M%";
  # 第二个字符必须是P其他我不管
  SELECT * FROM products WHERE title LIKE "_P%";
  ```

  - %表示匹配任意个任意字符
  - _表示匹配一个任意字符

### 5.DQL语句 - 排序查询

- 当我们查询到结果时候，我们希望将结果按照某种方式进行排序，这个时候使用的是ORDER BY


- ORDER BY有两个常用的值

  ```mysql
  # 以价格进行升序排序
  SELECT * FROM products WHERE brand IN ("小米", "华为", "苹果") ORDER BY price ASC;
  # 以评分进行降序排序
  SELECT * FROM products WHERE brand IN ("小米", "华为", "苹果") ORDER BY score DESC;
  ```

  - ASC：升序排列
  - DESC：降序排列

### 6.DQL语句 - 分页查询

- 当数据库中的数据非常多时，一次性查询到所有的结果进行显示是不太现实的

  ```mysql
  # LIMIT limit OFFSET offset
  SELECT * FROM products LIMIT 20 OFFSET 0;  # 查20条数据，不偏移
  SELECT * FROM products LIMIT 20 OFFSET 20;  # 查20条数据，偏移20条数据即从第21条开始查
  SELECT * FROM products LIMIT 20 OFFSET 40;  # 查20条数据，偏移40条数据即从第41条开始查
  # LIMIT offset, limit
  SELECT * FROM products LIMIT 0, 20;  # 查20条数据，不偏移
  SELECT * FROM products LIMIT 20, 20;  # 查20条数据，偏移20条数据即从第21条开始查
  SELECT * FROM products LIMIT 40, 20;  # 查20条数据，偏移40条数据即从第41条开始查
  ```

  - 在真实开发中，我们都会要求用户传入offset、limit或者page等字段
  - 它们的目的是让我们可以在数据库中进行分页查询


