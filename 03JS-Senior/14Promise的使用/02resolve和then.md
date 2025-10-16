### 1.resolve

- 我们知道resolve中可以传入普通的值也可以传入对象，所以说它里面还是可以传new Promise的

  ```js
  const newPromise = new Promise((resolve, reject) => {})
  
  new Promise((resolve, reject) => {
    resolve(newPromise);
  }).then((res) => {
    console.log("res:", res);
  }, (err) => {
    console.log("err:", err);
  });
  ```

  - 就这段代码，你猜会发生什么？

  - 你可能会想到，应该执行console.log("res:", res);但是事实是什么都没有执行

  - 我们在调用resolve的一瞬间，本来是从pending状态转移到了fulfilled状态

  - 不过由于你给resolve传入的是Promise对象，状态的改变，由新传入的Promise来决定

    ```js
    const newPromise = new Promise((resolve, reject) => {
      resolve("aaa");
    });
    
    new Promise((resolve, reject) => {
      resolve(newPromise);
    }).then((res) => {
      console.log("res:", res);
    }, (err) => {
      console.log("err:", err);
    });
    ```

    - 打印res: aaa
    - 所以本来由resolve(newPromise);决定将pending状态转变为fulfilled状态
    - 这样的决定权转给了resolve("aaa");来决定
    - 当执行resolve("aaa");的时候才会将pending状态转变为fulfilled状态

- 如果我们能传入一个对象，但是这个对象中偏偏有一个then方法，并且这个then方法实现了一些特定的代码，会发生什么？

  - 那么也会执行该then方法，并且由该then方法确定后续状态

    ```js
    new Promise((resolve, reject) => {
      resolve({
        then(resolve, reject) {
          resolve("resolve message");
          // reject("reject message");
        },
      });
    }).then((res) => {
      console.log("res:", res);
    }, (err) => {
      console.log("err:", err);
    });
    ```

    - 打印res: resolve message
    - 这种情况我们一般称其为thenable
    - 传入一个对象，并且这个对象实现了thenable

### 2.then

- 查看Promise的对象方法

  ```js
  console.log(Object.getOwnPropertyDescriptors(Promise.prototype));
  ```

- 同一个promise对象的then方法，可以被多次调用

  ```js
  const promise = new Promise((resolve, reject) => {
    resolve(123);
  });
  
  promise.then((res) => {
    console.log("res1", res);
  });
  
  promise.then((res) => {
    console.log("res2", res);
  });
  
  promise.then((res) => {
    console.log("res3", res);
  });
  ```

  - 当resolve方法被回调时，会执行所有被多次调用的then方法中的回调函数

- 传入then方法的回调函数是可以有返回值的（普通值：数字、字符串、普通对象、undefined）

  - 如果返回的是一个普通值

    ```js
    promise.then((res) => {
      return "aaaa";
    });
    ```
    - 就相当于promise.then被执行后接收了一个Promise作为返回值，并且这个Promise的resolve会把这个普通值作为实参传进去，并执行

  - 那么你就可以写Promise的链式调用

    ```js
    const promise = new Promise((resolve, reject) => {
      resolve(123);
    });
    
    promise.then((res) => {
      console.log(res);  // 123
      return "aaaa";
    }).then((res) => {
      console.log(res);  // aaa
      return "bbbb";
    }).then((res) => {
    console.log(res);  // bbb
      return "cccc";
    }).then((res) => {
      console.log(res);  // ccc
    });
    ```
    
  - 如果我什么都没有返回，会发生什么呢？
  
    ```js
    promise.then((res) => {
      console.log(res);  // 123
    }).then((res) => {
      console.log(res);  // undefined
    });
    ```
  
    - 什么都没有返回，就相当于返回undefined

- 传入then方法的回调函数有返回值，但是返回值是一个Promise对象

  ```js
  promise.then((res) => {
    console.log(res);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("请求到数据");
      }, 3000);
    });
  });
  ```
  
  - 首先我们要确定一个必然会发生的情况，就是如果你的then方法中有return，就相当于整个then方法接受了一个新的返回值，这个返回值的类型是Promise对象，并且这Promise对象的resolve会把return的返回值作为实参传递过去
  
  - 上面的写法可以变成下面的写法

    ```js
  new Promise((resolve, reject) => {
      resolve(new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve("请求到数据");
        }, 3000);
      }));
    });
    ```
  
    - 这个结构面熟吗？不面熟的话，我换个方式写
  
      ```js
    const newPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve("请求到数据");
        }, 3000);
      })
      
      new Promise((resolve, reject) => {
        resolve(newPromise);
      });
      ```
  
    - 现在面熟了吧，这不就是我们刚学的resolve的规则吗？
  
      - 当执行到resolve(newPromise);这一步的时候，发现newPromise是一个Promise对象，状态改变的权利交给这个新的newPromise对象

        ```js
      const promise = new Promise((resolve, reject) => {
          resolve(123);
      });
        
        promise.then((res) => {
          console.log(res);  // 123
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve("请求到数据");
            }, 3000);
          });
        }).then((res) => {
          console.log(res);  // 延时3秒打印：请求到数据
        });
        ```
  
- 传入then方法的回调函数有返回值，但是返回值是一个实现thenable的对象

  - 理解了上一个，这个也是一样的，也是回到了resolve的实参是一个实现了thenable的对象会怎么样

    ```js
    promise.then((res) => {
      console.log(res);
      return {
        then(resolve, reject) {
          resolve("aaaa")
        },
      };
    });
    ```

    这种写法不就可以理解为下面的写法吗？

    ```js
    new Promise((resolve, reject) => {
      resolve({
        then(resolve, reject) {
          resolve("aaaa")
        },
      });
    });
    ```

    所以最终可以这样拿到resolve传过来的实参

    ```js
    promise.then((res) => {
      return {
        then(resolve, reject) {
          resolve("aaaa")
        },
      };
    }).then(res => {
      console.log(res)  // aaaa
    });
    ```
  
- 总的来看，只要then中有return，立马把这个then想象成一个新的Promise对象，并且把返回值放入到resolve中，作为它的实参，那么接下来的操作就回到了起点，或者回到了，resolve中传入不同类型的值该怎么办的问题上了。

