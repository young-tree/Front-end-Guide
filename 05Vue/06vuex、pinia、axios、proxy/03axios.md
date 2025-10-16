### 1.常见请求

- npm install axios

```js
import axios from 'axios'

axios.request({
  url: "http://123.207.32.32:8000/home/multidata",
  method: "get"
}).then(res => console.log(res.data))
// 这里拿到的res并不是服务器返回的数据, 服务器返回的数据被包裹在一个data属性中
// 除此之外res中还有好多字段, 这些字段都是axios自己加的

// get请求携带参数
axios.get(`http://123.207.32.32:9001/lyric?id=500665346`).then(res => {
  console.log(res.data.lrc)
})

axios.get("http://123.207.32.32:9001/lyric", {
  params: { id: 500665346 }
}).then(res => console.log(res.data.lrc))

// post请求携带参数
axios.post("http://123.207.32.32:1888/02_param/postjson", {
  name: "coderwhy",
  password: 123456
}).then(res => console.log(res.data))

axios.post("http://123.207.32.32:1888/02_param/postjson", {
  data: {
    name: "coderwhy",
    password: 123456
  }
}).then(res => console.log(res.data))
```

### 2.额外知识

```js
import axios from 'axios'

// 1.baseURL
const baseURL = "http://123.207.32.32:8000"

// 给axios实例配置公共的基础配置
axios.defaults.baseURL = baseURL
axios.defaults.timeout = 10000
axios.defaults.headers = {}

// 1.1.get: /home/multidata
axios.get("/home/multidata").then(res => console.log(res.data))
// 由于我们已经设置了baseURL所以这里就可以不用写了
// 其实这里通过axios引入的axios就是一个axios实例

// 2.axios同时发送多个请求
axios.all([
  axios.get("/home/multidata"),
  axios.get("http://123.207.32.32:9001/lyric?id=500665346")
]).then(res => console.log(res))
```

### 3.创建axios实例

```js
import axios from 'axios'

// axios库提供给我们axios就是一个实例对象
axios.get("http://123.207.32.32:9001/lyric?id=500665346")

// 创建其他的实例对象并发送网络请求
const instance1 = axios.create({
  baseURL: "http://123.207.32.32:9001",
  timeout: 6000,
  headers: {}
})

instance1.get("/lyric", {
  params: { id: 500665346 }
}).then(res => console.log(res.data))

// 创建第二个axios实例
const instance2 = axios.create({
  baseURL: "http://123.207.32.32:8000",
  timeout: 10000,
  headers: {}
})
```

### 4.拦截器

```js
import axios from 'axios'

// 对实例配置拦截器
axios.interceptors.request.use((config) => {
  console.log("在发送网络请求之前做一些动作")
  
  // 请求拦截的作用:
  // 1.开始loading的动画
  // 2.对原来的配置进行一些修改
  	// 2.1. header
  	// 2.2. 认证登录: 携带token/cookie
  	// 2.3. 请求参数进行某些转化
  return config
}, (err) => {
  console.log("请求失败的拦截")
  return err
})

axios.interceptors.response.use((res) => {
  console.log("在最终传回去数据之前做一些处理, 再把数据返回给真正的请求")
	
  // 响应拦截的作用:
  // 1.结束loading的动画
  // 2.对数据进行转化, 再返回数据, 这里就是去取服务器返回的真实数据
  return res.data
}, (err) => {
  console.log("响应失败的拦截:", err)
  return err
})

axios.get("http://123.207.32.32:9001/lyric?id=500665346").then(res => {
  console.log("res:", res)  // 这里就可以拿到服务器返回的真实数据
}).catch(err => {
  console.log("err:", err)
})
```

### 5.封装

```js
import axios from "axios"

class YTRequest {
  constructor(baseURL, timeout = 5000, headers = {}) {
    this.instance = axios.create({
      baseURL,
      timeout,
      headers
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => resolve(res)).catch(err => reject(err))
    })
  }

  get(config) {
    return this.request({...config, method: "GET"})
  }

  post(config) {
    return this.request({...config, method: "post"})
  }
}

export default (baseURL, timeout, headers) => new YTRequest(baseURL, timeout, headers)
```

```js
import useAxios from "./service/axios"

const axios = useAxios("http://123.207.32.32:9001", 6000, {})

axios.request({
  url: "/lyric",
  params: {
    id: 500665346
  }
}).then(res => console.log(res.data))

axios.request({
  url: "http://123.207.32.32:1888/02_param/postjson",  // 这样写可以覆盖掉之前设置的baseURL
  method: "POST"
  data: {
    name: "yt",
    age: 22,
  }
}).then(res => console.log(res.data))

axios.post({
  url: "http://123.207.32.32:1888/02_param/postjson",
  data: {
    name: "yt",
    age: 22,
  }
}).then(res => console.log(res.data))

// 创建新的axios实例
const axios2 = useAxios("http://123.207.32.32:1888", 4000, {})

axios2.post({
  url: "/02_param/postjson",
  data: {
    name: "yt",
    age: 22,
  }
}).then(res => console.log(res.data))
```

