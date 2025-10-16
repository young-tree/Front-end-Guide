### 91.EventTarget中的方法

```html
<div>123</div>
<script>
  // addEventListener: 注册事件(监听事件)
  const divEl = document.querySelector("div");
  function add$remove() {
    console.log("为div添加移除点击事件~")
  }
  divEl.addEventListener("click", add$remove);

  // removeEventlistener: 移除事件
  divEl.removeEventListener("click", add$remove);  // 注意要移除同一个函数

  // dispatchEvent: 派发事件
  // 当我点击div时, 派发yt事件
  divEl.addEventListener("click", () => {
    window.dispatchEvent(new Event("yt"));
  });
  window.addEventListener("yt", () => {
    console.log("监听到yt事件");
  });
</script>
```

### 2.target和排他思想

```html
<style>
  .active {
    color: red;
  }
</style>

<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
<script>
  const ulEl = document.querySelector("ul");

  let activeEl = null;
  ulEl.addEventListener("click", (event) => {
    // if (activeEl) {
    //   activeEl.classList.remove("active");
    // }
    if (event.target === ulEl) return
    activeEl && activeEl.classList.remove("active");
    // 改进：activeEl?.classList.remove("active");
    event.target.classList.add("active");
    activeEl = event.target;
  });
</script>
```

### 3.target和dataset

```html
<div class="box">
  <button data-btn="btn1">按钮1</button>
  <button data-btn="btn2">按钮2</button>
  <button data-btn="btn3">按钮3</button>
</div>

<script>
  const boxEl = document.querySelector(".box");

  boxEl.addEventListener("click", (event) => {
    switch (event.target.dataset.btn) {
      case "btn1":
        console.log("按钮1被点击~");
        break;
      case "btn2":
        console.log("按钮2被点击~");
        break;
      case "btn3":
        console.log("按钮3被点击~");
        break;
      default:
        console.log("点击了其他~");
    }
  });
</script>
```

