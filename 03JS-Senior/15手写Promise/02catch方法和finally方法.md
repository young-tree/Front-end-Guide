### 1.catch方法

```js
class YTPromise {
  then(onfulfilled, onrejected) {
    // 主要是这里，本来onrejected是then的第二个参数，如果第二个参数是undefined就赋值为另外一个函数
    onrejected = onrejected ?? (err => { throw err });
    return new YTPromise((resolve, reject) => {})
  };
  catch(onrejected) {
    return this.then(undefined, onrejected);  // 注意这里要return
  };
};

const ytpromise = new YTPromise((resolve, reject) => {
  reject(222);
});

ytpromise.then(res => {
  console.log("res1", res);
}).catch(err => {
  console.log("catch1", err);
});
```

### 2.finally方法

```js
class YTPromise {
  then(onfulfilled, onrejected) {
    onrejected = onrejected ?? (err => { throw err });
    onfulfilled = onfulfilled ?? (value => { return value });
    return new YTPromise((resolve, reject) => {})
  };
  catch(onrejected) {
    return this.then(undefined, onrejected);
  };
  finally(onfinally) {
    this.then(onfinally);
  };
};

const ytpromise = new YTPromise((resolve, reject) => {
  resolve(123);
});

ytpromise.then(res => {
  console.log("res1", res);
}).catch(err => {
  console.log("err1", err);
}).finally(() => {
  console.log("finally");
});
```

