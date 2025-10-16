### 1.插槽基础

```html
<!-- 子 -->
<template> <div> <slot></slot> </div> </template>
```

```html
<!-- 父 -->
<template>
  <div>
    <my-slot> <button>按钮</button> </my-slot>
    <my-slot>普通文本</my-slot>
    <my-slot> <my-button /> </my-slot>
  </div>
</template>

<script>
  import MySlot from "./MySlot.vue"
  import MyButton from "./MyButton.vue"

  export default { components: { MySlot, MyButton } }
</script>
```

```html
<!-- 子：默认内容 -->
<div> <slot> <i>你好啊</i> </slot> </div>
```

### 2.具名插槽

```html
<!-- 父 -->
<template>
  <div>
    <my-slot>
      <!-- 具名插槽 -->
      <template v-slot:left> <button>按钮</button> </template>
      <!-- 动态具名插槽 -->
      <template v-slot:[name]> <div>123</div> </template>
      <!-- 语法糖 -->
      <template #right> <i>哈哈哈</i> </template>
    </my-slot>
  </div>
</template>

<script>
  import MySlot from "./MySlot.vue"
  export default {
    components: { MySlot },
    data: { name: "center" }
  }
</script>
```

```html
<!-- 子 -->
<div class="nav-bar">
  <!-- 没有指定名字, 默认是default -->
  <slot name="left"></slot>
  <slot name="center"></slot>
  <slot name="right"></slot>   
</div>
```

### 3.作用域插槽

```html
<!-- 父 -->
<template>
  <div>
    <child-cpn :names="names">
      <template v-slot="slotProps">
        <button>{{slotProps.item}}</button>
      </template>
    </child-cpn>
    
    <!-- 独占默认插槽 -->
    <child-cpn :names="names" v-slot="slotProps">
      <button>{{slotProps.item}}</button>
    </child-cpn>
  </div>
</template>

<script>
  import ChildCpn from "./ChildCpn.vue";

  export default {
    components: { ChildCpn },
    data() { return { names: ["赵云", "张飞", "李小龙"] } }
  };
</script>
```

```html
<!-- 子 -->
<template>
  <div>
    <template v-for="item in names" :key="item">
      <slot :item="item"></slot>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      names: Array,
      default: () => []
    }
  };
</script>
```

### 4.作用域具名插槽

```html
<!-- 父 -->
<div>
  <child-cpn :names="names">
    <!-- 既有具名又有默认, 是不能使用独占默认插槽的, 要写全 -->
    <template v-slot="slotProps">
      <button>{{slotProps.item}}</button>
    </template>

    <template v-slot:young="slotProps">
      <strong>{{slotProps.item}}</strong>
    </template>
  </child-cpn>
</div>
```

```html
<!-- 子 -->
<div>
  <template v-for="item in names" :key="item">
    <slot :item="item"></slot>
    <slot :item="item" name="young"></slot>
  </template>
</div>
```

