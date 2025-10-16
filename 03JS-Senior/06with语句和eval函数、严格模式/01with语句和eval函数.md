### 1.with语句

- with语句可以形成自己的作用域

  ```js
  var message = "Hello World";
  
  var obj = {name: "yt", age: 18};
  
  function foo() {
    function bar() {
      with(obj) {
        console.log(message);  // Hello World
        console.log(name);  // yt
      }
    }
    bar();
  };
  
  foo();
  ```

  - message会先从obj开始查找，obj没有message就一层一层的沿着作用域链找，所以找到了GO中的message
  - name在obj中有，所以就找到了

- 你也可以这么用

  ```js
  var info = {name: "kobe"};
  with(info) {
    console.log(name);  // kobe
  };
  ```

### 2.不建议使用with语句

- 比如开启严格模式，直接报错

  ```js
  "use strict";
  
  var info = {name: "kobe"};
  with(info) {
    console.log(name);
  };
  ```

  ![image-20220228132842111](https://s2.loli.net/2022/02/28/XWrvu95BlK1xM4A.png)

- 混淆错误
- 会出现兼容性的问题

### 3.eval函数

- eval是一个特殊的函数
  
- 它可以将传入的字符串当做一段JavaScript代码来运行
  
- 假如我们有如下的代码，下面这段代码是可以运行的

  ```js
  var message = "Hello World!";
  console.log(message);  // Hello World!
  ```

- 假如我们还有如下代码，下面这段代码也是可以运行的

  ```js
  eval(`var message = "Hello World!";console.log(message);`);
  ```

### 4.不建议使用eval函数

- 代码的可读性非常差（代码的可读性强，是高质量代码的重要原则）
- eval函数接收的参数是一个字符串，在执行的过程中可能会被恶意篡改，出现被攻击的风险
- eval的执行必须经过JS解释器生成bytecode等操作，所以它就用不了V8引擎所做的那些优化