### 1.provide和inject

- 对象写法

  ```js
  provide: {
    name: "youngtree",
    age: 21
  }
  ```

- 函数写法

  ```js
  provide() {
    return {
      name: "youngtree",
      age: 21,
      length: this.names.length
    }
  }
  ```

- 处理响应式

  ```js
  import { computed } from "vue";
  
  export default {
    provide() {
      return {
        name: "youngtree",
        age: 21,
        length: computed(() => this.names.length)
      }
    }
  }
  ```

- inject

  ```js
  export default { inject: ["name", "age", "length"] }
  ```

### 2.event-bus

- npm install hy-event-bus

- 创建eventBus实例对象

  ```js
  import { HYEventBus } from "hy-event-store"
  
  export default new HYEventBus()
  ```

- 发出一个事件

  ```html
  <!-- 孙 -->
  <template>
    <div class="HomeBanners">
      <button @click="outEvent">在HomeBanners中发出一个事件</button>
    </div>
  </template>
  
  <script>
  import eventBus from "../../utils/event-bus"
  
  export default {
    methods: {
      outEvent() {
        eventBus.emit("HomeBannersBtnClick", "yt", 22)
      }
    },
    unmounted() {
      console.log("unmounted")
      eventBus.off("HomeBannersBtnClick")
    }
  }
  </script>
  ```

- 监听一个发出的事件

  ```html
  <!-- 爷 -->
  <template>
    <div class="App">
      <Home/>
    </div>
  </template>
  
  <script>
  import eventBus from "./utils/event-bus"
  
  import Home from "./components/Home.vue"
  
  export default {
    components: {
      Home
    },
    created() {
      eventBus.on("HomeBannersBtnClick", (name, age) => {
        console.log("监听到HomeBanners发出的事件", name, age)
      })
    }
  }
  </script>
  ```


### 3.Mixin

```js
// 在js文件中默认导出一个对象
export default {
  data() {
    return {
      message: "Hello World"
    }
  },
  created() {
    console.log("message:", this.message)
  }
}
```

```js
// 局部混入
import { demoMixin } from "./mixins/01demoMixin"

export default {
  mixins: [demoMixin]
};
```

```js
// 全局混入
import { createApp } from 'vue';
import { demoMixin } from "./mixins/01demoMixin"

const app = createApp(App);
app.mixin(demoMixin);
app.mount('#app');
```

- 合并规则
  - 情况一：与data函数的返回值发生冲突

    - 没有冲突就进行合并
    - 有冲突以组件中的值为准

  - 情况二：与生命周期函数发生冲突

    - 与组件中的生命周期合并到一个数组中，到了相应的时机遍历整个数组，再进行调用

  - 情况三：与对象类型发生冲突：比如methods、computed、components、watch、directives等

    - 对象中的属性没有冲突就合并
    - 对象中的属性发生了冲突以组件的对象中的属性为基准