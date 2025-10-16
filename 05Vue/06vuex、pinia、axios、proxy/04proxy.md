```js
// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://152.136.185.210:5000",
        pathRewrite: {
          "^/api": "",
        },
        secure: false,
        changeOrigin: true,
      },
    },
  }
})
```

```js
// main.js
import axios from "axios"
axios.request({
  url: "/api/login",
  data: {
    name: "coderwhy",
    password: "123456",
  },
  method: "POST"
}).then(res => console.log(res))
```

