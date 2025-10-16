### 1.CommonJS和Node

- CommonJS是一个规范，最初提出来是在浏览器以外的地方使用，当时命名为ServerJS
  - 后来为了 体现它的广泛性，修改为CommonJS，也简称为CJS
  - Node是CommonJS在服务器端一个具有代表性的实现
  - Browserify是CommonJS在浏览器中的一种实现
  - webpack打包工具具备对CommonJS的支持和转换
- Node对CommonJS进行了支持和实现，在开发node的过程中可以方便的进行模块化开发
  - 在Node中每一个js文件都是一个单独的模块
  - 每个模块包括CommonJS规范的核心变量：exports、module.exports、require
  - 我们可以使用这些变量来方便的进行模块化开发
- 模块化的核心是导出和导入，Node中对其进行了实现
  - exports和module.exports可以导出模块中的内容
  - require函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容

### 2.对于Node开发的几点说明

- 开发一个Node服务，其实里面只有一个主文件，其他都是附属文件
- 如果没有导入和导出，文件与文件之间是不能沟通的
- 之所以开发一个网页，js文件与文件之间可以实现沟通是因为，在html文件里引用了js文件
- 开发一个Node服务，是没有html文件的

### 3.导出与导入

- 在yt.js文件中导出存在变量和函数的对象

  ```js
  const name = "yt"
  const age = 22;
  
  function sum(num1, num2) {
    return num1 + num2
  }
  
  // module.exports [ˈmɒdjuːl] 
  module.exports = {
    name,
    age,
    sum
  }
  ```

- 在main.js文件中导入存在变量和函数的对象

  ```js
  const yt = require("./yt");
  // 解构的写法
  const { name, age, sum } = require("./yt");
  
  console.log(yt.name);
  console.log(yt.age);
  
  console.log(yt.sum(1, 2));
  ```

### 4.内部原理

```js
const info = {
  name: "yt",
  age: 22,
  sum(num1, num2) {
    return num1 + num2
  }
}

module.exports = info;
```

```js
const yt = require("./yt");
```

- 在内存中创建一个对象，内存地址为0x100

- info指向这个对象，module.exports也指向这个对象

- 那么yt呢？yt也指向这个对象

  ```js
  // require大概率的实现过程
  function require(id) {
    return module.exports;
  }
  ```

- 这三个均指向同一个对象

- 但是要注意不要改变导入的内容，只使用引入的变量即可

### 5.exports

- 你可能见过这样的导出方式

  ```js
  const name = "yt"
  const age = 22
  function sum(num1, num2) {
    return num1 + num2
  }
  
  exports.name = name;
  exports.age = age;
  exports.sum = sum;
  ```

  - 这种方式是可以导出的

- 为什么既可以通过module.exports直接导出一个对象，又可以通过exports导出一个一个的变量

- 我们需要看一下源码

  ```js
  module.exports = {};
  exports = module.exports;
  ```

  - 这样做就是让exports指向module.exports
  - 那么通过export.name的方式导出变量，就是在往module.exports里面塞变量

- 但是我们要明白，通过require导入的对象是module.exports指向的对象

  - 也就是说module.exports才能导出东西，是Node内部自己实现的
  - 如果你给exports直接赋值一个对象，是无法导出的，是错的
  - 因为这样做exports和module.exports并不指向同一个对象

- 导出必须是module.exports对象，导入必须是require函数

- 一个小题目

  ```js
  const name = "yt"
  const age = 22
  function sum(num1, num2) {
    return num1 + num2
  }
  
  exports.name = name;
  exports.age = age;
  exports.sum = sum;
  
  module.exports = {};
  ```

  - 变量和函数会被导出吗？
  - 不会的，虽然在没有写module.exports之前，给exports指向的对象赋了一些值
  - 但是module.exports最后又指向了一个空对象
  - 所以变量和函数不会被导出

- 如果exports和module.exports不指向同一个对象，exports的导出方式会失效

- exports存在的意义
  - CommonJS规范上说，如果导出东西要用exports导出
  - 虽然Node通过module.exports导出东西，实现了CommonJS所说的功能
  - 但是在形式上还不完整

