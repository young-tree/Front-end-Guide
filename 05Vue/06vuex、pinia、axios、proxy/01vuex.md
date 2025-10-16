### 1.安装创建使用

- npm install vuex

- 创建vuex的仓库(store)

  ```js
  import { createStore } from "vuex"
  
  export default createStore({
    state() { return { counter: 100 } },
    mutations: {
      increment(state) { state.counter++ },
      decrement(state) { state.counter-- }
    },
    actions: {
      incrementAction(context) { setTimeout(() => context.commit("increment"), 2000) },
      decrementAction({commit}) { setTimeout(() => commit("decrement"), 2000) }
    }
  })
  ```

- 安装仓库(store)

  ```js
  import App from './App.vue'
  import store from "../store/store"
  createApp(App).use(store).mount('#app')
  ```

- 组件中使用

  ```html
  <template>
    <div>
      <div>{{counter}}</div>
      <button @click="increment">+1</button>
      <button @click="decrement">-1</button>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue"
  import { useStore } from "vuex"
  const {state, dispatch} = useStore()
  
  const counter = computed(() => state.counter)
  
  const increment = () => dispatch("incrementAction")
  const decrement = () => dispatch("decrementAction")
  </script>
  ```

### 2.vuex的特点和原则

- 特点1：Vuex的状态存储是响应式的
  - 当Vue组件从store中读取状态时，若store中的状态发生了变化，那么组件也会被更新
- 原则：不能直接改变store中的状态
  - 改变store中的状态的唯一途径就显示提交 (commit) mutation
  - 这样可以方便跟踪每一个状态的变化，能够通过一些工具帮助我们更好的管理应用的状态
- 特点2: 单一状态树
  - 用一个对象包含全部应用层级的状态
  - 优势
    - 假如你的状态信息是保存在多个Store对象中的，那么之后的管理和维护会变得非常困难
    - 单一状态树能够以最直接的方式找到某个状态的片段
    - 在之后的维护和调试过程中，可以非常方便的管理和维护状态

### 3.state

```html
<template>
  <div><div>{{counter}}</div></div>
</template>

<script setup>
import { computed, toRefs } from "vue"
import { useStore } from "vuex"
const {state} = useStore()

const counter = computed(() => state.counter)  // 可以实现响应式
const { counter } = toRefs(state)  // 也可以实现响应式
</script>
```

```html
<template>
  <div><div>{{store.state.counter}}</div></div>
</template>

<script setup>
import { useStore } from "vuex"
const store = useStore()  // 注意: 这样直接使用本来就是响应式的
</script>
```

### 4.getters

- getters属性的值是一个对象，对象中是一个个函数
- 每一个函数都类似于computed的作用，我们只需要拿到这个函数，不调用，就可以使用它所返回的值
- 每个getter函数都可以返回一个函数
  - 当我们调用某一个getter函数时
  - 其实是在调用getter函数返回的那个函数
- getters中的函数除了有第一个参数state外还有第二个参数getters
  - 通过这个参数可以拿到其他的getter函数
  - 可以在当前getter函数中使用其他的getter函数

### 5.mutations

- mutations中的函数类似于methods中的函数，专门用来改变state中的值
- mutations中的函数都会有两个参数
  - 第一个参数是state，用于拿到state修改里面的值
  - 第二个参数是我们commit某个mutation函数的名字时，传过来的值，一般用payload来接收
- 原则：mutations中的函数必须是同步函数
  - 这是因为devtool工具会记录mutation函数的日记
  - 每一个mutation函数被提交，devtools都会捕捉前一状态和后一状态的快照
  - 但是在mutation函数中执行异步操作，就无法追踪到数据的变化

### 6.actions

- 特点
  1. action函数提交的是mutation，而不是直接变更状态
  2. action函数可以包含任意异步操作
- 第一个参数：context
  - context是一个和store实例均有相同方法和属性的context对象
  - 通过context.commit方法提交一个mutation
  - 或者通过 context.state 和 context.getters 属性获取 state 和 getters

- 第二个参数：payload，当dispatch当前action函数时，传递过来的参数

- 发送网络请求（异步操作）

  ```js
  // 在组件中派发
  import { useStore } from 'vuex'
  const store = useStore()
  
  // 告诉Vuex发起网络请求
  store.dispatch("fetchHomeMultidataAction").then(res => console.log("结束"))
  // 当action函数返回一个promise时，就可以知道当前action函数在什么时候执行完毕了
  ```

  ```js
  // vuex中的action函数
  async fetchHomeMultidataAction(context) {
    const res = await fetch("http://123.207.32.32:8000/home/multidata")
    const data = await res.json()
    
    context.commit("changeBanners", data.data.banner.list)
    context.commit("changeRecommends", data.data.recommend.list)
  }
  // async函数天生返回一个promise对象
  ```

### 7.modules

- 为什么会出现modules

  - 单一状态树会使得当前应用的所有状态集中到一个比较大的对象中
  - 当应用变得非常复杂时，store 对象就有可能变得相当臃肿
  - 为了解决这个问题，Vuex 允许将 store 分割成一个个模块（module）
  - 每个模块拥有自己的 state、mutation、action、getter、甚至还可以嵌套子模块

- 基本使用

  ```js
  export default {
    state: () => ({
      count: 99
    }),
    getters: {
      doubleCount(state, getters, rootState) {
        return state.count + rootState.counter
      }
    },
    mutations: {
      incrementCount(state) {
        state.count++
      }
    },
    actions: {
      incrementCountAction(context) {
        context.commit("incrementCount")
      }
    }
  }
  ```

  ```js
  // 在主模块注册home子模块
  import { createStore } from "vuex"
  import home from "./modules/home"
  
  export default createStore({
    modules: { home }
  })
  ```

  ```html
  <!-- 在模板中使用模块中的state -->
  <div>{{$store.state.home.count}}</div>
  <!-- 在模板中使用模块中的getter函数 -->
  <div>{{$store.getters.doubleCount}}</div>
  ```

  ```js
  // 在js中使用dispatch和commit
  import { useStore } from 'vuex'
  const store = useStore()
  
  // 派发事件时, 默认是不需要跟模块名称
  // 提交mutation时, 默认也是不需要跟模块名称
  function incrementCount() {
    store.dispatch("incrementCountAction")
  }
  ```

- 启用命名空间

  ```js
  export default {
    namespaced: true
  }
  ```

  ```html
  <!-- 在模板中使用模块中的state -->
  <div>{{$store.state.home.count}}</div>
  <!-- 在模板中使用模块中的getter函数 -->
  <div>{{$store.getters["home/doubleCount"]}}</div>
  ```

  ```js
  // 派发事件和提交mutation, 都需要跟模块名称
  function incrementCount() {
    store.dispatch("home/incrementCountAction")
  }
  ```

  