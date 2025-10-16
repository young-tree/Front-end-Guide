### 1.函数原型

- 函数也是一个对象，所以函数中也是有`__proto__`这个属性的

  - 即函数作为对象来说，他也是有[[prototype]]，隐式原型

    ```js
    function foo() {};
    
    console.log(foo.__proto__);
    ```

    ![image-20220302191538455](https://s2.loli.net/2022/03/02/UOLcCvwqnSErW4l.png)

    ![image-20220302191550247](https://s2.loli.net/2022/03/02/8eDa5lBxy4orVwO.png)

- 不过因为函数他还有一个身份就是函数，所以它还会多出一个显示原型属性：prototype

  ```js
  function foo() {};
  
  console.log(foo.prototype);
  ```

  ![image-20220302191913704](https://s2.loli.net/2022/03/02/LsqnlgXh1FMQ4CT.png)

  ![image-20220302191925024](https://s2.loli.net/2022/03/02/gYZR1DFq4XJvtBl.png)
  - 这个prototype没有浏览器兼容问题

  - 我们在学习new操作符的时候提到过第二条

    1. 在内存中创建一个新的空对象

    2. 这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性

       - 什么意思？我们模拟一下这个场景

         ```js
         function foo() {
           var moni = {};
           this = moni;
         
           this.__proto__ = foo.prototype;
         };
         ```

       - 就是让创建的对象中的隐式原型指向函数的显示原型

         ```js
         function foo() {};
         
         var f1 = new foo();
         var f2 = new foo();
         
         console.log(f1.__proto__ === foo.prototype);  // true
         console.log(f2.__proto__ === foo.prototype);  // true
         ```


### 2.内存图

```js
function Person() {};
```

- 一旦发现Person是一个函数就会在堆内存中创建一个对象

  - 这个对象中存着父级作用域和函数执行体

  - 但是还存着一个属性：prototype

    - 这个属性指向Person函数的原型对象（显示原型）

      ![image-20220303071212880](https://s2.loli.net/2022/03/03/3Hvslhw4f1RVjyr.png)

```js
function Person() {};

var p1 = new Person();
var p2 = new Person();
```

- 一旦你new了这个函数就会返回一个对象

- 在GO中的p1就指向这个对象，这个对象有什么？有一个`__proto__`属性

- 又因为new操作符的第二条规范

  - 所以p1对象的这个`__proto__`属性指向Person的原型对象：prototype

  - 那么p2对象的这个`__proto__`属性也指向Person的原型对象：prototype

  - 你会发现两个不同的对象指向同一个对象，那么我们就可以在这一个对象（Person的原型对象：prototype）中定义一些东西，就可以多次且重复的使用这些被定义的东西

    ![image-20220303192242599](https://s2.loli.net/2022/03/03/zygZ1LPcbvGOES6.png)

### 3.例子

```js
function Person() {};

var p1 = new Person();
var p2 = new Person();

p1.name = "why";

console.log(p1.name);
```

![image-20220303193426617](https://s2.loli.net/2022/03/03/NaDXcLMyYjPRUF1.png)

- p1.name = "why";意味着在p1的对象中添加了一个name属性值为why

- console.log(p1.name);能不能查找到这个name属性呢？

  - 是能的

- 假如我们没有写p1.name = "why";怎么找呢？

  - 找p1对象的`__proto__`属性，这个属性指向Person函数的原型对象，而Person函数的原型对象没有name这个属性，所以打印undefined

- 有没有办法让它找到？

  ```js
  function Person() {};
  
  var p1 = new Person();
  var p2 = new Person();
  
  p1.__proto__.name = "kobe";
  
  console.log(p1.name);  // kobe
  console.log(p2.name);  // kobe
  ```

  - `p1.__proto__.name = "kobe";` 这样子做其实就是找到Person函数的原型对象，为这个原型对象添加了一个name属性，值为kobe

    ![image-20220303194404435](https://s2.loli.net/2022/03/03/k7AYT4rUDwCompX.png)

- 除此之外我们还有更好的办法

  ```js
  function Person() {};
  
  var p1 = new Person();
  var p2 = new Person();
  
  Person.prototype.name = "kobe";
  
  console.log(p1.name);  // kobe
  console.log(p2.name);  // kobe
  ```

### 4.constructor属性

- 在刚才的内存图中，我们会发现prototype对象中有一个constructor属性，这个constructor属性是干嘛的？

  ```js
  function Person() {};
  
  console.log(Object.getOwnPropertyDescriptors(Person.prototype));
  ```

  ![image-20220303200533563](https://s2.loli.net/2022/03/03/BX9rH8IiSZmUspW.png)

  - 我们会发现它的enumerable是false，所以说我们直接打印Person.prototype是无法看到这个constructor属性的

- constructor的值是[Function: Person]，意味着constructor指向Person这个函数

  - 我们知道所有的函数都是有一个name属性的

    ```js
    function Person() {};
    console.log(Person.name);  // Person
    ```

  - 你也可以这样拿它的名字

    ```js
    function Person() {};
    console.log(Person.prototype.constructor.name);
    ```

  - 你甚至可以写这样一段代码

    ```js
    function Person() {console.log(123)};
    
    console.log(Person.prototype.constructor.prototype.constructor.prototype); // {}
    Person.prototype.constructor.prototype.constructor.prototype.constructor(); // 123
    ```

### 5.往原型上添加自己的属性

```js
function Person() {};

Person.prototype.name = "yt";
Person.prototype.age = 22;

var p1 = new Person();
var p2 = new Person();

console.log(p1.name, p1.age);  // yt 22
console.log(p2.name, p2.age);  // yt 22
```

### 6.直接修改整个prototype对象

- 5的例子中有一个问题，当我们往原型上添加多个属性的时候，就会使用多个Person.prototype

- 假如我们直接给prototype赋值一个对象，会发生什么？

  ```js
  function foo() {};
  
  foo.prototype = {
    name: "why",
    age: 18,
    height: 1.88,
  };
  
  var f1 = new foo();
  console.log(f1.name, f1.age, f1.height);
  ```

  ![image-20220304092535274](https://s2.loli.net/2022/03/04/97ocfNaeA8yZFd4.png)

  - 这样的话有个问题，函数原型上少了一个constructor，那应该怎么办？

    ```js
    function foo() {};
    
    foo.prototype = {
      name: "why",
      age: 18,
      height: 1.88,
    };
    
    Object.defineProperty(foo.prototype, "constructor", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: foo,
    });
    ```

    - 这样就完全一致了

