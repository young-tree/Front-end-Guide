### 1.认识HTML

- 超文本标记语言（HyperText Markup Language）创建网页的标准标记语言
- 什么是标记语言
  - 既然是标记语言，就不属于编程语言
  - 由无数个标记组成
  - 对某些内容进行特殊的标记，以供其他解释器识别处理
  - 比如被`<h1></h1>`标记的文字，会被放大加粗
- 什么是超文本（HyperText）
  - 不仅可以插入普通的文本，还可以插入图片、视频、音频等内容
  - 还可以放置超链接（HyperLink），用于从一个网页跳转到另一个网页

### 2.HTML的扩展名

- 为什么HTML会有两个扩展名？
  - .htm的存在是因为Win95/Win98系统要求文件的扩展名不能超过三个字符
  - 现在统一使用.html

### 3.HTML文件的结构

- 最外层有html元素，html元素内有两个元素，分别是head元素和body元素
- head元素中是元数据（metadata），比如有title元素
- body元素存储主要内容

### 4.VSCode编辑器插件-配置

- 插件
  - 颜色主题：atom one dark
  - 文件夹图标：VSCode Great Icons（个人不是很推荐）
  - 在浏览器中打开网页
    - open in browser[ˈbraʊzər]
    - Live Sever
  - 自动重命名标签：auto rename tag

- 配置

  - 自动保存：Auto Save

  - 修改代码的字体大小：Font Size

    ![image-20220324194539695](https://s2.loli.net/2022/03/24/4Xn8zuvMKJGYbVq.png)

  - 代码自动换行：Word Wrap

    ![image-20220324194655887](https://s2.loli.net/2022/03/24/UYTwqHrZPfd8vMg.png)

  - 空格的渲染方式：Render Whitespase

    ![image-20220324194937545](https://s2.loli.net/2022/03/24/w2FnT3s5evREtYk.png)

  - 代码缩进：Tab Size

    ![image-20220324195036887](https://s2.loli.net/2022/03/24/aObIpurxYnHtWhl.png)

    ![image-20220324195222848](https://s2.loli.net/2022/03/24/5HnYT9LQPb2sgCO.png)

### 5.什么是元素

- HTML的本质是由一系列的元素构成的
- 元素是网页的一部分
- 元素可以包含一块文本、一张照片、一段音频、一个数据项，或者什么也不包含

- HTML有哪些元素呢

  https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element

### 6.元素的组成

- 剖析一个元素

  ![image-20220324200733972](https://s2.loli.net/2022/03/24/tmRAcKxIhE2eLXj.png)

- 一个元素的主要部分

  - 开始标签
  - 结束标签
  - 内容
  - 这三个所组成的整体就是元素

### 7.元素的属性

- 元素也可以拥有属性

  ![image-20220324201057855](https://s2.loli.net/2022/03/24/yIkVsTXFPYGUaDh.png)

  - 属性包含元素的额外信息，这些额外信息不会出现在实际内容中

- 属性所包含的内容

  - 空格
  - 属性名
  - 等号
  - 属性值，属性值一般由双引号或单引号引起来

### 8.属性的分类

- 所有元素均可使用的公共属性
  - class、id、title
- 特定某些元素使用的属性
  - meta元素的charset属性
  - img元素的alt属性

### 9.标签的分类

- 双标签
  - html、head、body、h1、p、span
- 单标签
  - input、img、meta、br
  - 单标签现在统一没有最后的斜杠

### 10.元素的回顾

![image-20220324202005389](https://s2.loli.net/2022/03/24/kthJy7EZYBpXQIw.png)

### 11.元素的嵌套关系

![image-20220324202033700](https://s2.loli.net/2022/03/24/iOU76pKezgkZDW3.png)

- 除了嵌套关系还有：

  - 父子关系

  - 兄弟关系

    ```html
    <div>
      <ul>
        <li>1</li>
        <li>1</li>  <!-- 这三个就是兄弟关系 -->
        <li>1</li>
      </ul>
      <!-- ul和li是父子关系 -->
    
      <div>
        <span></span>  <!-- div和span是父子关系 -->
      </div>
      <div></div>  <!-- div和div是兄弟关系 -->
    </div>
    ```

    - 整体是嵌套关系

### 12.为什么需要注释

- 防止时间长了自己忘记代码是如何写的
- 自己要看的懂，也要让别人看的懂
- 注释掉一部分代码，方便调试
- 开发框架时，加入注释，方便别人使用和学习（开源精神）

### 13.HTML的注释

`<!-- 注释的内容 -->`

快捷键：ctrl + /

注释一般给开发者看，浏览器一般不会把注释显示给用户看

