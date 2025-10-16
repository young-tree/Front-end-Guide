### 1.props

```js
export default {
  props: {
    title: String,  // String类型
    title: [String, Number],  // String类型或Number类型
    content: {
      type: String,
      type: [String, Number],
      required: true,  // 必传
      default: "123"  // 默认值，必传和默认值选其一
    },
    // 具有默认值的对象
    propA: {
      type: Object,
      // 如果不是函数返回对象，很有可能造成污染
      // 不使用函数, 其他组件更改了对象中的内容, 所有的组件就都被更改了
      default: () => ({message: "hello"})
    },
    // 具有默认值的数组
    propArr: {
      type: Array,
      default: () => []
    },
    // 自定义验证
    propB: {
      validator(value) {
        // value值必须匹配下列值中的一个
        return ["success", "warning", "danger"].includes(value);
      },
    },
    // 具有默认值的函数
    propC: {
      type: Function,
      default() {
        return "Default function";
      },
    },
  }
}
```

- String、Number、Boolean、Array、Object、Date、Function、Symbol

### 2.非props的Attribute

- 没有props接收的属性就是：非props的Attribute
- 情况一：单个根节点，没有禁用Attribute继承（默认）
  - 在根元素上排布一个个属性
- 情况二：单个根节点，禁用Attribute继承
  - 通过$attrs访问所有的属性
- 情况三：多个根节点，禁用Attribute继承
  - 通过$attrs访问所有的属性

### 3.emits

```html
<template>
  <div>
    <button @click="increment">+1</button>
    
    <input type="text" v-model.number="n">
    <button @click="incrementN">+N</button>
  </div>
</template>

<script>
  export default {
    // 目的：为参数进行验证
    emits: {
      add: null,
      addN: (n, name, age) => {
        if(n > 10) return false
        return true
      }
    },
    data() { return { n: 10 } },
    methods: {
      increment() { this.$emit("add") },
      incrementN() { this.$emit("addN", this.n, "young", "18") }
    }
  };
</script>
```

- 一般都是只写一个数组，很少会有这种验证的写法，写emits主要是有一个更好的提示，相当于注册一下
- 写不写其实无所谓的
- 但是$emit必须写，这个才是重点

```html
<template>
  <div>
    <h2>当前计数：{{counter}}</h2>
    <counter-operation @add="addOne" @addN="addNum"/>
  </div>
</template>

<script>
  import CounterOperation from "./CounterOperation.vue"

  export default {
    components: { CounterOperation },
    data() { return { counter: 0 } },
    methods: {
    	addOne() { this.counter++ },
      addNum(n, name, age) { this.counter += n }
    }
  };
</script>
```

