### 1.setup函数的参数

- props：父组件传递过来的属性

  - 在组件中必须要写props选项，要不然在setup函数中拿不到props

- context：包含三个属性（attrs，slots，emit）

  - attrs：非props的attribute
  - slots：父组件传递过来的插槽
  - emit：组件内部发出事件

### 2.setup函数返回值的作用

- 在模板template中使用
- 替代data选项
- 返回执行函数代替methods中的方法
- 返回由computed函数包裹的计算属性

### 3.reactive

- 传入reactive函数中的数据类型必须是对象或数组（复杂数据类型）
- 应用场景
  - 固定的值（本地）
  - 值与值之间是有联系的，比如账号和密码
  - 较少使用，甚至是很少使用，一般都用ref

### 4.ref

- 内部的值是在ref的value属性中被维护的
- 在setup函数内部，它是一个ref引用，在操作时要使用counter.value的方式获取值
- 在模板中引入ref的值时，vue会自动进行解包操作，不需要在模板中通过counter.value的方式获取到值

### 5.readonly

- readonly会返回原生对象的只读代理


- 它依然是一个proxy，但是这个proxy的set方法被劫持了，修改不可变的值会报警告
- 假如你把一个ref包裹的东西用readonly进行了包裹，你改了ref中的值，readonly中的值也会进行更改

- 单项数据流原则
  - 我们为子组件传递一个被ref包裹的值，如果直接传递过去了，子组件是可以直接修改这个值的
  - 子组件的操作导致父组件的值被改了，这违背了单项数据流原则
  - 需要把被ref包裹的对象再用readonly包裹一遍
  - 被readonly包裹的值是不允许被修改的，需要子组件发射事件，父组件接收事件，自己进行更改

### 6.reactive方面的补充

- isProxy、isReactive、isReadonly
  - 检查对象是否是由 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 或 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 创建的 proxy对象
- toRaw、markRaw
  - 返回 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 或 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 代理的原始对象
  - 标记一个对象，使其永远不会转换为 proxy，返回对象本身
- shallowReactive、shallowReadonly
  - 转化为浅层响应
  - 被reactive包裹的对象，如果你改了它的深层的值，也是会响应的，被其包裹后再改深层的值就不响应了

### 7.ref方面的补充

- unref、isRef
  - 如果参数是一个 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)，则返回内部值，否则返回参数本身
  - 这是 `val = isRef(val) ? val.value : val` 的语法糖函数。
- toRef、toRefs
  - 为什么解构一个被reactive包裹的对象，解构出来的值不再是响应式的？
  - 因为reactive最终是通过Proxy对象实现响应式
  - 如果你对一个Proxy对象进行解构，会发现解构出来的东西是单纯的值，也就是说它跳过了Proxy的监听
  - toRef和toRefs的作用就是把解构出来的值用ref进行包裹，继而让解构出来的值变成了响应式的
- customRef、shallowRef、triggerRef
  - 不懂、不说、不知道

### 8.setup函数中的this

- 之所以在setup函数中不能使用this是因为它没有显示的绑定到代理对象上

### 9.通过ref获取元素或者组件

```html
<template>
  <div>
    <h2 ref="titleRef">123</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
const titleRef = ref()
onMounted(() => console.log(titleRef.value)
</script>
```

- 这里需要通过value获取到值，是因为获取到的是一个ref对象，需要通过value获取值，不是元素中的value
- 这里还要在onMounted生命周期中获取元素
  - 因为setup的执行时机是在beforeCreate和created之前，元素还没挂载
  - 而且想要在beforeCreate和created中做的事情，可以直接在setup函数中做