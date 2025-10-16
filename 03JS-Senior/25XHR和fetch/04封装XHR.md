```js
function ytajax({
  url,
  method = "get",
  data,
  timeout = 10000,
  headers = {},
} = {}) {
  const xhr = new XMLHttpRequest();

  const promise = new Promise((resolve, reject) => {
    xhr.addEventListener("load", () => {
      if(xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject(xhr.status)
      };
    });

    xhr.responseType = "json";
    xhr.timeout = timeout;

    if (method.toLowerCase() === "get") {
      const strArry = [];
      for (const key in data) {
        strArry.push(`${key}=${data[key]}`)
      }
      url = url + "?" + strArry.join("&");
      xhr.open(method, url)
      xhr.send()
    } else {
      xhr.open(method, url)
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify(data));
    }
  });

  promise.xhr = xhr;

  return promise;
}

ytajax({
  url: "http://123.207.32.32:1888/02_param/get",
  data: {
    name: "yt",
    age: 22,
  },
  timeout: 5000,
}).then(res => console.log(res)).catch(err => console.log(err))

ytajax({
  url: "http://123.207.32.32:1888/02_param/postjson",
  method: "post",
  data: {
    name: "yt",
    age: 22,
  },
  timeout: 5000,
}).then(res => console.log(res)).catch(err => console.log(err))
```

