### 1.Promise初步实现

```js
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

class YTPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;

    const resolve = (value) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED;
        queueMicrotask(() => {
          this.value = value;
          this.onfulfilled(this.value);
        })
      }
    };
    const reject = (reason) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED;
        queueMicrotask(() => {
          this.reason = reason;
          this.onrejected(this.reason);
        });
      };
    };

    executor(resolve, reject);
  };

  then(onfulfilled, onrejected) {
    this.onfulfilled = onfulfilled;
    this.onrejected = onrejected;
  };
};

const ytpromise = new YTPromise((resolve, reject) => {
  resolve(111);
  reject(222);
});

ytpromise.then(res => {
  console.log("res1", res);
}, err => {
  console.log("err1", err);
});
```

- 存在几个问题
  1. 重复调用then方法，会被最后一个调用的then方法所覆盖
  2. 无法链式调用

### 2.解决重复调用then方法出现的问题

- 之所以出现这样的问题，是因为我们对then方法的覆盖出了问题

  ```js
  then(onfulfilled, onrejected) {
    this.onfulfilled = onfulfilled;
    this.onrejected = onrejected;
  };
  ```

  - 我们不应该这样直接赋值，这样只会保存最后一个

- 我们应该使用数组来保存

  ```js
  class YTPromise {
    constructor(executor) {
      this.onfulfilledFns = [];
      this.onrejectedFns = [];
  
      const resolve = (value) => {
        if(this.status === PROMISE_STATUS_PENDING) {
          this.status = PROMISE_STATUS_FULFILLED;
          queueMicrotask(() => {
            this.value = value;
            this.onfulfilledFns.forEach(item => {
              item(this.value);
            });
          });
        };
      };
      const reject = (reason) => {
        if(this.status === PROMISE_STATUS_PENDING) {
          this.status = PROMISE_STATUS_REJECTED;
          queueMicrotask(() => {
            this.reason = reason;
            this.onrejectedFns.forEach(item => {
              item(this.reason);
            })
          });
        };
      };
  
      executor(resolve, reject);
    };
  
    then(onfulfilled, onrejected) {
      if (this.status === PROMISE_STATUS_FULFILLED) {
        onfulfilled && this.onfulfilledFns.push(onfulfilled);
      } else {
        onrejected && this.onrejectedFns.push(onrejected);
      };
    };
  };
  ```

### 3.解决两个问题

- 解决在setTimeout中调用then会出现无法调用

- 多次调用resolve或reject重复调用then方法的问题

  ```js
  const PROMISE_STATUS_PENDING = "pending";
  const PROMISE_STATUS_FULFILLED = "fulfilled";
  const PROMISE_STATUS_REJECTED = "rejected";
  
  class YTPromise {
    constructor(executor) {
      this.status = PROMISE_STATUS_PENDING;
      this.value = undefined;
      this.reason = undefined;
      this.onfulfilledFns = [];
      this.onrejectedFns = [];
      this.resTimes = 0;
      this.errTimes = 0;
  
      const resolve = (value) => {
        if(this.status === PROMISE_STATUS_PENDING) {
          queueMicrotask(() => {
            // 不是rejected状态，并且进入过一次
            if (this.status !== PROMISE_STATUS_REJECTED && this.resTimes === 0) {
              this.status = PROMISE_STATUS_FULFILLED;  // 修改状态为fulfilled
              this.resTimes += 1;  // 进入次数加1
              this.value = value; // 赋值形参
              this.onfulfilledFns.forEach(item => {
                item(this.value);  // 调用所有的then方法中的第一个参数
              });
            }
          });
        };
      };
      const reject = (reason) => {
        if(this.status === PROMISE_STATUS_PENDING) {
          queueMicrotask(() => {
            if (this.status !== PROMISE_STATUS_FULFILLED && this.errTimes === 0) {
              this.status = PROMISE_STATUS_REJECTED;
              this.errTimes += 1;
              this.reason = reason;
              this.onrejectedFns.forEach(item => {
                item(this.reason);
              })
            }
          });
        };
      };
  
      executor(resolve, reject);
    };
      
    // 严格判断一个参数确实为函数类型
    isFn(fn) {
      if(Object.prototype.toString.call(fn) === "[object Function]") return true;
    };
  
    then(onfulfilled, onrejected) {
      // 如果外界在setTimeout中调用了then方法就会用到
      if (this.status === PROMISE_STATUS_FULFILLED) {  // 状态已经为fulfilled
        this.isFn(onfulfilled) && onfulfilled(this.value);
      } else if(this.status === PROMISE_STATUS_REJECTED) {  // 状态已经为rejected
        this.isFn(onrejected) && onrejected(this.reason);
      };
      
      // 正常调用then方法
      if (this.status === PROMISE_STATUS_PENDING) {  // 刚开始
        this.isFn(onfulfilled) && this.onfulfilledFns.push(onfulfilled);
        this.isFn(onrejected) && this.onrejectedFns.push(onrejected);
      };
    };
  };
  ```

### 4.then方法的链式调用

```js
class YTPromise {
  constructor(executor) {
    const resolve = (value) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_REJECTED && this.resTimes === 0) {
            this.onfulfilledFns.forEach(item => item());
          }
        });
      };
    };
    const reject = (reason) => {
      if(this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_FULFILLED && this.errTimes === 0) {
            this.onrejectedFns.forEach(item => item());
          }
        });
      };
    };
	
    // 处理，当使用ytpromise的时候，直接抛出错误
    try {
      executor(resolve, reject);
    } catch(err) {
      reject(err);
    };
  };

  // try - catch代码的抽取
  thenChainCall(resolve, reject, item, result) {
    try {
      resolve(item(result));
    } catch(err) {  // 只有抛出错误的时候才会进入到catch里面
      reject(err);
    };
  };

  then(onfulfilled, onrejected) {
    return new YTPromise((resolve, reject) => {
      if (this.status === PROMISE_STATUS_FULFILLED) {
        this.isFn(onfulfilled) && 
        this.thenChainCall(resolve, reject, onfulfilled, this.value);
      } else if(this.status === PROMISE_STATUS_REJECTED) {
        this.isFn(onrejected) && 
        this.thenChainCall(resolve, reject, onrejected, this.reason);
      };
      if (this.status === PROMISE_STATUS_PENDING) {
        // 我认为这里改的就非常巧妙，第一次遇到
        // 这样做解决掉的问题就是：resolve和reject可以使用了
        this.isFn(onfulfilled) && this.onfulfilledFns.push(() => {
          this.thenChainCall(resolve, reject, onfulfilled, this.value);
        });
        this.isFn(onrejected) && this.onrejectedFns.push(() => {
          this.thenChainCall(resolve, reject, onrejected, this.reason);
        });
      };
    })
  };
};
```

### 5.遇到了一个问题

- 把一个类实例化后得到了一个对象，如何判断这个对象是来自这个类的
- 一开始落入了寻找对象名的过程，企图通过对象名和类名作比较，但是一个类名好获得，可是一个对象名，不好获得，或者说无法获得
- 那咋办？有两个办法
  - 对象 instanceof 类
  - 类.prototype.isPrototypeOf(对象)

```js
class YTPromise {
  thenChainCall(resolve, reject, item, result) {
    try {
      // 这里item(result)就是实例化YTPromise而来的
      // 所以item(result).__proto__ = YTPromise.prototype
      if(result instanceof YTPromise) {
        if (result.status === PROMISE_STATUS_FULFILLED) {
          const reValue = item(result.value);
          newY(reValue);
        } else if (result.status === PROMISE_STATUS_REJECTED) {
          const reValue = item(result.reason);  
          // 由于我们用resolve进行的调用，所以item是onfulfilled，而不是onrejected
          // 所以无法进入then方法的第二个参数
          // 那么怎么办？问一问老师，留一留
          newY(reValue);
        };
      } else {
        const reValue = item(result);
        newY(reValue);
      }
      function newY(reValue) {
        if(reValue instanceof YTPromise) {
          setTimeout(() => {
            if (reValue.status === PROMISE_STATUS_FULFILLED) {
              resolve(reValue.value);
            } else if (reValue.status === PROMISE_STATUS_REJECTED) {
              reject(reValue.reason);
            };
          });
        } else {
          resolve(reValue);
        };
      }
    } catch(err) {
      reject(err);
    };
  };
};

const ytpromise = new YTPromise((resolve, reject) => {
  resolve(new YTPromise((resolve, reject) => {  // 就是这里的resolve
    reject(789);
  }));
});

ytpromise.then(res => {
  console.log("res1", res);
  return new YTPromise((resolve, reject) => {
    reject(456);
  });
}, err => {
  console.log("err1", err);
}).then(res => {
  console.log("res11", res);
}, err => {
  console.log("err11", err);
});
```

