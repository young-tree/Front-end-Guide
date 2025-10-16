### 1.CSS

- Cascading [kæˈskeɪdɪŋ]  Style Sheet：层叠样式表
  - 为HTML元素添加样式的代码
- CSS是什么语言
  - 样式表语言
  - 是一种计算机语言，但不算是编程语言

### 2.CSS的历史

- 在早期，编写一个网页只能使用HTML元素，如果希望网页的样式变得丰富多彩，就必须使用具备特殊样式的元素
- 但是，就算HTML手眼通天，也不可能实现仅用HTML元素就可以编写一个个性化网站的目的
- 那么人们也发觉了这个问题，所以就出现了一些野生的样式语言，以开发自己的个性化网站，但是规则不统一
- 直到1994年，哈肯·维姆·莱 联手 伯特·波斯设计了初代的CSS，并在1996年发布了CSS1
- 1997年年初，W3C组织专门成立了一个CSS工作组，并于1998年5月发布了CSS2
- 在2006~2009年CSS2变得非常流行，DIV+CSS布局的模式让DIV替代了所有的HTML元素
- DIV元素也一跃成为了大部分开发者的宠儿
- 在CSS3研究伊始，W3C组织就把所有的CSS分成了不同的模块（modules），每一个modules都是在CSS2的基础上额外增加功能，并可以向下兼容
- 2011年6月7日，CSS3 Color Module终于发布，并成为W3C Recommendation [ˌrekəmenˈdeɪʃn] （推荐）
- 总结：CSS的出现是为了美化HTML的，并且想让结构与样式分离
  - 美化的第一种办法是：为HTML元素添加各种各样的样式，比如颜色、字体、大小、下划线等
  - 美化的第二种办法是：对HTML页面进行布局，按照某种结构展示在浏览器上
    - 浮动布局、flex布局、grid [ɡrɪd] 布局（还没学过和用过，只听说过）

### 3.CSS的编写方式

![image-20220327193528889](https://s2.loli.net/2022/03/27/ijMspQwnVJKSAzN.png)

- 如果你有多个CSS，就需要用分号进行分割
- 如果你只有一个css规则可以不加，也可以加
- 所以最好加上，且一定不会出错
- color是属性名，要添加的CSS规则的名称
- red是属性值，要添加的CSS规则的值
- 这是在声明一个单独的CSS规则，用来指定CSS样式

### 4.CSS样式如何应用

- 内联样式

  ![image-20220327194233554](https://s2.loli.net/2022/03/27/6EVCRor1zLq2XNg.png)

- 内部样式表

  ![image-20220327194319789](https://s2.loli.net/2022/03/27/m9R7qX82koShIxu.png)

- 外部样式表
  ![image-20220327194350118](https://s2.loli.net/2022/03/27/IiF38PRAJmbLEZu.png)

### 5.通过@import导入

![image-20220327194457354](https://s2.loli.net/2022/03/27/cqW7wG61YVhZPLA.png)

- 你也可以这样写@import "./other.csss"
- 但是，不是很推荐，推荐使用官方推荐的通过url函数引入资源
- 之后我们还会学到background属性，也有url函数的使用
- 路径加引号，和不加引号都行

### 6.CSS的注释

- /* 注释内容 */

### 7.CSS属性的文档

- 官方文档：

  https://www.w3.org/TR/?tag=css

- CSS推荐查询文档

  https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference#%E5%85%B3%E9%94%AE%E5%AD%97%E7%B4%A2%E5%BC%95

- 查询CSS是否可用

  https://caniuse.com/

### 8.目前需要掌握的CSS

- font-size：文字大小
- color：前景色（文字、装饰线、边框、外轮廓等的颜色）
- background-color：背景色
- width：宽度
- height：高度