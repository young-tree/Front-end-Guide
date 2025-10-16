### 1.构造函数创建类存在的问题

- 和普通的函数编写方式相似
- 代码并不容易理解

### 2.用class关键字定义类

- 在ES6（ECMAScript2015）新的标准中使用了class关键字来直接定义类

- 但是使用class关键字定义的类本质上是之前讲的构造函数、原型链的语法糖

- 两种方式

  - 类的声明

    ```js
    // 函数的声明
    function foo() {};
    
    // 类的声明
    class Person {};
    ```

  - 类的表达式

    ```js
    // 函数的表达式
    var foo = function() {};
    
    // 类的表达式
    var animal = class {}
    ```

### 3.类和构造函数的异同

```js
class Person {};

console.log(Person);  // [class Person]
console.log(typeof Person);  // function
console.log(Person.prototype);  // {}
console.log(Person.prototype.__proto__);  // [Object: null prototype] {}
console.log(Person.prototype.constructor);  // [class Person]

var p = new Person();
console.log(p.__proto__ === Person.prototype);  // true
```

### 4.类的构造方法

- 每个类只有一个属于自己的构造方法，如果有多个构造方法会抛出错误

- 当我们想要传递一些参数时，要用到构造方法

- 当我们通过new操作符操作一个类的时候，会调用这个类的构造方法，并执行如下五件事

  1. 在内存中创建一个新的对象
  2. 创建的新对象的[[prototype]]属性指向该类的prototype属性
  3. 构造方法内部的this指向创建出来的新对象
  4. 执行构造方法内的代码
  5. 如果构造方法没有返回对象，就返回创建的对象

  ```js
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    };
  };
  
  var p1 = new Person("why", 18);
  var p2 = new Person("yt", 22);
  
  console.log(p1, p2); // Person { name: 'why', age: 18 } Person { name: 'yt', age: 22 }
  ```

### 5.类的实例方法

- 以前我们如何定义方法？

  ```js
  function Person() {};
  
  Person.prototype.eating = function() {};
  ```

- class中如何定义方法？

  ```js
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    };
  
    eating() {
      console.log(this.name + "在吃饭~");
    };
  };
  
  var p1 = new Person("why", 18);
  var p2 = new Person("yt", 22);
  
  p1.eating();  // why在吃饭~
  p2.eating();  // yt在吃饭~
  console.log(Object.getOwnPropertyDescriptors(Person.prototype));
  /*
  {
    constructor: {
      value: [class Person],
      writable: true,
      enumerable: false,
      configurable: true
    },
    eating: {
      value: [Function: eating],
      writable: true,
      enumerable: false,
      configurable: true
    }
  }
  */
  ```

  - 这里的eating其实是加在了Person的显示原型上

### 6.类的访问器方法

- 我们以前在对象中定义过访问器

  ```js
  var obj = {
    _name: "yt",
    get name() {
      return this._name;
    },
    set name(newVal) {
      this._name = newVal;
    },
  };
  
  console.log(obj.name);  // yt
  obj.name = "why";
  console.log(obj.name);  // why
  ```

- 在类中定义访问器

  ```js
  class Person {
    constructor(name, age, address) {
      this.name = name;
      this.age = age;
      this._address = address;
    };
  
    get address() {
      return this._address;
    };
    set address(newVal) {
      this._address = newVal;
    };
  };
  
  var p = new Person("why", 18, "广州市");
  console.log(p.address);  // 广州市
  p.address = "济南市";
  console.log(p.address);  // 济南市
  ```

  - 它的作用就是在访问或者设置值的时候可以做一些拦截

### 7.类的静态方法（类方法）

- 可以直接通过类名进行调用

  ```js
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    };
  
    static createPerson() {
      console.log("静态方法被调用");
    };
  };
  
  Person.createPerson();  // 静态方法被调用
  ```

- 使用

  ```js
  var names = ["abc", "cba", "nba", "mba", "lba"];
  
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    };
  
    static randomPerson() {
      var nameIndex = Math.floor(Math.random() * names.length);
      var randomName = names[nameIndex];
      var randomAge = Math.floor(Math.random() * 100);
      return new Person(randomName, randomAge);
    };
  };
  
  for (var i = 0; i < 50; i++) {
    console.log(Person.randomPerson());
  };
  ```

  