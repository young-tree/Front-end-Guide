### 1.事件处理方案

```html
<!-- 方案一: 在元素中编写事件监听 -->
<button onclick="console.log('按钮被点击~')">监听点击事件</button>
<button class="btn">监听点击事件</button>
<script>
  // 方案二: onclick属性
  const btnEl = document.querySelector(".btn");

  btnEl.onclick = function() {
    console.log("按钮被点击~1");
  }
  btnEl.onclick = function() {
    console.log("按钮被点击~2");
  }
  // 缺点：不能添加多个点击事件

  // 方案三: addEventListener
  btnEl.addEventListener("click", function() {
    console.log("按钮被点击~1")
  });
  btnEl.addEventListener("click", function() {
    console.log("按钮被点击~2")
  });
  btnEl.addEventListener("click", function() {
    console.log("按钮被点击~3")
  });
</script>
```

### 2.事件冒泡和事件捕获

```html
<head>
  <style>
    .outer {
      width: 200px;
      height: 200px;
      background-color: red;
    }
    .inner {
      width: 100px;
      height: 100px;
      background-color: blue;
    }
  </style>
</head>
<body>
  <div class="outer">
    <div class="inner"></div>
  </div>
  <script>
    const outerEl = document.querySelector(".outer");
    const innerEl = document.querySelector(".inner");

    // 事件冒泡
    outerEl.addEventListener("click", () => console.log("outer被点击了~冒泡"));
    innerEl.addEventListener("click", () => console.log("inner被点击了~冒泡"));
    // 先打印: inner被点击了~冒泡
    // 后打印: outer被点击了~冒泡
    // 这就是事件冒泡
    // 就如同空军, 直接空降到最里层, 拿到想要的东西后, 往外突围

    // 事件捕获
    outerEl.addEventListener("click", () => console.log("outer被点击了~捕获"), true);
    innerEl.addEventListener("click", () => console.log("inner被点击了~捕获"), true);
    // 先打印: outer被点击了~捕获
    // 后打印: inner被点击了~捕获
    // 这就是事件捕获
    // 就如同陆军, 直接正面硬刚, 一层一层的突破, 到达最里面, 拿到想要的东西

    // 如果同时有捕获和冒泡阶段先捕获后冒泡
    // 先突破再突围
    // 先陆军正面刚, 然后再配合空军, 突围出去
  </script>
</body>
```

### 3.事件对象的属性

```html
<head>
  <style>
    .outer {
      width: 300px;
      height: 300px;
      background-color: red;
    }
    .outer .middle {
      width: 200px;
      height: 200px;
      background-color: blue;
    }
    .outer .middle .inner {
      width: 100px;
      height: 100px;
      background-color: green;
    }
  </style>
</head>
<body>
  <div class="outer">
    <div class="middle">
      <div class="inner"></div>
    </div>
  </div>
  <script>
    const outerEl = document.querySelector(".outer");
    const middleEl = document.querySelector(".middle");
    const innerEl = document.querySelector(".inner");

    outerEl.addEventListener("click", (event) => {
      console.log(event.type);  // click
      console.log(event.eventPhase);  // 处在捕获阶段就是1 事件发生就是2 处在冒泡阶段就是3

      console.log(event.offsetX);  // 触发事件的x轴坐标
      console.log(event.offsetY);  // 触发事件的y轴坐标

      console.log(event.clientX);  // 
      console.log(event.clientY);  // 鼠标到顶部的可视距离

      console.log(event.pageX);  // 
      console.log(event.pageY);  // 点击位置到页面的整个距离

      console.log(event.screenX);  // 
      console.log(event.screenY);  // 鼠标到整个电脑屏幕的距离

      // target和currentTarget
      console.log(event.target);  // 点击的谁, target就是被点击的DOM对象
      console.log(event.currentTarget);  // 当前事件触发的DOM对象
    })
  </script>
</body>
```

### 4.事件对象的方法

```html
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .outer {
      width: 300px;
      height: 300px;
      background-color: red;
    }
    .outer .middle {
      width: 200px;
      height: 200px;
      background-color: blue;
    }
    .outer .middle .inner {
      width: 100px;
      height: 100px;
      background-color: green;
    }
  </style>
</head>
<body>
  <a href="https://www.baidu.com" class="baidu">百度一下</a>

  <div class="outer">
    <div class="middle">
      <div class="inner"></div>
    </div>
  </div>
  <script>
    const baiduEl = document.querySelector(".baidu");
    baiduEl.addEventListener("click", (event) => {
      // 阻止默认事件
      event.preventDefault();
      console.log(123);
    })

    const outerEl = document.querySelector(".outer");
    const middleEl = document.querySelector(".middle");
    const innerEl = document.querySelector(".inner");

    outerEl.addEventListener("click", (event) => {
      // event.stopPropagation();
      console.log("outer被点击了~捕获");
    }, true);
    middleEl.addEventListener("click", () => console.log("middle被点击了~捕获"), true);
    innerEl.addEventListener("click", () => console.log("inner被点击了~捕获"), true);
    innerEl.addEventListener("click", () => {
      console.log("inner被点击了~冒泡")
      event.stopPropagation();  // 阻止事件的进一步传递
    });
    middleEl.addEventListener("click", () => console.log("middle被点击了~冒泡"));
    outerEl.addEventListener("click", () => console.log("outer被点击了~冒泡"));
  </script>
</body>
```

### 5.事件中的this

```html
<div>
  <button>按钮</button>
</div>
<script>
  const divEl = document.querySelector("div");
  const btnEl = document.querySelector("button");

  divEl.onclick = function(event) {
    console.log(this);  // 代表divEl
    console.log(event.target);  // 如果点击的是按钮就代表btnEl, 如果点击的是div就代表divEl
    console.log(event.currentTarget);  // 代表divEl
  }
  btnEl.onclick = function(event) {
    console.log(this);  // 代表btnEl
    console.log(event.currentTarget);  // 代表btnEl
  }

  divEl.addEventListener("click", function(event) {
    console.log(this);  // 代表divEl
    console.log(event.target);  // 如果点击的是按钮就代表btnEl, 如果点击的是div就代表divEl
    console.log(event.currentTarget);  // 代表divEl
  })
  btnEl.addEventListener("click", function(event) {
    console.log(this);  // 代表btnEl
    console.log(event.currentTarget);  // 代表btnEl
  })
</script>
```

- 如果不是箭头函数, this永远指向添加事件的DOM对象
- 无论怎样，currentTarget永远代表添加点击事件的DOM对象
- 如果是普通函数, this和currentTarget永远是相等的
- 存在嵌套, 点击哪个DOM对象target就是哪个DOM对象