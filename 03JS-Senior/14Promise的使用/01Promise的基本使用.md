### 1.为什么要使用Promise

- 我们用定时器来模拟发送网络请求

  ```js
  function requestData(url) {
    setTimeout(() => {
      if(url === "yt") {
        const names = ["abc", "nba"];
        return names;
      } else {
        const message = "未请求到数据";
        return message;
      }
    }, 3000);
  };
  
  const result = requestData("yt");
  ```

  - 请问通过这样的方式可以获得返回值吗？

  - 不可能的，因为是异步，他返回也是给内部的函数返回，不可能返回到requestData上

  - 那怎么办？传入回调函数

    ```js
    function requestData(url, successCallback, failureCallback) {
      setTimeout(() => {
        if(url === "yt") {
          const names = ["abc", "nba"];
          successCallback(names);
        } else {
          const message = "未请求到数据";
          failureCallback(message);
        }
      }, 3000);
    };
    
    requestData("yt", item => console.log(item), error => console.log(error));
    ```

- 这样的方式有很多的弊端

  1. 要自己设计好回调函数的名称，并且要使用好回调函数
  2. 如果我们使用的是别人封装的requestData，或者其他的第三方库，我们就必须去看别人封装的这个源码或者文档，才能知道如何使用这个函数

- 我们有更好的方案，可以减少沟通成本

  - 让别人给我一个承诺

    ```js
    function requestData2() {
      return "承诺";
    };
    
    const chengNuo = requestData2();
    ```

  - 这里的承诺已经把所有的代码编写逻辑规范好了，沟通成本就会大大降低，不会像以前一样还要查看一些它个性化的代码

### 2.什么是Promise

- Promise是一个类

- 通过new创建Promise对象的时候，需要传入一个参数，这个参数的类型是函数类型，我们称之为executor [ɪɡˈzekjətər] 执行人

  ```js
  class Person {
    constructor(callback) {
      callback();
    };
  };
  
  const p = new Person(() => console.log(123));
  ```

  - 我们通过Person举个例子

  - 这里传入的函数是会被立即执行的，所以同理，传给Promise的函数也是会被立即执行的

    ```js
    const promise = new Promise(() => console.log(123));
    ```

    - 肯定是会被执行的

- 我们还会给传入的函数，再传入两个参数，这两个参数也是函数类型，类似于下面这样

  ```js
  class Person {
    constructor(callback) {
      let foo = () => {
        console.log("foo");
      };
      let bar = () => {
        console.log("bar");
      };
      callback(foo, bar);
    };
  };
  
  const p = new Person((foo, bar) => {
    foo();
    bar();
  });
  ```

  - 那么相应的Promise也给我们传入的回调函数两个回调函数，分别是resolve和reject

  - 成功的时候你自己调用resolve，失败的时候你自己调用reject

  - 假如我成功的时候调用了resolve，那么怎么才能看到效果呢？这个时候就要用到Promise对象的then方法

    ```js
    const promise = new Promise((resolve, reject) => {
      if(true) {
        resolve();
      } else {
        reject();
      };
    });
    
    promise.then(() => {});
    ```

    - 一旦resolve被执行了，那么promise的then方法中的回调函数就会被执行

  - 假如我失败的时候调用了reject，在这个时候就要用到Promise对象的catch方法

    ```js
    promise.catch(() => {});
    ```

    - 当reject被执行了，就会调用promise对象的catch方法，并执行里面的回调

  - 我们想要拿到成功时的返回值，失败时的返回值怎么办？

  - 在成功的时候往resolve中传实参就行，失败的时候就往reject中传实参就行

    ```js
    const promise = new Promise((resolve, reject) => {
      if(true) {
        resolve("成功");
      } else {
        reject("失败");
      };
    });
    
    promise.then((res) => { console.log(res) }, (err) => { console.log(err) });
    ```

### 3.重构之前的异步代码

```js
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(url === "yt") {
        const names = ["abc", "nba"];
        resolve(names);
      } else {
        const message = "未请求到数据";
        reject(message);
      }
    }, 3000);
  });
};

const request = requestData("y");
request.then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
```

- 这里其实还有其他的写法，比如可以在then里面传两个函数

  ```js
  const request = requestData("yt");
  request.then(item => {
    console.log(item);
  }, err => {
    console.log(err);
  });
  ```

- 但是有一种写法，执行catch的时候，会报错

  ```js
  const request = requestData("y");
  request.then(item => {
    console.log(item);
  });
  
  request.catch(err => {
    console.log(err);
  });
  ```

### 4.三种状态

```js
new Promise((resolve, reject) => {
  // pending阶段  （pending：悬而未决的）
  resolve();  // 一旦执行了这段代码就进入fulfilled阶段
  // reject();  
}).then((res) => {
  console.log("res", res);  // fulfilled阶段(固定、已敲定)、也有的书说是resolved阶段
}, (err) => {
  console.log("err", err);  // rejected阶段(已拒绝)
});
```

- 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝

  - 当执行executor中的代码时，处于该状态

- 已兑现（fulfilled）: 意味着操作成功

  - 执行了resolve时，处于该状态

- 已拒绝（rejected）: 意味着操作失败

  - 执行了reject时，处于该状态

- 注意：Promise的状态一旦被确定，就不可以更改

  ```js
  new Promise((resolve, reject) => {
    resolve();
    reject();
  }).then((res) => {
    console.log("res", res);
  }, (err) => {
    console.log("err", err);
  });
  ```
  - 只会打印"res" undefined
  - reject是不会被调用的

