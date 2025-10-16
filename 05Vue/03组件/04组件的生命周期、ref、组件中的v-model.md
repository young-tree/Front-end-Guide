### 1.生命周期函数

```js
export default {
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    // 组件实例被创建完毕
    // 这里可以访问data中的数据
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    // 组件被挂载完毕，由虚拟DOM渲染为真实DOM完毕
    // 这里可以访问DOM对象
    console.log("mounted");
  },
  beforeUnmount() {
    console.log("beforeUnmount");
  },
  unmounted() {
    console.log("unmounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  activated() {
    // 进入缓存过的动态组件
    console.log("activated")
  },
  deactivated() {
    // 离开需要缓存的动态组件
    console.log("deactivated")
  }
}
```

### 2.ref

```html
<template>
  <div>
    <!-- 1.绑定到元素上 -->
    <h2 ref="title">哈哈哈</h2>

    <!-- 2.绑定到组件上 -->
    <nav-bar ref="NavBar"></nav-bar>
    
    <button @click="btnTitle">获取元素</button>
  </div>
</template>

<script>
  export default {
    methods: {
      btnTitle() {
        console.log(this.$refs.title);
        
        // 如果是单个根拿到的是代理对象, 如果是多个根拿到的是第一个节点
        console.log(this.$refs.NavBar);
        this.$refs.NavBar.sayHello();  // 调用组件中的方法
        
        console.log(this.$parent);  // 如果当前组件就是根组件, 打印null
        console.log(this.$root);  // 如果当前组件就是根组件, 打印当前组件的代理对象
      },
    },
  };
</script>
```

### 3.组件中的v-model

```html
<template>
  <div>
    <Message v-model="message"></Message>
    <Message :modelValue="message" 
             @update:modelValue="message = $event">
    </Message>
  </div>
</template>
```

```html
<template>
  <div>
    <button @click="btnClick">按钮</button>
    <h2>Message中：{{ modelValue }}</h2>
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: {
        type: String,
        default: ""
      }
    },
    emits: ["update:modelValue"],
    methods: {
      btnClick() {
        this.$emit("update:modelValue", "张三")
      }
    }
  }
</script>
```

### 4.子组件的简写

```html
<template>
  <div>
    <input type="text" v-model="value">
    <input type="text" :value="value" @input="value = $event.target.value">
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: {
        type: String
      }
    },
    emits: ["update:modelValue"],
    computed: {
      value: {
        set(setValue) {
          this.$emit("update:modelValue", setValue);
        },
        get() {
          return this.modelValue;
        },
      }
    }
  }
</script>
```

### 5.绑定多个v-model

```html
<Message v-model="message" v-model:title="title"></Message>
```

```html
<input type="text" v-model="value">
<input type="text" v-model="changeTitle">

<script>
  export default {
    props: {
      modelValue: {
        type: String
      },
      title: {
        type: String
      }
    },
    emits: ["update:modelValue", "update:title"],
    computed: {
      value: {
        set(setValue) {
          this.$emit("update:modelValue", setValue);
        },
        get() {
          return this.modelValue;
        },
      },
      changeTitle: {
        set(setValue) {
          this.$emit("update:title", setValue);
        },
        get() {
          return this.title;
        },
      }
    },
  }
</script>
```

