### 1.通过babel将ES6代码转为ES5代码

- 进入babeljs.io网站

- 点击Try it out

  ![image-20220307114848230](https://s2.loli.net/2022/03/07/pRv239H1PETbViw.png)

- 改动targets，勾选Prettify

  ![image-20220307114949156](https://s2.loli.net/2022/03/07/VqWjBr6DGugXeJ2.png)

- 转换ES6的类代码

### 2.代码的转换

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  };

  eating() {
    console.log(this.name + " 在吃饭~");
  };
};
```

```js
"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

var Person = /*#__PURE__*/ (function () {
  function Person(name, age) {
    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
  }

  _createClass(Person, [
    {
      key: "eating",
      value: function eating() {
        console.log(this.name + " 在吃饭~");
      }
    }
  ]);

  return Person;
})();
```

### 3.`/*#__PURE__*/` 什么意思

```js
var Person = /*#__PURE__*/ (function () {})();
```

- `/*#__PURE__*/` 它是魔法注释，旨在告诉webpack这个Person是一个纯函数
- 那么告诉webpack这个Person是一个纯函数有什么用呢？
  - 可以让webpack在对代码进行打包的时候进行tree shaking操作
  - 那么tree shaking操作又是干嘛的呢？
    - 简单来说，如果你这个Person函数没有被用到过，打包的时候webpack会直接删除你这段代码
    - 以减少整个代码包的体积

### 4._classCallCheck(this, Person);

```js
// 我们传进来的是this和Person函数
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {  // Person.prototype在this的原型链上吗？
    // 如果不在就抛出错误
    throw new TypeError("Cannot call a class as a function");
  }
}
```

- 主要用来看你是如何调用Person函数的
- 假如你是直接调用：Preson();
  - 那么this指向window，在严格模式下this指向undefined，但是无论如何也不会在它们的原型链上出现Person.prototype
  - 所以主要是防止你不用new操作符操作Person函数
- 只有new Person();才不会抛出错误

### 5.往自己的原型上加方法

- 我们一般怎么加方法

  ```js
  Person.prototype.eating = function() {};
  ```

- 而它调用了一个方法

  ```js
  _createClass(Person, [
    {
      key: "eating",
      value: function eating() {
        console.log(this.name + " 在吃饭~");
      }
    }
  ]);
  ```

  - 它传进了Person和一个数组，数组里又有对象，对象是对eating方法的描述
  - 这样做的目的是可以实现函数的复用
  - 每次往一个类上加方法直接调用_createClass函数即可

- _createClass函数

  ```js
  function _createClass(Constructor, protoProps, staticProps) {
    // 把eating这样的方法加入到Person的原型中并为每个方法设置属性描述符
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    // 如果你有静态方法就把静态方法加入到Person这个对象本身，并设置属性描述符
    if (staticProps) _defineProperties(Constructor, staticProps);
    // 为原型设置不可以写入属性描述符
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  ```

  - 这里涉及到一个函数：_defineProperties

    ```js
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    ```

    - 把eating这样的方法加入到Person的原型中并为每个方法设置属性描述符

- 主要做了更多的边界判断而已





