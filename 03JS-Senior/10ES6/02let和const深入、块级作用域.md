### 1.let/const和window之间的关系

- 在以前我们学过VO-GO这些概念

  ```js
  var age = 18;
  var message = "message";
  
  console.log(window.age);
  console.log(window.message);
  console.log(message);
  
  window.message = "Hello";
  console.log(message);
  ```

  - 在浏览器中VO = GO = window

- 我们还学过一个VE的概念，在ES3之前，认为VE就是VO没有问题的

- 现在VE所指向的是这么一个东西，当然是在V8引擎中

  - variables_
  - 它的类型是VariableMap，这个类型是什么呢？是HashMap，它是用C++实现的一种数据结构
  - HashMap内部是哈希表

- 那么window呢？

  - V8不实现window，window交给包含V8的浏览器来实现
  - window只是一个单独的对象，存储一些它自己的东西
  - 当然，现在为了做适配，window是会有一份我们创建的变量的，但是得是由var创建的变量

- 用var定义的变量依然会与window保持同步，但是不再是同一个对象

- 由let/const创建的变量是在另外一个对象中，并且不会在window中保留一份

  ```js
  let age = 18;
  var message = "message";
  
  console.log(window);  // 这里面只有message，没有age
  
  console.log(window.age);  // undefined
  console.log(age);  // 18
  console.log(window.message)  // message
  ```

### 2.理解作用域

- 首先我们要知道，ES5和ES5之前，压根就没有块级作用域这个概念

- 现在什么叫块级作用域呢？

  ```js
  {
    
  }
  ```

  - 这一段代码就称之为块代码（block code）

- 我们要与对象区别开

  - 对象是写键值对的，声明对象的字面量
  - 块代码是要写表达式的

- 在C语言中，像下面的这段代码，foo是无法访问到的

  ```js
  {
    var foo = "abc";
  }
  
  console.log(foo)
  ```

  - 但是在ES5包括ES5之前，这样的代码形同虚设

- 那么你可能要问，在ES5中，怎样才能形成作用域呢？只有两个

  1. 全局作用域
  2. 函数作用域，函数作用域可以沿着作用域链访问外面的东西，但是在外面访问不到里面的东西

### 3.块级作用域

- 注意：块级作用域针对var声明的变量是无效的

- 对let/const/function/class声明的类型是有效的

  ```js
  {
    let foo = "abc";
    const bar = "cba";
    function abc() {};
    class Person {};
  }
  ```

- 不过当你调用abc的时候是可以成功的，为什么？

  - 因为不同的浏览器有不同的实现，为了兼容以前的代码，才让我们function声明的东西没有块级作用域
  - 如果你的浏览器只支持ES6，那么像abc这样的函数是不会被调用的，访问不到

### 4.比较常见的块级作用域

- if语句

  ```js
  if (true) {
    var foo = "abc";
    let bar = "cba";
  };
  ```

  - foo可以访问，bar不能访问

- switch语句

  ```js
  switch(color) {
    case "red":
      var foo = "abc";
      let bar = "cba";
  }
  ```

- for语句

  ```js
  for (var i = 0; i < 10; i++) {};
  console.log(i);
  ```

  - 这个i外部是可以访问的

  ```js
  for (let i = 0; i < 10; i++) {};
  console.log(i);
  ```

  - 这个i外部是访问不到的

### 5.for循环应用块级作用域的例子

```html
<button>1</button>
<button>2</button>
<button>3</button>

<script>
  const buttons = document.getElementsByTagName("button");

  for(var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
      console.log(`第${i}个按钮被点击`);
    }
  }
</script>
```

- 首先onclick对应的是一个函数，i在这个函数内没有被定义，那么我只能去全局作用域中进行查找
- 能查找到吗？能，但是i为3
  - 所以会打印三遍：第3个按钮被点击

```html
<button>1</button>
<button>2</button>
<button>3</button>

<script>
  const buttons = document.getElementsByTagName("button");
  for(var i = 0; i < buttons.length; i++) {
    (function(n) {
      buttons[i].onclick = function() {
        console.log(`第${n}个按钮被点击`);
      }
    })(i);
  }
</script>
```

- 这是以前的做法，函数中没有n就到上一层作用域中查找，上一层作用域依然是一个函数，这个函数作用域中有n吗？有

- 这里其实也是有一个闭包，最里面的函数访问外层自由变量

- 上面的代码相当于三个这样的代码

  ```js
  (function(n) {
    buttons[i].onclick = function() {
      console.log(`第${n}个按钮被点击`);
    }
  })(0);
  (function(n) {
    buttons[i].onclick = function() {
      console.log(`第${n}个按钮被点击`);
    }
  })(1);
  (function(n) {
    buttons[i].onclick = function() {
      console.log(`第${n}个按钮被点击`);
    }
  })(2);
  ```

```html
<button>1</button>
<button>2</button>
<button>3</button>

<script>
  const buttons = document.getElementsByTagName("button");
  for(let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
      console.log(`第${i}个按钮被点击`);
    }
  }
</script>
```

- 由于使用的是let，所以就形成了块级作用域

- 函数中没有i，就向上一层作用域中进行查找，上层作用域中是有i的

- 上面的代码类似于三个下面的代码

  ```js
  {
    let i = 0;
    buttons[i].onclick = function() {
      console.log(`第${i}个按钮被点击`);
    }
  }
  {
    let i = 1;
    buttons[i].onclick = function() {
      console.log(`第${i}个按钮被点击`);
    }
  }
  {
    let i = 2;
    buttons[i].onclick = function() {
      console.log(`第${i}个按钮被点击`);
    }
  }
  ```


### 6.for循环什么时候可以用const

```js
const buttons = document.getElementsByTagName("button");
for(const i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
    console.log(`第${i}个按钮被点击`);
  }
}
```

- 由于后面有++的操作，所以不能使用const

```js
const name = ["abc", "cba", "nba"];

for(const item of name) {
  console.log(item);
};
```

- 这里就可以使用const

### 7.暂时性死区

- 这个名称应该是来自于社区

  - 在一个代码块中，我们使用let/const声明的变量，在声明之前，变量都是不可以访问的

  - 我们将这种现象称之为：temporal dead zone

    ```js
    var foo = "foo";
    
    if(true) {
      console.log(foo);
    
      let foo = "abc";
    };
    ```

    - 报错
    - 从if的第一个大括号，到下一个大括号之间的区域，我们称其为：暂时性死区
    - 在暂时性死区内部，不能在let/const声明变量之前，访问变量

    ```js
    function foo() {
      console.log(bar);
    
      let bar = "abc";
    };
    
    foo();
    ```

    - 这个也属于暂时性死区

### 8.var/let/const的选择

- var
  - var有很多的特殊性：作用域提升、window全局对象、没有块级作用域等历史遗留问题
  - var是JavaScript在设计之初的一种语言缺陷
  - 市场上经常用var的这些缺陷来出题，考察对JavaScript语言本身以及底层的理解
  - 我们工作时是不会用它的
- let/const
  - 优先推荐使用const，这样可以保证我们的数据的安全性，避免数据被随意修改
  - 只有当我们明确知道一个变量后续需要修改，这个时候再使用let