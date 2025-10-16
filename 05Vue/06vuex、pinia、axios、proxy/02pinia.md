### 1.安装创建使用

- npm install pinia

- main.js

  ```js
  import { createApp } from 'vue'
  import App from './App.vue'
  
  import { createPinia } from "pinia"
  
  createApp(App).use(createPinia()).mount('#app')
  ```

- 定义store

  ```js
  import { defineStore } from "pinia"
  
  export const useMainStore = defineStore("main", {
    state: () => ({
      counter: 100
    }),
    getters: {
      doubleCounter: state => state.counter * 2,
      doubleCounterPlusOne() {
        return this.doubleCounter + 1
      }
    },
    actions: {
      increment() {
        setTimeout(() => this.counter++, 2000)
      }
    }
  })
  ```

- 拿到store并进行使用

  ```html
  <script setup>
  import { computed } from "vue"
  import { useMainStore } from "./pinia/store"
  
  import Home from "./views/Home.vue"
  
  const mainStore = useMainStore();
    
  const doubleCounterPlusTwo = computed(() => mainStore.doubleCounter + 2)
  
  const addCounter = () => mainStore.counter++
  const addCounterAsync = () => mainStore.increment()
  </script>
  
  <template>
    <div class="app">
      <div>{{mainStore.counter}}</div>
      <div>{{mainStore.doubleCounter}}</div>
      <div>{{mainStore.doubleCounterPlusOne}}</div>
      <div>{{doubleCounterPlusTwo}}</div>
      <button @click="addCounter">直接修改state：+1</button>
      <button @click="addCounterAsync">异步加一</button>
    </div>
  </template>
  ```

### 2.state的额外补充

```js
import useUser from '@/stores/user'
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const { name, age, level } = storeToRefs(mainStore) // 解构后依然是响应式的

function changeState() {
  // 1.一个个修改状态
  mainStore.name = "kobe"
  mainStore.age = 20
  mainStore.level = 200

  // 2.一次性修改多个状态
  mainStore.$patch({
    name: "james",
    age: 35
  })

  // 3.替换state为新的对象
  mainStore.$state = {
    name: "curry",
    level: 200
  }
}

function resetState() {
  // 重置state, 让state进行初始化
  userStore.$reset()
}
```

### 3.getters的额外补充

- 除了第一部分的可以拿到state和其他getter函数外，还可以有以下操作

  - 返回一个函数，这样就可以传递参数了

  - 访问其他store中的数据或者getter函数

    ```js
    import { defineStore } from 'pinia'
    import useUser from './user'
    
    const useCounter = defineStore("counter", {
      getters: {
        showMessage(state) {
          const userStore = useUser()
          return `name: ${ userStore.name }，count: ${ state.count }`
        }
      }
    })
    ```

- 每个函数都可以通过this获取整个store实例

### 4.actions的额外补充

- 在action中可以通过this访问整个store实例的所有操作

```js
import { defineStore } from 'pinia'

const useHome = defineStore("home", {
  state: () => ({
    banners: [],
    recommends: []
  }),
  actions: {
    async fetchHomeMultidata() {
      const res = await fetch("http://123.207.32.32:8000/home/multidata")
      const data = await res.json()

      this.banners = data.data.banner.list
      this.recommends = data.data.recommend.list
    }
  }
})
```

```html
<template>
  <div class="home">
    <h2>轮播的数据</h2>
    <ul>
      <template v-for="item in homeStore.banners">
        <li>{{ item.title }}</li>
      </template>
    </ul>
  </div>
</template>

<script setup>
  import useHome from '@/stores/home';

  const homeStore = useHome()
  homeStore.fetchHomeMultidata().then(res => {
    console.log("fetchHomeMultidata的action已经完成")
  })
</script>
```

### 5.思考

- Pinia本质上依然是一个状态管理库，用于跨组件、跨页面进行状态共享（和Vuex、Redux的作用相同）
- 和Vuex相比，Pinia有很多的优势：
  - 比如mutations 不再存在：
    - 他们经常被认为是非常冗长的
    - 他们最初带来了 devtools 集成，但这已不再是问题
  - 更友好的TypeScript支持：
    - Vuex对TS的支持很不友好
  - 不再有modules的嵌套结构：
    - 你可以灵活的使用每一个store，它们是通过扁平化的方式来相互使用的
    - 也不再有命名空间的概念，不需要记住它们的复杂关系和复杂操作
    - 可以在任何位置使用任意数量的store，这样做变得更加灵活
    - 每一个store都交给一个hook，想用的时候就调用这个hook即可，这种思想太棒了