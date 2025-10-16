### 1.path常见的API

- 从路径中获取信息
  - dirname：获取文件的父文件夹
  - basename：获取文件名
  - extname：获取文件扩展名
- 路径的拼接：path.join方法
  - 如果我们希望将多个路径进行拼接，但是不同的操作系统可能使用的是不同的分隔符
  - 这个时候我们可以使用path.join函数

- 拼接绝对路径：path.resolve方法
  - path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径
  - 给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造成一个绝对路径
  - 如果在处理完所有给定path的段之后，还没有生成绝对路径，则使用当前工作目录
  - 生成的路径被规范化并删除尾部斜杠，零长度path段被忽略
  - 如果没有path传递段，path.resolve()将返回当前工作目录的绝对路径

### 2.演练

- 我这里有一个index.js文件，这个文件在 `C:\Users\林\Desktop\JS高级-练习` 这个目录下

  ```js
  const path = require("path");
  
  console.log(path.resolve("./abc", "./cba/aaa", "./eee"))
  ```

  - 从右往左一次进行拼接
    - C:\Users\林\Desktop\JS高级-练习\abc\cba\aaa\eee

  ```js
  console.log(path.resolve("./abc", "./cba/aaa", "../eee"))
  ```

  - ../会把aaa给覆盖掉
    - C:\Users\林\Desktop\JS高级-练习\abc\cba\eee

  ```js
  console.log(path.resolve("./abc", "./cba/aaa", "/eee"))
  ```

  - 遇到绝对路径会立即停止
    - C:\eee

  ```js
  console.log(path.resolve("./abc", "", "./cba/aaa/", "./eee"))
  ```

  - 零长度path段会被忽略，尾部斜杠也会被忽略
    - C:\Users\林\Desktop\JS高级-练习\abc\cba\aaa\eee

  ```js
  console.log(path.resolve())
  ```

  - 没有path段，path.resolve()将返回当前工作目录的绝对路径
    - C:\Users\林\Desktop\JS高级-练习