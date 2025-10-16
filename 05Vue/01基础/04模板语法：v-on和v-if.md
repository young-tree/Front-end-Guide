### 1.v-on的基本使用

```html
<button v-on:click="btnClick">点击</button>
<button @click="btnClick1">点击</button>

<!-- 绑定一个表达式 -->
<button @click="counter++">{{counter}}</button>

<!-- 绑定一个对象（绑定多个事件） -->
<div v-on="{click: btnClick, mousemove: mouseMove}" class="move">鼠标移动</div>
```

### 2.获取event对象

```html
<button @click="btn1">按钮一</button>
<button @click="btn2('young', $event)">按钮二</button>

<script>
  const app = {
    methods: {
      btn1() {
        console.log(event);
      },
      btn2(name, event) {
        console.log(name);
        console.log(event);
      },
    },
  };
  Vue.createApp(app).mount("#app");
</script>
```

### 3.v-on修饰符

```html
<div @click="divClick1" class="div1">1
  <div @click="divClick2" class="div2">2
    <div @click.stop="divClick3" class="div3">3</div>
  </div>
</div>
```

### 4.v-if基本使用

```html
<button @click="toggle">切换</button>
<div v-if="isShow">{{message}}</div>


<h2 v-if="score > 85">优秀</h2>
<h2 v-else-if="score > 75">良好</h2>
<h2 v-else-if="score > 60">及格</h2>
<h2 v-else>不及格</h2>
```

- v-if是惰性的
  - 当条件为false时，整个标签不会被渲染或者会被销毁
  - 当条件为true时，整个标签和内容才会被渲染

### 5.template结合v-if

```html
<div v-if="isShow"><div>哈哈哈哈</div></div>
<div v-else><div>呵呵呵呵</div></div>

<template v-if="isShow"><div>哈哈哈哈</div></template>
<template v-else><div>呵呵呵呵</div></template>
```

### 6.v-show

```html
<div v-if="isShow">你好</div>
<div v-show="isShow">你好</div>
```

- 注意点：

  - v-show不能和template结合使用

  - v-show不能和v-else一起使用

- 本质区别

  - v-show里的内容无论是否需要显示在浏览器上，它的DOM元素都会被渲染，只是通过CSS中的display属性进行切换

  - 当v-if中的条件是false时，它所对应的元素不会渲染在浏览器上

- 开发中如何选择

  - 元素频繁的切换：选择v-show

  - 元素不发生频繁的切换：选择v-if