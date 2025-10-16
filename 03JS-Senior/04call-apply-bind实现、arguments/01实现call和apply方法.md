### 1.给函数添加方法

```js
// 给所有的函数添加一个ytcall方法
Function.prototype.ytcall = function() {
  console.log("ytcall被执行")
}

function foo() {};

function bar() {};

foo.ytcall();
bar.ytcall();
```

### 2.执行调用函数

- 在ytcall函数中获取哪一个函数执行了ytcall

  - 由于我们通过函数调用了ytcall，所以ytcall中的this就指向这个函数

    ```js
    Function.prototype.ytcall = function() {
      var fn = this;
      fn();
    }
    
    function foo() {
      console.log("foo被执行");
    };
    
    function bar() {
      console.log("bar被执行");
    };
    
    foo.ytcall();
    bar.ytcall();
    ```

- 为foo或bar绑定传入的第一个参数

  ```js
  Function.prototype.ytcall = function(thisArg) {
    var fn = this;
  
    thisArg.fn = fn;
    thisArg.fn();
  };
  
  foo.ytcall({});
  bar.ytcall({});
  ```

- 但是我们所要绑定的对象会多出一个fn函数，我们想要去掉这个函数

  ```js
  Function.prototype.ytcall = function(thisArg) {
    var fn = this;
  
    thisArg.fn = fn;
    thisArg.fn();
    delete thisArg.fn;
  };
  
  foo.ytcall({});
  bar.ytcall({});
  ```

  - 这样所绑定的对象依然会打印fn函数，但是无伤大雅

- 假如我们传入的是数组或者字符串等非对象类型的参数

  ```js
  Function.prototype.ytcall = function(thisArg) {
    var fn = this;
  
    thisArg = Object(thisArg)
    thisArg.fn = fn;
    thisArg.fn();
    delete thisArg.fn;
  };
  
  foo.ytcall(123);
  bar.ytcall(123);
  ```

- 传入的第一个参数是null或者undefined，我们想让它返回window对象

  ```js
  Function.prototype.ytcall = function(thisArg) {
    var fn = this;
  
    thisArg = thisArg ? Object(thisArg): window;
    thisArg.fn = fn;
    thisArg.fn();
    delete thisArg.fn;
  };
  
  foo.ytcall(null);
  bar.ytcall(undefined);
  ```

- 第一个参数后面的参数如何传递

  ```js
  Function.prototype.ytcall = function(thisArg, ...arg) {
    var fn = this;
    
    thisArg = thisArg ? Object(thisArg): window;
    thisArg.fn = fn;
    thisArg.fn(...arg);
    delete thisArg.fn;
  };
  
  function foo(...arg) {
    var [num1, num2, num3] = arg;
    console.log(num1, num2, num3);
  };
  
  function bar(...arg){
    var [num1, num2, num3] = arg;
    console.log(num1, num2, num3);
  };
  
  foo.ytcall({}, 20, 30, 40);
  bar.ytcall({}, 10, 20, 30);
  ```

- 返回最终结果

  ```js
  Function.prototype.ytcall = function(thisArg, ...arg) {
    var fn = this;
    
    thisArg = thisArg ? Object(thisArg): window;
    thisArg.fn = fn;
    var result = thisArg.fn(...arg);
    delete thisArg.fn;
    return result;
  };
  
  function foo(...arg) {
    var [num1, num2, num3] = arg;
    return num1 + num2 + num3;
  };
  
  function bar(...arg){
    var [num1, num2, num3] = arg;
    return num1 + num2 + num3;
  };
  
  var resultFoo = foo.ytcall({}, 20, 30, 40);
  var resultBar = bar.ytcall({}, 10, 20, 30);
  console.log(resultFoo, resultBar);
  ```


### 3.实现apply方法

```js
Function.prototype.ytApply = function(thisArg, argArray) {
  var fn = this;
  
  thisArg = thisArg ? Object(thisArg): window;
  thisArg.fn = fn;
  var result = thisArg.fn(...argArray);
  delete thisArg.fn;
  return result;
};

function foo(...arg) {
  var [num1, num2, num3] = arg;
  console.log(num1, num2, num3);
  console.log("foo被执行", this);
  return num1 + num2 + num3;
};

function bar(...arg){
  var [num1, num2, num3] = arg;
  console.log(num1, num2, num3);
  console.log("bar被执行", this);
  return num1 + num2 + num3;
};

var resultFoo = foo.ytApply({}, [20, 30, 40]);
var resultBar = bar.ytApply({}, [10, 20, 30]);
console.log(resultFoo, resultBar);
```

- 这有一个问题，假如我们只传递第一个参数，那么就会报错

  ```js
  Function.prototype.ytApply = function(thisArg, argArray) {
    var fn = this;
    
    thisArg = thisArg ? Object(thisArg): window;
    thisArg.fn = fn;
    if(argArray) {
      var result = thisArg.fn(...argArray);
    } else {
      var result = thisArg.fn();
    }
    delete thisArg.fn;
    return result;
  };
  ```

  