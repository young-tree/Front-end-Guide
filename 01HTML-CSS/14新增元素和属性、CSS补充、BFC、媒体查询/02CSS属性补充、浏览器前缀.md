### 1.CSS属性——white-space

- 用于设置空白处理和换行规则
  - 空白有哪些？
    - 空格、制表符、换行符
- 值：
  - normal：合并所有连续的空白，允许单词超屏时自动换行，默认值
  - nowrap：合并所有连续的空白，不允许单词超屏时自动换行，最常用，其他知不知道无所谓
  - pre：阻止合并所有连续的空白，不允许单词超屏时自动换行
  - pre-wrap：阻止合并所有连续的空白，允许单词超屏时自动换行
  - pre-line：合并所有连续的空白（但保留换行），允许单词超屏时自动换行

### 2.CSS属性——text-overflow

- text-overflow通常用来设置文字溢出时的行为
  - clip [klɪp] ：溢出的内容直接裁剪掉（字符可能会显示不完整）
  - ellipsis：溢出的内容截掉，结尾用省略号表示
- text-overflow生效的前提
  - overflow不为visible

### 3.CSS函数——var

- 在css中自定义属性

  - 属性名：--任意名字

    ```css
    :root {
      --theme-color: #f00;
    }
    ```

- 使用自定义属性

  ```css
  :root {
    --theme-color: #f00;
  }
  .box1 {
    color: var(--theme-color);
  }
  ```

### 4.CSS函数——calc

- 支持加减乘除

  - 加号或者减号两边必须留有空格

    ```css
    .box2 .one {
      width: calc(100% - 100px);
      height: 100px;
      background-color: #f0f;
    }
    ```

### 5.CSS函数——blur

- 将高斯模糊效果应用于输出的图片或者元素上;
  - blur(radius) [blɜːr] 
  - radius：模糊的半径，用于定义高斯函数的偏差值
    - 偏差值越大，图片越模糊

- blur函数一般作为以下两个属性的值

  - filter: 将模糊或颜色偏移等图形效果应用于元素
  - backdrop-filter: 为元素后面的区域添加模糊或者其他效果

- 实践

  ```html
  <style>
    img {
      vertical-align: top;
    }
    .image {
      filter: blur(5px);
    }
    .box {
      position: relative;
      display: inline-block;
      background-color: #f00;
    }
  
    .box .cover {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #0008;
      backdrop-filter: blur(5px);
    }
  </style>
    
  <img src="../10Glory of Kings/images/dahuawang.jpeg" class="image">
  
  <div class="box">
    <img src="../10Glory of Kings/images/dahuawang.jpeg">
    <div class="cover"></div>
  </div>
  ```

  ![image-20220428101911705](images/image-20220428101911705.png)

### 6.CSS函数——gradient

- 颜色渐变 [ˈɡreɪdiənt] 

- 是一种`<image>`CSS数据类型的子类型，用于表现两种或多种颜色的过渡转变

  ```html
  <style>
    div {
      width: 150px;
      height: 100px;
      background-image: linear-gradient(red, blue);  /* 从上到下渐变 [ˈlɪniər]  */
      background-image: linear-gradient(to right, red, blue); /* 从左到右渐变 */
      background-image: linear-gradient(to right top, red, blue);  /* 从左下到右上渐变 */
  
      background-image: radial-gradient(red, blue);  /* 从中间扩散 [ˈreɪdiəl]  */
      background-image: radial-gradient(at 0% 50%, red, blue);  /* 从左边缘的中点扩散 */
    }
  </style>
  
  <div></div>
  ```

### 7.浏览器前缀

- 浏览器前缀有哪些：
  - -o-、-xv-：Opera
  - -ms-、mso-：IE
  - -moz-：Firefox
  - -webkit-：Safari、Chrome
- 为什么会有浏览器前缀
  - 比如flex被组织提出
  - 下面的各个浏览器厂商就要在当前版本或者下一个版本进行实现
  - 在实现的时候又害怕组织在最终定下来的时候改了名字
  - 所以各个浏览器厂商就会在flex前面加上属于自己的前缀
  - 以供当前版本的浏览器使用
  - 为啥有的版本就不需要前缀呢？
  - 因为随着时间的流逝，组织已经将flex这个名字定下来了，在新的浏览器中，浏览器厂商直接将这个功能实现了，并且命名为flex
  - 总的来说，浏览器前缀是用于在未完全确定名字到完全确定名字的一种过渡方案

### 8.隐藏滚动条

```css
-ms-overflow-style: none;  /* IE */
scrollbar-width: none;  /* 火狐 */
&::-webkit-scrollbar{
  display: none;
}
```

