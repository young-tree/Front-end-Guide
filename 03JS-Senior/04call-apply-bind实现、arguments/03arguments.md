### 1.认识arguments

- 它是一个类数组对象
  - 长得像一个数组
  - 本质上是一个对象
- 我们所传递的参数都可以在它这里找到

### 2.对arguments的常见操作

- 获取参数的长度

  ```js
  function foo() {
    console.log(arguments.length);
  };
  
  foo(10, 30, 30, 40);
  ```

- 根据索引值获取想要的参数

  ```js
  function foo() {
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(arguments[2]);
    console.log(arguments[3]);
  };
  
  foo(10, 30, 30, 40);
  ```

- 通过callee方法获取到当前所在的函数

  ```js
  function foo() {
    console.log(arguments.callee);
  };
  
  foo(10, 30, 30, 40);
  ```

### 3.类数组（array-like）

- array-like意味着它不是一个数组类型，而是一个对象类型
- 但是它却拥有着数组的一些特性，比如length，比如通过索引获取值
- 不过它却没有数组的一些方法，比如forEach，比如map

### 4.没有这些方法该怎么办？

- 自己来，比如自己实现累加

  ```js
  function foo() {
    var totalNum = 0;
    for(var i = 0; i < arguments.length; i++) {
      totalNum += arguments[i];
    };
    return totalNum;
  };
  
  var result = foo(10, 30, 30, 40);
  console.log(result);
  ```

- 但是我们习惯于用数组的reduce方法实现累加，但是它没有这个方法，只能将其转为数组

  ```js
  function foo() {
    var newArr = Array.prototype.slice.call(arguments);
    console.log(newArr);
  };
  
  var result = foo(10, 30, 30, 40);
  ```

  - 其实你可以用刚才的累加转换一下实现变换数组，但是这个是怎么做到的呢？

  - 我们想要在没有数组的情况下拿到slice这个函数，怎么办？

  - 只能通过在数组原型上拿slice方法

  - 那么我们为什么要在后面加一个call为slice方法中的this绑定arguments呢？

  - 这取决于slice的内部是如何实现的

    ```js
    function slice() {
      var newArr = [];
      for(var i = 0; i < this.length; i++) {
        newArr.push(this[i]);
      };
      return newArr;
    };
    ```
    
  - 我们还知道slice是可以传递参数的，比如slice(1, 3);
  
    - 那么i默认是从0开始的，传入了参数那么就是从1开始，默认是length的，传了3就是到3喽。
    
  - 其实我们也可以这样写
  
  ```js
  function foo() {
  var newArr = [].slice.call(arguments);
    console.log(newArr);
  };
  
  var result = foo(10, 30, 30, 40);
  ```
  
- 使用ES6的语法：from方法

  ```js
  function foo() {
    var newArr = Array.from(arguments)
    console.log(newArr);
  };
  
  var result = foo(10, 30, 30, 40);
  ```

- 使用展开运算符

  ```js
  function foo() {
    var newArr = [...arguments]
    console.log(newArr);
  };
  
  var result = foo(10, 30, 30, 40);
  ```

### 5.强调

- 箭头函数中不推荐使用arguments

  - 如果你在箭头函数中使用arguments，那么它会向上一层作用域去寻找
  - 在浏览器中，全局中是没有arguments的
  - 在node中，全局中是有arguments的
    - 在node中，一个js文件会被当成一个模块，这个模块会被包裹在一个函数里，然后会去执行这个函数

- 我们推荐使用剩余参数

  ```js
  function foo(...arg) {
    console.log(arg);
  };
  
  var result = foo(10, 30, 30, 40);
  ```

  

