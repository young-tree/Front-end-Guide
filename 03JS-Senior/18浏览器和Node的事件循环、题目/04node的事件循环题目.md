```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function() {
  console.log("setTimeout0");
}, 0);

setTimeout(function() {
  console.log("setTimeout2");
}, 2000);

setImmediate(() => console.log("setImmediate"));

process.nextTick(() => console.log("nextTick1"));

async1();

process.nextTick(() => console.log("nextTick2"));

new Promise(function(resolve) {
  console.log("promise1");
  resolve();
  console.log("promise2");
}).then(res => {
  console.log("promise3");
});

console.log("script end");

/*
script start
async1 start
async2
promise1
promise2
script end
nextTick1
nextTick2
async1 end
promise3
setTimeout0
setImmediate
setTimeout2
*/

/*
next tick queue: nextTick1 nextTick2
other queue: "async1 end" promise3
*/

/*
timer queue: setTimeout0 setTimeout2
poll queue:
check queue: setImmediate
close queue:
*/
```

- 注意这里的setTimeout2，当我们要执行setImmediate的回调时，我们发现timer queue还没有setTimeout2
- 因为setTimeout2还在libuv中等待着呢，还没加入到timer queue中
- 所以setTimeout2最后打印

总结：

- 一般就考察四个队列
  - next tick queue：nextTick
  - other queue：Promise、queueMicrotask
  - timer queue：setTimeout、setInterval
  - check queue：setImmediate

```js
// 测试
console.log("script start");

setTimeout(function() {
  console.log("setTimeout0");
}, 0);

setTimeout(function() {
  console.log("setTimeout2");
}, 2000);

setImmediate(() => console.log("setImmediate"));

var startTime = Date.now();
for (var i = 0; i < 100000; i++) {
  console.log(i);
}
var endTime = Date.now();
console.log(endTime - startTime);

console.log("script end");

/*

中间打印

script end
setTimeout0
setTimeout2
setImmediate
*/
```

