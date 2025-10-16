### 1.对象字面量的三个增强写法

- 对象字面量增强（Enhanced Object literals）

- 属性简写（property shorthand）

  ```js
  var name = "why";
  var age = 18;
  
  var obj = {
    name,
    age,
  };
  ```

- 方法简写（method shorthand）

  ```js
  var obj = {
    bar() {
      console.log("bar");
    },
    foo() {
      console.log("foo");
    },
    arrow: () => {
      console.log("这个是箭头函数");
    },
  };
  ```

- 计算属性名（computed property name）

  - 我不确定属性的名字

    ```js
    var abc = "cba";
    
    var obj = {
      abc,
    };
    ```

  - 比如我们想为obj对象添加一个属性，名字叫abc这个变量加上123，这么一个组合名字

  - 在以前是怎么做的呢？

    ```js
    var abc = "abc";
    
    var obj = {
      abc,
    };
    
    obj[abc + 123] = "nba";
    
    console.log(obj);  // { abc: 'abc', abc123: 'nba' }
    ```

  - 现在可以这么做

    ```js
    var abc = "abc";
    
    var obj = {
      abc,
      [abc + 123]: "nba",
    };
    
    console.log(obj);  // { abc: 'abc', abc123: 'nba' }
    ```

### 2.解构Destructuring

- 数组的解构

  ```js
  var arr = ["abc", "cba", "nba"];
  
  var [item1, item2, item3] = arr;
  
  console.log(item1, item2, item3);  // abc cba nba
  ```

  ```js
  // 转为ES5的代码
  var arr = ["abc", "cba", "nba"];
  var item1 = arr[0],
      item2 = arr[1],
      item3 = arr[2];
  console.log(item1, item2, item3);
  ```

  - 我们想只拿后面两个元素

    ```js
    var arr = ["abc", "cba", "nba"];
    
    var [, item2, item3] = arr;
    
    console.log(item2, item3);  // cba nba
    ```

  - 把后面两个元素放到一个数组中

    ```js
    var arr = ["abc", "cba", "nba"];
    
    var [item1, ...items] = arr;
    
    console.log(item1, items);  // abc [ 'cba', 'nba' ]
    ```

    - 这个三个点不是展开运算符，是数组解构中的一种语法

    - 这个与函数中的剩余参数有些许相似

      ```js
      function foo(...arg) {}
      ```

  - 解构的默认值

    ```js
    var arr = ["abc", "cba", "nba"];
    
    var [item1, item2, item3, item4 = "mba"] = arr;
    
    console.log(item1, item2, item3, item4);  // abc cba nba mba
    ```

- 对象的解构

  ```js
  var obj = {
    name: "yt",
    age: 22,
    height: 1.74,
  };
  
  var { name, age, height } = obj;
  
  console.log(name, age, height);  // yt 22 1.74
  ```

  ```js
  // 转为ES5的代码
  var obj = {
    name: "yt",
    age: 22,
    height: 1.74
  };
  var name = obj.name,
      age = obj.age,
      height = obj.height;
  console.log(name, age, height);
  ```
  - 重命名

    ```js
    var obj = {
      name: "yt",
      age: 22,
      height: 1.74,
    };
    
    var { name: newName, age, height } = obj;
    
    console.log(newName, age, height);
    ```

  - 默认值

    ```js
    var obj = {
      name: "yt",
      age: 22,
      height: 1.74,
    };
    
    var { name: newName, age, height, address = "济南市" } = obj;
    
    console.log(newName, age, height, address);
    ```

### 3.let和const的基本使用

- 在ES5中我们声明变量都是使用var关键字，从ES6开始新增了两个关键字来声明变量，分别是let和const
  - let和const并不是新鲜的关键字，在其他的编程语言中是存在的
  - let和const为js带来了一些活力
- let关键字
  - 从直观的角度来说，let和var没有太大的区别，都是用于声明一个变量
- const关键字
  - const关键字是constant单词的缩写，表示常量、衡量
  - 它表示保存的数据一旦被赋值，就不能被修改
  - 如果赋值的是引用类型，可以通过引用找到对应的对象或数组，修改对象或数组内的内容
- let和const不允许重复声明变量和恒量

### 4.let/const作用域提升

```js
console.log(foo);
let foo = "abc";
```

- 报错：ReferenceError（引用错误）: Cannot access（访问） 'foo' before initialization [ɪˌnɪʃəlaɪˈzeɪʃn]（初始化）
- 引用错误：不能在初始化之前访问'foo'
- let/const它们是没有作用域提升的
  - 但是这句话在社区内是有争议的
  - 什么争议呢？
    - 如果let/const没有作用域提升，是不是意味着foo变量，在执行到let foo = "abc"的时候才会被创建
- 我们知道如果是var，在解析的时候foo就会被创建出来
- 那么let声明的变量是在解析的时候被创建还是在执行的时候被创建的呢？
- 我们可以看一下ECMA262（ECMA最新的规范）对let和const的描述
  - The variables are created when their containing **Lexical Environment** is instantiated but may not be accessed in any way until the variable's *LexicalBinding* is evaluated.
  - 在实例化词法环境时，变量会被创建在这个实例化的词法环境中
  - 但是在变量的词法绑定被赋值之前，可能无法以任何方式进行访问
- 词法环境：在执行上下文中会创建一个词法环境
- 整个这段话是什么意思呢？
  - 在执行console.log(foo);时foo是被创建出来了，只是不能被访问
- foo不能被访问还能否被认为是作用域提升？
  - 首先要明白什么是作用域提升？
  - 既然都提升了，你却依然不能被访问，那么你这个提升就没有意义
  - 所以我们不认为let/const做了作用域提升