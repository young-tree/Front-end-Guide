### 1.fetch函数

```js
// 1.fetch发送get请求
async function getData() {
  const response = await fetch("http://123.207.32.32:8000/home/multidata");
  const res = await response.json();
  console.log(res)
}

getData();

// 2.发送post请求, 携带的数据格式是json
async function getData() {
  const response = await fetch("http://123.207.32.32:1888/02_param/postjson", {
    method: "post",
    // 必须加
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      name: "yt",
      age: 18
    })
  })
  const res = await response.json();

  console.log(res);
}

getData();

// 3.发送post请求, 携带的数据格式是FormData
async function getData() {
  const formData = new FormData();
  formData.append("name", "yt");
  formData.append("age", 18);

  const response = await fetch("http://123.207.32.32:1888/02_param/postform", {
    method: "post",
    body: formData
  });

  const res = await response.json()
  console.log(res)
}

getData();
```

### 2.XHR图片上传

```html
<input class="file" type="file">
<button>上传图片</button>

<script>
  const fileIn = document.querySelector(".file");
  const btn = document.querySelector("button");
  // XHR上传图片
  const xhr = new XMLHttpRequest();

  btn.addEventListener("click", () => {
    xhr.addEventListener("load", () => console.log(xhr.response));
    // 监听上传进度
    xhr.upload.addEventListener("progress", (event) => {
      console.log(`${event.loaded}/${event.total}`)
    })

    xhr.responseType = "json";

    xhr.open("post", "http://123.207.32.32:1888/02_param/upload");

    const picData = fileIn.files[0];
    const formData = new FormData();
    formData.append("avatar", picData);

    xhr.send(formData);
  });
</script>
```

### 3.fetch上传图片

```html
<input class="file" type="file">
<button>上传图片</button>

<script>
  const fileIn = document.querySelector(".file");
  const btn = document.querySelector("button");

  btn.addEventListener("click", async () => {
    const picData = fileIn.files[0];
    const formData = new FormData();
    formData.append("avatar", picData);

    const response = await fetch("http://123.207.32.32:1888/02_param/upload", {
      method: "post",
      body: formData
    });

    const res = await response.json();
    console.log(res)
  })
</script>
```

- 没法监听上传进度