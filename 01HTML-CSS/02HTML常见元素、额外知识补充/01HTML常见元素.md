### 1.完整的HTML结构

- 文档声明
- html元素
  - head元素
  - body元素

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Document</title>
  </head>
  <body>
    内容
  </body>
</html>
```

- 这是一个较为完整的HTML结构

### 2.文档声明

- HTML最上方的一段文本我们称之为文档声明，也可以说是文档类型声明

  ```html
  <!DOCTYPE html>
  ```

- HTML文档声明有什么用呢？

  - 告诉浏览器，当前页面是HTML5的页面
  - 让浏览器用HTML5的标准去解析和识别内容

- 文档声明有什么要求呢？

  - 必须放在HTML文档的最上面
  - 不能省略，省略会出现兼容性问题

- HTML5的声明与HTML4.0和XHTML1.0的声明对比

  ![image-20220325184007113](https://s2.loli.net/2022/03/25/Ybfi48X1ty3gsVD.png)

### 3.html元素

- 我们要区分开HTML元素
  - HTML元素表示：在HTML文档中的那一系列元素
- 这里的html元素是HTML元素中的一个，所有的其他元素均要在它里面书写，即其他所有元素是html的后代
- 我们会发现在html元素中有一个属性叫：lang
  - 它的值有哪些呢？
    - lang="en"表示本站是英文站，HTML文档使用的语言为英文
    - lang="zh-CN"表示本站是中文站，HTML文档使用的语言为中文简体
- 它的作用
  - 帮助语音合成工具确定要使用的发音
  - 帮助翻译工具确定要使用的翻译规则

### 4.head元素

- 规定HTML文档的配置信息，配置信息我们也可称其为元数据

- 常见的配置信息有

  - title元素：设置网页的标题

    ```html
    <title>我的网页</title>
    ```

  - meta元素：设置网页的字符编码

    ```html
    <meta charset="utf-8">
    ```

    - 设置网页的字符编码可以让浏览器更精准的显示每一个字，不设置或设置错很可能会出现乱码
    - utf-8涵盖了世界上几乎所有的文字

### 5.body元素

- 你在浏览器窗口看到的所有东西，都在body元素中

  - 也就是说body包含了，网页的具体内容和结构

    ```html
    <div>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
    ```

- 我们在未来学的大部分HTML元素都需要在body元素中进行书写

### 6.HTML元素

- 现阶段需要学习的常用元素

  - h1~h6元素、P元素
  - img元素、a元素、iframe元素
  - div元素、span元素

- 下一阶段需要学习的元素

  - ul、ol、li元素
  - button元素、input元素
  - table、thead、tbody、th、tr、td元素

- 还有更多元素，请查看下面的文档

  https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element

### 7.h元素

- h元素用于一些比较重要的文字，一般这些文字被用作标题
- h1~h6呈现了六个不同级别的标题
  - h是heading的缩写，表示标题
  - h1级别最高，h6级别最低
- h元素通常与SEO优化有关
- h1和h6的不同，浏览器到底是如何区分呈现的呢？
  - 通过不同的css，对样式进行改变

### 8.p元素

- p元素用来表示一个段落
- p是paragraph [ˈpærəɡrɑːf] 的缩写，表示段落、分段的意思
- p元素与p元素之间会有一定的间距

### 9.img元素

- img元素用来在浏览器中显示一张图片

- img是image单词的缩写，图片、图像的意思

- img是一个可替换元素（replaced element）

  ```html
  <p>123</p>
    <img>
  <p>321</p>
  ```

  ![image-20220326082804140](https://s2.loli.net/2022/03/26/VnX9KiFyMCLEkDJ.png)

  ```html
  <p>123</p>
    <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/28c13d0d11b38ec17fa5d83bc6ba5912.jpg?w=632&h=340" alt="小米手表">
  <p>321</p>
  ```

  ![image-20220326082859119](https://s2.loli.net/2022/03/31/dubmZ7F84pYnh3a.png)

- img的两个常见属性
  - src属性：source单词的缩写，表示资源、源
    - 必须存在的属性
  - alt属性：不是强制性的
    - 作用一：当图片无法成功加载时，会显示这段文字
    - 作用二：屏幕阅读器会将这个属性值读给使用者听，让其知道图像的含义
  
- 某些其他属性已不再使用
  
  - width、height、border

### 10.img元素的图片路径

- 网络图片：URL地址
- 本地图片：本地电脑上的图片
- 本地图片的路径
  - 绝对路径：从根盘符开始查找, 一直找到这个资源
  - 相对路径
- 怎么理解绝对路径和相对路径
  - 比如我待的这个园区，我旁边的人想要找到我，有两种方式
    - 方式一：我给他发消息告诉他我在广州市天河区天盈创意园1060，这个就是绝对路径
    - 方式二：我直接告诉他，就在他的旁边，这个就是相对路径
- 对于网页来说，不管是Windows系统、Mac系统还是Linux系统，路径分隔符都是/而不是\

### 11.img支持的图片格式

<img src="https://s2.loli.net/2022/03/25/NS8KFkycPMp9n53.png" alt="image-20220325195707914" style="zoom:50%;" />

### 12.a元素

- a元素用于跳转链接
  - a是anchor [ˈæŋkər] 的缩写，表示锚
  - 定义超链接，用于打开新的URL
- a元素的两个常用属性
  - href：Hypertext Referenced
    - 指定要打开的url地址
    - 也可以是一个本地地址
  - target
    - 该属性指定在何处显示跳转的资源
    - _self：默认值，在当前窗口打开URL对应的资源
    - _blank：在一个新的窗口中打开URL对应的资源，blank是空白的意思，在空白页打开资源

### 13.a元素的锚点链接

- 跳转到同一网页的指定位置

- 锚点链接有两个重要步骤

  - 在要跳到的元素上定义一个id属性

  - 在a元素上，定义href属性的值，使这个值指向定义的id属性值

    ```html
    <body>
      <a href="#title1">标题1</a>
      <a href="#title2">标题2</a>
      <a href="#title3">标题3</a>
    
      <h2 id="title1">标题一</h2>
      <h2 id="title2">标题二</h2>
      <h2 id="title3">标题三</h2>
    </body>
    ```
    
    <img src="https://s2.loli.net/2022/03/26/qfRJZWTBDM1vA4S.png" alt="image-20220326091329132" style="zoom: 67%;" />
    
    - 这里有一个东西值得注意，就是最后那个#title1，我们称其为片段标识符
    - 后面会说到

### 14.a元素的图片链接

- a元素中嵌套img元素

  ```html
  <a href="http://www.baidu.com">
    <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0ab8e5096ac6f08bd632e4d5a15d1792.jpg?w=632&h=340" alt="松鼠">
  </a>
  ```

### 15.a元素的其他地址种类

- 下载地址
  - https://gitee.com/young_tree/msounduk/repository/archive/master.zip

- 发送邮件
  - mailto:1871589986@qq.com

```html
<a href="https://gitee.com/young_tree/msounduk/repository/archive/master.zip">
  下载压缩包
</a>
<a href="mailto:1871589986@qq.com">发送邮件</a>
```

