### 1.导入方式一：普通导入

- index.js文件（导入）

  ```js
  import { name, age, foo, Person } from "./main.js";
  ```

### 2.导入方式二：起别名

- index.js文件（导入）

  ```js
  import { name as mName, age as mAge, foo as mFoo, Person as mPerson } from "./main.js";
  ```

### 3.导入方式三：标识符

- index.js文件（导入）

  ```js
  import * as main from "./main.js";
  console.log(main.name, main.age)
  
  main.foo();
  
  console.log(new main.Person());
  ```

### 4.导入之后立即导出

- utils/math.js文件（导出sum工具函数）

  ```js
  export function sum(num1, num2) {
    return num1 + num2
  }
  ```

- utils/index.js文件（入口文件）

  ```js
  export { sum } from "./math.js"
  
  // 如果math.js文件中的所有函数都准备导出，可以这么写
  export * from "./math.js"
  ```

- index.js文件（使用sum工具函数）

  ```js
  import { sum } from "./utils/index.js";
  
  console.log(sum(10, 20));
  ```

### 5.default关键字：导出方式一

- main.js文件（导出）

  ```js
  export default function foo() {
    console.log(123)
  }
  ```

- index.js文件（导入）

  ```js
  import aaa from "./main.js"
  
  aaa();
  ```

### 6.default关键字：导出方式二

- main.js文件（导出）

  ```js
  function foo() {
    console.log(123)
  }
  
  export {
    foo as default
  }
  ```

  - 不常见，不推荐使用，了解知道有这么个东西就行
  - 推荐使用方式一
  - 注意：整个文件的默认导出只能有一个

### 7.导入的特点

```js
import { name, age, foo, Person } from "./main.js";‘

console.log("后续代码")
```

- 先解析main.js文件，再拿到里面导出的东西，再执行下面的代码
- main.js下载、解析、实例化、求值，运行内部代码，运行完之后才能把导出的变量给导入的文件

### 8.异步导入

```js
import("./main.js").then(res => console.log(res.default))
```

- import函数返回一个promise对象通过then方法拿到结果
- res是一个对象，对象里有我们想要的东西，有default还有name等等
- 通过对象的方式，拿里面的值就可以了
- 这里下载main.js不是js主线程做的，所以不会阻塞js主线程

### 9.import.meta属性

```js
console.log(import.meta.url)  // http://127.0.0.1:5500/index.js
```

- 这个url代表当前文件的地址