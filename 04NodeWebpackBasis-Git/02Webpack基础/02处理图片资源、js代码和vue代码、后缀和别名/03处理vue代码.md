### 1.编写vue代码

```vue
<template>
  <div>
    <h2 class="title_vue">{{title}}</h2>
    <p class="content_vue">我是内容, 哈哈哈哈哈哈哈哈</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "我是Vue的标题"
      }
    }
  }
</script>

<style>
  .title_vue {
    color: green;
    font-size: 100px;
  }

  .content_vue {
    color: yellow;
    font-size: 30px;
  }
</style>
```

### 2.安装

- npm install vue
- npm install vue-loader -D

### 3.配置

```js
const { VueLoaderPlugin } = require("vue-loader/dist/index");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.vue$/i,
        loader: "vue-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

- 对于css的loader是必须有的
- 插件也是必须有的
- 不建议这里的正则后面写g，因为很可能会返回一个数组，建议只写i
- 这里对于vue的正则写g会报错

### 4.疑惑

- 课堂上要求安装 @vue/compiler-sfc 这个包
- 但是不安装好像也没问题
- 这是因为vue-loader内置了

### 5.main.js

```js
import { createApp } from 'vue'
import Hello from './vue_demo/Hello.vue'

createApp(Hello).mount("#app")
```

