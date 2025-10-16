### 1.获取任意某个元素

```html
<div id="abc">123</div>
<div class="cba">456</div>
<p>999</p>

<script>
  const abc = document.querySelector("#abc");
  const abc1 = document.getElementById("abc");
  console.log(abc, abc1);

  const cba = document.querySelector(".cba");
  const cba1 = document.getElementsByClassName("cba")[0];
  console.log(cba, cba1);

  const p = document.querySelector("p");
  const div = document.querySelectorAll("div");
  console.log(p, div);
</script>
```

- 常用querySelector和querySelectorAll
- 而且这两个方法可以应用在元素上

### 2.节点常见属性

```html
<body>
  <!-- 注释 -->
  文本

  <div class="box">
    哈哈哈
    <p>123</p>
  </div>
  <script>
    const bodyChildNodes = document.body.childNodes;
    const commontNode = bodyChildNodes[1];
    const textNode = bodyChildNodes[2];
    const divNode = bodyChildNodes[3];

    // 1.nodeType：节点的类型
    console.log(commontNode.nodeType);  // 8
    console.log(textNode.nodeType);  // 3
    console.log(divNode.nodeType);  // 1

    // 2.nodeName：节点的名称
    console.log(commontNode.nodeName);  // #comment
    console.log(textNode.nodeName);  // #text
    console.log(divNode.nodeName);  // DIV

    // 3.tagName：元素的名称
    console.log(commontNode.tagName);  // undefined
    console.log(textNode.tagName);  // undefined
    console.log(divNode.tagName);  // DIV

    // 4.data：获取非元素的节点数据
    console.log(commontNode.data); // 注释 
    console.log(textNode.data);
    console.log(divNode.data);  // undefined

    // 获取元素的子节点
    // 5.innerHTML：获取标签内部的所有子节点，连同标签一起获取到
    console.log(divNode.innerHTML);
    // 6.textContent：获取标签内部的所有子节点，只获取内容不获取标签
    console.log(divNode.textContent);

    // 设置元素的子节点
    // 7.解析标签
    divNode.innerHTML = "<span>123</span>";
    // 8.不解析标签, 直接展示
    divNode.textContent = "<span>123</span>";

    // 9.outerHTML：获取自己，也就是box，字符串类型
    console.log(divNode.outerHTML)
  </script>
</body>
```

### 3.全局属性hidden

```html
<button class="btn">切换</button>
<div class="box">123</div>

<script>
  const btn = document.querySelector(".btn");
  const box = document.querySelector(".box");
  btn.onclick = function() {
    box.hidden = !box.hidden;
  }
</script>
```

### 4.attribute的分类和操作

```html
<!-- HTML制定的attribute，称之为标准attribute -->
<!-- 自己定义的attribute，称之为非标准attribute -->
<div id="nba" class="abc"></div>
<div age="18" height="1.88"></div>

<input type="checkbox" checked>

<script>
  const divEls = document.querySelectorAll("div");

  console.log(divEls[0].hasAttribute("id"));  // true
  console.log(divEls[0].hasAttribute("class"));  // true
  console.log(divEls[1].hasAttribute("age"));  // true
  console.log(divEls[1].hasAttribute("height"));  // true
  console.log(divEls[0].getAttribute("id"));  // nba
  console.log(divEls[0].getAttribute("class"));  // abc
  console.log(divEls[1].getAttribute("age"));  // 18
  console.log(divEls[1].getAttribute("height"));  // 1.88

  divEls[0].setAttribute("id", "aaa");  // 修改标准属性的值
  divEls[1].setAttribute("age", "aaa");  // 修改非标准属性的值
  divEls[1].setAttribute("agee", "aaa");  // 增加非标准属性

  divEls[0].removeAttribute("id");  // 移除标准属性
  divEls[1].removeAttribute("agee");  // 移除非标准属性

  const divEl1 = divEls[1].attributes;
  for (const item of divEl1) {
    console.log(item);  // age="aaa"
    console.log(item.name);  // age
    console.log(item.value);  // aaa
  }

  // getAttribute存在的问题
  const input = document.querySelector("input");
  console.log(input.getAttribute("checked"));  // 空字符串
  console.log(input.checked);  // true
</script>
```

### 5.property的分类和操作

```html
<!-- 标准的attribute都有对应的property -->
<div id="nba" class="abc"></div>
<div age="18" height="1.88"></div>

<input type="checkbox" checked>
<script>
  // 对象中的属性称之为property
  const obj = {
    name: 'yt'
  }
  // 这里的name就称之为property

  // 1.通过property获取attribute的值
  const divEls = document.querySelectorAll("div");

  console.log(divEls[0].id);  // nba
  console.log(divEls[0].className);  // 要写className, 不要写class abc
  console.log(divEls[1].age);  // undefined
  console.log(divEls[1].height);  // undefined

  const input = document.querySelector("input");
  if (input.checked) {
    console.log("checkbox处于选中状态")
  }

  // 2.attribute和property是相互影响的
  divEls[0].id = "aaa";
  console.log(divEls[0].getAttribute("id"));  // aaa

  divEls[0].setAttribute("id", "ccc");
  console.log(divEls[0].id);  // ccc
</script>
```

