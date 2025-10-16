老师，我想实现下面这个功能

```js
new Promise((resolve, reject) => {
  resolve(new Promise((resolve, reject) => {
    reject("aaa");
  }));
}).then((res) => {
  console.log("res:", res);
}, (err) => {
  console.log("err:", err);
});
```

- 我遇到的问题是，我无论是reject("aaa");还是resolve("aaa");都是调用传入then的第一个参数

- 那么问题出在哪呢？出在下面这段代码

  ![image-20220324074111234](https://s2.loli.net/2022/03/24/TZ5pAd3Jsn7NUOX.png)
  - 由于我是resolve某个东西，所以一定是onfulfilled，那么onfulfilledFns数组就会保存传入then的第一个参数

  - 当我调用的时候，出现了问题

    ![image-20220324074524204](https://s2.loli.net/2022/03/24/j2FWdtshkDZzxr7.png)

    - 我判断是我的实现方式出了问题，但是不知道具体怎么实现的
    - 做到这里，不知道该怎么办了