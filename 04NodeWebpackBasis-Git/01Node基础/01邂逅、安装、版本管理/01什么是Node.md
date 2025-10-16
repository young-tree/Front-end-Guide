### 1.什么是Node.js?

- Node.js是一个基于V8 JavaScript引擎的JavaScript运行时环境。

  > Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.

### 2.渲染引擎的工作过程

![image-20210206092203881](images/image-20210206092203881.png)

- 浏览器使用HTML解析器对HTML进行解析，在HTML解析的过程中会遇到JavaScript标签
  - 浏览器停止解析HTML而去加载和执行JavaScript代码
- 为什么不直接去异步加载JavaScript代码呢？
  - 因为JavaScript代码可以操作我们的DOM树（那个三角DOM就代表DOM操作）
  - 所以浏览器希望将HTML解析的DOM和JavaScript操作之后的DOM放到一起来生成最后的DOM树
  - 而不是频繁的去生成新的DOM树
- JavaScript代码由谁来执行呢？
  - JavaScript引擎
- 除此之外css样式也会进行解析，解析成style Rules，再与DOM树进行一个合并附加
  - 生成一个Render Tree（渲染树）
- 然后还要根据浏览器的状态进行layout（布局），生成最终的Render Tree（渲染树）
  - 在这之后我们就可以进行绘制，至此就可以在浏览器上看见效果了
- script标签中放的是JavaScript代码，JavaScript代码是一门高级语言
- 高级语言要想执行必须先转化成汇编语言再转化成机器语言（只有机器语言才能被计算机执行）
  - JavaScript引擎就是做这个工作的

### 3.浏览器渲染过程补充

- HTML通过HTML解析器解析成DOM树，将DOM树理解为一个对象
- CSS通过CSS解析器解析成规则树
- 往DOM树上附加规则树，就是为对应的元素加一些对象，生成Render树
- 但是如果我们要把每个对象都渲染到浏览器上，还要计算每个元素在浏览器中的具体位置
- 所以layout就是做这个工作的，比如Render树记录了一个元素，这个元素有宽高，也有display: none;
- 不过这个元素是不需要显示的，所以具体的位置还需要layout进行计算和排布
- 最后经过绘制展示在浏览器上

### 4.JavaScript引擎

- 为什么需要JavaScript引擎呢？
  - 事实上我们编写的JavaScript无论你交给浏览器或者Node执行，最后都是需要被CPU执行的
  - 但是CPU只认识自己的指令集，实际上是机器语言，才能被CPU所执行
  - 所以我们需要JavaScript引擎帮助我们将JavaScript代码翻译成CPU指令来执行
  - cpu指令类似于：010101

- 比较常见的JavaScript引擎有哪些呢？
  - SpiderMonkey：第一款JavaScript引擎，由Brendan Eich开发（也就是JavaScript作者）
  - Chakra：微软开发，用于IE浏览器
  - JavaScriptCore：WebKit中的JavaScript引擎，Apple公司开发；（小程序用）
  - V8引擎：Google开发的强大JavaScript引擎，也帮助Chrome从众多浏览器中脱颖而出
    - 因为它执行JavaScript代码更快。

### 6.WebKit内核

- WebKit由两部分组成：

  ![image-20210206100824965](images/image-20210206100824965.png)

  - WebCore：负责HTML解析、布局、渲染等相关工作。
  - JavaScriptCore：负责解析、执行JavaScript代码。

- 如果你学过小程序你会感到熟悉

- 在小程序中编写的JavaScript代码就是被JavaScriptCore执行的

  ![image-20210206101208744](images/image-20210206101208744.png)

### 7.V8引擎的主要流程

- 我们来看一下官方对V8引擎的定义： 
  - V8是用C++编写的Google开源高性能JavaScript和WebAssembly引擎，它应用于Chrome和Node.js等
  - 它实现ECMAScript和WebAssembly
    - 在Windows 7或更高版本系统上使用
    - 在 macOS 10.12+ 系统上使用
    - 以及使用x64，IA-32， ARM或MIPS处理器的Linux系统上运行
  - V8可以独立运行，也可以嵌入到任何C++应用程序中。

- V8引擎流程图

  ![image-20210206101434612](images/image-20210206101434612.png)

  - Parse、Ignition、TurboFan是V8引擎提供的三个内置模块

- Parse模块通过词法分析和语法分析，将JavaScript源代码转换成AST（abstract syntax tree）抽象语法树

  - 词法分析：解析每一个词，把每一个词都弄成一个个小对象，也就是tokens

  - 语法分析：分析这些小对象

  - 抽象语法树：

    ![image-20220105153503872](images/image-20220105153503872.png)

- Ignition解释器将抽象语法树转换成bytecode字节码，这个字节码类似于汇编代码但并不是真实的汇编代码
  - 后面才会转换成汇编语言和机器语言。
  - 因为不同的操作系统，CPU指令可能不同，所以不能直接转成汇编指令

![image-20210206143234197](images/image-20210206143234197.png)

### 8.V8引擎的优化

- Ignition解释器除了将抽象语法树转换成bytecode字节码以外, 还会收集信息（比如参数的类型信息）
  - 并且会把这些信息传给TurboFan编译器
  - TurboFan编译器结合收集到的信息将字节码转换成优化的机器码MachineCode
  - 下一次再运行这些代码的话就直接运行优化的机器码，效率将会提高

- 问题
  - 假如有传递参数好多次都是数字类型，但是突然有一次传的是字符串的类型
  - 那么优化后的机器码就不知道该干嘛了
  - 所以针对这个问题V8引擎会通过Deoptimization，de-反向的，optimization优化
    - 将机器码反向优化成字节码，再按照字节码进行数据传递
    - 如果好多次都是字符串就会再走TurboFan模块
  - typescript：它要求参数类型是不能变的，在某种程度上可以提高代码运行效率

<img src="images/image-20210206144045872.png" alt="image-20210206144045872" style="zoom:67%;" />

### 9.V8引擎的原理（官方解释）

- V8引擎本身的源码非常复杂，大概有超过100w行C++代码
  - 但是我们可以简单了解一下它执行JavaScript代码的原理
- Parse模块会将JavaScript代码转换成AST（抽象语法树），这是因为解释器并不直接认识JavaScript代码
  - 如果函数没有被调用，那么是不会被转换成AST的
  - Parse的V8官方文档：https://v8.dev/blog/scanner
- Ignition是一个解释器，会将AST转换成ByteCode（字节码）
  - 同时会收集TurboFan优化所需要的信息（比如函数参数的类型信息，有了类型才能进行真实的运算）
  - 如果函数只调用一次，Ignition会解释执行ByteCode
  - Ignition的V8官方文档：https://v8.dev/blog/ignition-interpreter 
- TurboFan是一个编译器，可以将字节码编译为CPU可以直接执行的机器码；
  -  如果一个函数被多次调用，那么就会被标记为热点函数
     -  经过TurboFan转换成优化的机器码，提高代码的执行性能
  -  但是，机器码实际上也会被还原为ByteCode
     -  这是因为如果后续执行函数的过程中，类型发生了变化
     -  比如sum函数原来执行的是number类型，后来执行变成了string类型
     -  之前优化的机器码并不能正确的处理运算，就会逆向的转换成字节码
  - TurboFan的V8官方文档：https://v8.dev/blog/turbofan-jit 
- 上面是JavaScript代码的执行过程，事实上V8的内存回收也是其强大的另外一个原因
  - Orinoco模块，负责垃圾回收，将程序中不需要的内存进行回收
  - Orinoco的V8官方文档：https://v8.dev/blog/trash-talk

### 10.回顾：Node.js是什么

- Node.js是一个基于V8 JavaScript引擎的JavaScript运行时环境。

  > Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.

- 也就是说Node.js基于V8引擎来执行JavaScript的代码，但是不仅仅只有V8引擎：
  - 前面我们知道V8可以嵌入到任何C++应用程序中，无论是Chrome还是Node.js
    - 事实上都是嵌入了V8引擎来执行JavaScript代码
  - 但是在Chrome浏览器中，还需要解析、渲染HTML、CSS等相关渲染引擎
    - 另外还需要提供支持浏览器操作的API、浏览器自己的事件循环等
  - 另外，在Node.js中我们也需要进行一些额外的操作
    - 比如文件系统的读/写、网络IO、加密、压缩解压文件等操作；

### 11.浏览器和Node.js架构区别

![image-20210206150014452](images/image-20210206150014452.png)

- 浏览器：
  - JavaScript代码通过V8帮助执行，除此之外还有HTML/CSS通过Blink进行解析和执行
- Node
  - 中间层是对操作系统进行操作的
    - 比如发送了网络请求，中间层就需要调用操作系统里的网卡来发送我们的网络请求，连接我们的网络
    - 比如操作一些本地的东西还需要操作我们的硬盘
    - 比如展示一些东西还需要调用我们的显卡，把一些东西渲染出来

### 12.Node.js架构

- 我们来看一个单独的Node.js架构图：
  - 我们编写的JavaScript代码会经过V8引擎进行编译和执行
  - 再通过Node.js的Bindings，将任务放到Libuv的事件循环中
  - libuv是使用C语言编写的库
  - libuv提供了事件循环、文件系统读写、网络IO、线程池等等内容

![image-20210206150621075](images/image-20210206150621075.png)

### 13.Node.js的应用场景

- Node.js的快速发展也让企业对Node.js技术越来越重视，在前端招聘中通常会对Node.js有一定的要求
- 特别是对于高级前端开发工程师，Node.js更是必不可少的技能
  - 目前前端开发的库都是以node包的形式进行管理
  - npm、yarn、pnpm工具成为前端开发使用最多的工具
  - 越来越多的公司使用Node.js作为web服务器开发
  - 大量项目需要借助Node.js完成前后端渲染的同构应用
  - 资深前端工程师需要为项目编写脚本工具
    - 前端工程师编写脚本通常会使用JavaScript，而不是Python或者shell
  - 很多企业在使用Electron开发桌面应用程序
    - 比如vscode就是使用Electron开发的