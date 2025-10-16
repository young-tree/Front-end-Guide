### 1.安装插件

- 下载FeHelper.V2020.05.2810.crx这个crx的文件
- 下载地址
  - https://github.com/zxlie/FeHelper/tree/master/apps/static/screenshot/crx
- 下载后将crx后缀名改为rar的压缩文件
  - 解压这个文件
- 将解压后的文件夹拖入扩展程序或者在扩展程序中选中此文件夹

### 2.XHR基础

```js
// 1.创建XMLHttpRequest实例对象
const xhr = new XMLHttpRequest();

// 2.监听状态的变化
xhr.addEventListener("readystatechange", () => {
  // 总共有四种状态
  if(xhr.readyState !== XMLHttpRequest.DONE) return;

  // 将字符串转成json对象
  const data = JSON.parse(xhr.response)
  console.log(data);
});

// 3.配置
xhr.open("get", "http://123.207.32.32:8000/home/multidata");

// 4.发送网络请求(浏览器发送的)
xhr.send();
```

### 3.XHR发送同步请求

```js
// 1.创建XMLHttpRequest实例对象
const xhr = new XMLHttpRequest();

// 2.监听状态的变化
xhr.addEventListener("readystatechange", () => {
  // 总共有四种状态
  if(xhr.readyState !== XMLHttpRequest.DONE) return;

  // 将字符串转成json对象
  const data = JSON.parse(xhr.response)
  console.log(data);
});

// 发送异步请求
// 3.配置
xhr.open("get", "http://123.207.32.32:8000/home/multidata");

// 4.发送网络请求(浏览器发送的)
xhr.send();

console.log("------");
console.log("++++++");
console.log("******");

// 发送同步请求
// 3.配置
xhr.open("get", "http://123.207.32.32:8000/home/multidata", false);

// 4.发送网络请求(浏览器发送的)
xhr.send();

console.log("------");
console.log("++++++");
console.log("******");
```

### 4.load事件

```js
const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  console.log(JSON.parse(xhr.response));
});

xhr.open("get", "http://123.207.32.32:8000/home/multidata");
xhr.send();
```

### 5.响应数据类型

```js
const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  // 1.接收json类型的数据, 并进行json解析
  console.log(JSON.parse(xhr.response));

  // 2.接收文本类型的数据
  console.log(xhr.response);
  // 或
  console.log(xhr.responseText);

  // 3.接收xml类型的数据
  console.log(xhr.response);
  // 或
  console.log(xhr.responseXML);
});

// 1.返回json类型的数据
xhr.open("get", "http://123.207.32.32:1888/01_basic/hello_json");
// 2.返回文本类型的数据
xhr.open("get", "http://123.207.32.32:1888/01_basic/hello_text");
// 3.返回xml类型的数据
xhr.open("get", "http://123.207.32.32:1888/01_basic/hello_xml");

xhr.send();
```

### 6.获取响应状态码

```js
const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(JSON.parse(xhr.response));
  } else {
    console.log("出现错误", xhr.status, xhr.statusText);
  }
});

// xhr.open("get", "http://123.207.32.32:8000/home/multidata");
xhr.open("get", "http://123.207.32.32:8000/home/multidat");

xhr.send();
```

### 7.传递参数

```html
<form class="info">
  <input type="text" name="username">
  <input type="password" name="password">
</form>
<button>发送请求</button>

<script>
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);
  });

  // 设置返回(响应)数据的类型
  xhr.responseType = "json"

  // 1.get - queryString
  xhr.open("get", "http://123.207.32.32:1888/02_param/get?name=yt&age=22&address=济南市");

  xhr.send();

  // 2.post - urlencoded
  xhr.open("post", "http://123.207.32.32:1888/02_param/posturl");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.send("name=yt&age=22&address=济南市");

  // 3.post - formdata
  const formEl = document.querySelector(".info");
  const btn = document.querySelector("button");
  btn.addEventListener("click", () => {
    xhr.open("post", "http://123.207.32.32:1888/02_param/postform");
    const formData = new FormData(formEl);

    xhr.send(formData);
  });

  // 4.post - json
  xhr.open("post", "http://123.207.32.32:1888/02_param/postjson");
  xhr.setRequestHeader("Content-type", "application/json")
  xhr.send(JSON.stringify({name: "yt", age: 22}));
</script>
```

### 8.超时时间和取消请求

```html
<button>取消网络请求</button>

<script>
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => console.log(xhr.response));
  xhr.addEventListener("timeout", () => console.log("已超时"));
  xhr.addEventListener("abort", () => console.log("网络请求已经取消"));

  xhr.responseType = "json";
  xhr.timeout = 3000;

  xhr.open("get", "http://123.207.32.32:1888/01_basic/timeout");

  xhr.send();

  const btn = document.querySelector("button");
  btn.addEventListener("click", () => xhr.abort());
</script>
```

