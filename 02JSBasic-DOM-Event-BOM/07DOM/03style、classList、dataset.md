### 1.style和className

```html
<button>变换</button>
<div class="box">你好</div>

<script>
  const btnEl = document.querySelector("button");
  const boxEl = document.querySelector(".box");

  let counter = 1
  btnEl.addEventListener("click", function() {
    // 1.直接修改box的style
    boxEl.style.color = "red";
    boxEl.style.fontSize = "49px";
    boxEl.style.backgroundColor = "blue";

    // 2.添加class
    boxEl.className = "active"  // 它会把之前的box类名给覆盖掉

    // 3.动态的修改box的宽度
    boxEl.style.backgroundColor = "blue";
    boxEl.style.width = `${100 * counter++}px`;
  })
</script>
```

### 2.classList

```html
<button>变换</button>
<div class="box">你好</div>

<script>
  const btnEl = document.querySelector("button");
  const boxEl = document.querySelector(".box");

  btnEl.addEventListener("click", function() {
    // 1.添加class
    boxEl.classList.add("abc");
    boxEl.classList.add("cba");
    // 2.移除某个class
    boxEl.classList.remove("abc");

    // 3.切换状态
    boxEl.classList.toggle("active");
    // 4.检查是否有这个类
    console.log(boxEl.classList.contains("active"));  // boolean值
  })
</script>
```

### 3.style

```html
<div class="box" style="color: red; background-color: blue;font-size: 44px;">123</div>
<script>
  const boxEl = document.querySelector(".box");

  // 1.property小驼峰
  boxEl.style.backgroundColor = "red";

  // 2.property设置为空字符串, 使用默认值
  boxEl.style.backgroundColor = "";

  // 3.设置多个样式
  boxEl.style.backgroundColor = "red";
  boxEl.style.color = "blue";

  boxEl.style.cssText = "font-size: 44px; background-color: red;";  // 这里就不要用驼峰了
  // 不推荐使用

  // 4.获取style
  console.log(boxEl.style.backgroundColor);
  console.log(boxEl.style.color);
  console.log(boxEl.style.fontSize);

  console.log(getComputedStyle(boxEl).backgroundColor);
  console.log(getComputedStyle(boxEl).color);
  console.log(getComputedStyle(boxEl).fontSize);
  // 全局函数getComputedStyle, 局限性很大
</script>
```

### 4.dataset

```html
<div id="abc" class="box" data-age="18" data-height="1.88"></div>
<script>
  const boxEl = document.querySelector(".box");

  console.log(boxEl.dataset.age);  // 18
  console.log(boxEl.dataset.height);  // 1.88
</script>
```

