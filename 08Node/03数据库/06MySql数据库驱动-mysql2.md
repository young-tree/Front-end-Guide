### 1.mysql2的优势

- 预编译语句：提高性能、防止SQL注入
- 支持Promise

### 2.使用mysql2

- 安装mysql2：npm install mysql2

- mysql2的使用过程如下：

  - 第一步：创建连接（通过createConnection），并且获取连接对象

  - 第二步：执行SQL语句即可（通过query）

    ```js
    const mysql = require("mysql2");
    
    // 1.创建数据库连接
    const connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      database: "coderhub",
      user: 'root',
      password: '******'
    });
    
    // 2.执行sql语句
    const statement = `SELECT * FROM products WHERE price > 6000;`
    
    connection.query(statement, (err, results, fields) => {
      console.log(results);
      connection.end();
    });
    ```

### 3.预编译语句

```js
const mysql = require("mysql2");

// 1.创建数据库连接
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "coderhub",
  user: 'root',
  password: '******'
});

// 2.执行sql语句
const statement = `SELECT * FROM products WHERE price > ? AND score > ?;`

connection.execute(statement, [6000, 7], (err, results) => {
  console.log(results);
  connection.end();
});
```

- 注意：如果重复执行该语句，它将会从LRU（Least Recently Used） Cache中获取，省略了编译statement 的时间来提高性能

### 4.Connection Pools（连接池）

- 前面我们创建了一个连接，但是如果我们有多个请求的话，该连接很有可能正在被占用，那么我们是否需要每次有一个请求就去创建一个新的连接呢？

- 事实上，mysql2给我们提供了连接池

- 连接池可以在需要的时候自动创建连接，并且创建的连接不会被销毁，而是放到连接池中，后续可以继续使用

- 我们可以在创建连接池的时候设置LIMIT，也就是最大创建个数

  ```js
  const mysql = require("mysql2");
  
  // 1.创建连接池
  const connections = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'coderhub',
    user: 'root',
    password: '******',
    connectionLimit: 10  // 最多会建立几个连接
  })
  
  const statement = `SELECT * FROM products WHERE price > ? AND score > ?;`;
  
  // 2.使用连接池
  connections.execute(statement, [6000, 7], (err, results) => {
    console.log(results);
  });
  ```

### 5.Promise方式

- 目前在JavaScript开发中我们更习惯Promise和await、async的方式，mysql2同样是支持的

  ```js
  const mysql = require("mysql2");
  
  // 1.创建连接池
  const connections = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'coderhub',
    user: 'root',
    password: '******',
    connectionLimit: 10
  })
  
  const statement = `SELECT * FROM products WHERE price > ? AND score > ?;`
  
  // 2.使用连接池
  connections.promise().execute(statement, [6000, 7]).then(([results]) => {
    console.log(results);
  }).catch(err => {
    console.log(err)
  });
  ```



