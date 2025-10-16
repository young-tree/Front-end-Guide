### 1.CSS属性的继承

- CSS的某些属性具有继承性（inherited）

  - 如果一个css属性具备继承性，在某个元素上设置了这个css属性，那么这个元素的所有后代元素都可以继承这个css属性

    ```html
    <style>
      p {
        color: red;
      }
    </style>
    
    <p>
      123
      <span>456</span>
    </p>
    ```

    <img src="https://s2.loli.net/2022/03/31/kchzBjCR2wvXySr.png" alt="image-20220331195632594" style="zoom:50%;" />

  - 如果后代自己设置了这个继承的css属性，不管继承的css属性有多高的权重，一律以自己设置的css属性为准

- 那么都有哪些属性具有继承性呢？

  - 常见的 font-size / font-family / font-weight / line-height / color / text-align 都具有继承性

- 还有就是要多看文档

  <img src="https://s2.loli.net/2022/03/31/4QiIojOHBnJENv6.png" alt="image-20220331195947785" style="zoom:50%;" />

- 继承所继承的是计算之后的值，而不是设置值

  ```html
  <style>
    p {
      font-size: 2em;
    }
    span {
      font-size: 2em;
    }
  </style>
  
  <p>
    123
    <span>456</span>
  </p>
  ```

  - 请问span的font-size为多少
  - 答：64px
  - span继承的是计算后的32，所以2em其实是两个32相加为64px

- 强制继承

  ```html
  <style>
    div {
      border: 1px solid #000;
    }
    p {
      border: inherit;
    }
  </style>
  
  <div>
    <h2>标题</h2>
    <p>段落</p>
  </div>
  ```

  ![image-20220401185456383](https://s2.loli.net/2022/04/01/4vMKgRkfZ2rnUIz.png)

  - 强制让p元素继承了父元素div的border所设置的值

### 2.CSS属性的层叠

- 我们都知道CSS是层叠样式表的意思，那么什么是层叠呢？
  - 我们可以为某一个元素的某一个css属性用不同的选择器多次设置值
  - 那么属性会被一层一层的覆盖上去
  - 但是只有一个会生效
- 我们如何判断哪一个会生效呢？
  - 不同的选择器看权重：权重大的最终生效
  - 相同的权重看先后顺序：后设置的最终生效
- 选择器的权重
  - !important：10000
  - 内联样式：1000
  - id选择器：100
  - 类选择器、伪类、属性选择器：10
  - 元素选择器、伪元素：1
  - 通配符：0

### 3.HTML元素的类型

- 某些元素比较重要，独占一行：块级元素（block level）
  - h元素、div元素、p元素
- 某些元素属于内容的一部分，不希望它们占据一行：行内级元素（inline level）
  - a元素、span元素、img元素、input元素
- CSS中有一个display属性，暂时先知道属于它的4个值就行
  - block：让元素拥有块级元素的特性
  - inline：让元素拥有行内级元素的特性
  - inline-block：让元素同时拥有行内级和块级元素的特性，属于行内级元素
  - none：隐藏元素，且不占据空间
- display值的特性
  - block元素
    - 独占一行
    - 可以设置宽度和高度，设置之后依然独占一行
    - 高度默认由内容决定
  - inline
    - 可以跟其他行内级元素显示在同一行
    - 设置宽高不起作用
    - 宽度和高度都由内容决定
  - inline-block
    - 可以跟其他行内级元素显示在同一行
    - 可以设置宽度和高度
    - 默认宽度和高度由内容决定
- HTML元素分类
  - 块级元素：h元素、div元素、p元素
  - 行内级非替换元素：span元素、a元素
    - 不可以设置宽高
  - 行内级替换元素：img元素、input元素
    - 可以设置宽高
  - 设置了display: inline-block;CSS属性的元素
  
- 编写HTML时的注意事项
  - 块级元素、设置了inline-block属性值的元素
    - 可以包含其他任何元素
    - 特殊情况：p元素不能包含其他块级元素
  - 行内级元素
    - 一般只能包含行内级元素
    - 但是如果你给行内级元素设置了display: inline-block;这个元素就可以包含其他元素

### 4.把元素隐藏的方法

- 方法一：display: none;

  - 元素不显示、不占据空间，就跟消失了一样

- 方法二：visibility: hidden; [ˌvɪzəˈbɪləti] 可见性

  - 元素不可见、占据空间
  - 默认是visibility: visible; [ˈvɪzəbl] 可见的

- 方法三：color: rgba(0, 0, 0, 0);

  - rgba：中的a是alpha [ˈæl fə] ，可以设置透明度

  - 透明、占据空间，可以选中，不影响子元素

    ![image-20220401194041087](https://s2.loli.net/2022/04/01/mtLDOAHwGj8kV2z.png)

  - 像color: rgba(0, 0, 0, 0);这种的设置如同color: transparent;一样

    - transparent：透明的

- 方法四：opcity: 0;

  - 为整个元素设置透明度

  - 元素透明、占据空间、影响子元素

    ![image-20220401194414302](https://s2.loli.net/2022/04/01/DXFSjtUJAHLoWv7.png)

display和visibility要么让元素消失要么就出现，没有过渡状态

但是display可以让元素直接消失，不占空间

而visibility不让元素消失，依然占据空间，但是不可见

opacity是让整个元素具有透明度，而color只能让元素中一些特定的东西具有透明度

总结：让元素消失与否找display或visibility，给元素或者文字以及其他东西设置透明度找opacity或color

再根据具体情况，每两者择其一

### 5.CSS属性：overflow

- visible：溢出的内容依然可见，默认值

  ![image-20220401195151262](https://s2.loli.net/2022/04/01/U8RGkhaFXNo6I1p.png)

- hidden：溢出的内容隐藏

  ![image-20220401195213447](https://s2.loli.net/2022/04/01/FwJ2H3CWzPQTZi4.png)

- scroll：溢出的内容隐藏、但是可以通过滑动滚动条进行查看

  - 设置了这个值，滚动条就会一直显示，设置的宽度和高度包含滚动条的宽度和高度

    ![image-20220401195306375](https://s2.loli.net/2022/04/01/RAp4eVwPDabufnH.png)

- auto：根据内容是否溢出，决定是否提供滚动机制

  ![image-20220401195327083](https://s2.loli.net/2022/04/01/mSxKM5Qjtk7Lyzc.png)

