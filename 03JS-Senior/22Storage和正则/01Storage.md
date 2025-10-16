### 1.Cookie的使用场景

- Cookie一般由服务器来设置
- 当我们通过账号密码登录某个网站时, 服务器会校验我们输入的账号密码是否正确
- 如果账号密码正确, 服务器会自己为当前的网站设置一个cookie
- 假如我们输入完账号密码后进入个人主页, 那么需要携带这个cookie向服务器发送请求, 获取个人信息

### 2.代替cookie的方案

- 目前较好的方案是设置token
- 我们输入账号密码然后经过服务器校验, 校验后自动生成一个token, 这个token是根据算法生成
- 在这之后会把这个token返回给前端页面, 前端页面把这个token存储在本地
- 当我们要请求一些个人信息或者其他信息时需要携带这个token向服务器发送请求, 进而获取信息
- 举例
  - 这就特别像我们租房子
  - 向房东提交金钱获得钥匙
  - 钥匙存储在自己身上
  - 想进入房间就需要使用钥匙

### 3.local和session的区别

- 关闭网页后
  - localStorage所存储的东西依然存在
  - sessionStorage所存储的东西消失
- 跳转页面(a标签的target属性使用默认值)
  - localStorage所存储的东西依然存在
  - sessionStorage所存储的也依然存在

- 跳转到一个新的页面(a标签的target属性使用_blank)
  - localStorage所存储的东西依然存在
  - sessionStorage所存储的东西消失

### 4.属性和方法

- localStorage.length
  - 获取设置了多少个Storage
- localStorage.setItem(key, value)
  - 设置Storage键和值
- localStorage.getItem(key)
  - 获取Storage键的值
- localStorage.key(index)
  - 获取某个索引的键
- localStorage.removeItem(key)
  - 删除某一个存储
- localStorage.clear()
  - 清空所有的存储

### 5.Storage工具封装

```js
class StorageCache {
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage: sessionStorage
  }

  setCache(key, value) {
    this.storage.setItem(key, JSON.stringify(value))
  }
  getCache(key) {
    return JSON.parse(this.storage.getItem(key))
  }
  removeCache(key) {
    this.storage.removeItem(key)
  }
  clearCache() {
    this.storage.clear()
  }
}

const localCache = new StorageCache()
const sessionCache = new StorageCache(false)

const info = {
  name: "yt",
  age: 18,
  height: 1.88,
  address: "济南"
}
localCache.setCache("info", info);
console.log(localCache.getCache("info"));
sessionCache.setCache("info", info);
console.log(sessionCache.getCache("info"));
```

- 这样做的好处是可以做很多的扩展和复用