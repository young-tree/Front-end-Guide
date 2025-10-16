### 1.WeakMap

- 它与Map相似，也是以键值对的形式存在
  - 区别一：WeakMap的key只能是对象，不接受其他数据类型作为key
  - 区别二：WeakMap的key对对象的引用是弱引用，如果没有其他东西引用这个对象，GC会回收这个对象

### 2.WeakMap常见的方法

- set(key, value)：在Map中添加key、value，并且返回整个WeakMap对象
- get(key)：根据key获取WeakMap中的value
- delete(key)：根据key删除一个键值对，返回Boolean
- has(key)：判断是否包括某一个key，返回Boolean

- WeakMap不能遍历

### 3.WeakMap的应用

- 最主要用在Vue3的响应式原理

- 什么是响应式

  ```js
  const obj1 = {
    name: 'yt',
    age: 22,
  };
  
  const obj2 = {
    height: 1.74,
    address: "济南市",
  };
  ```

  - 当我改变了obj1的name属性，就会去执行几个函数
  - 当我改变了obj2的height属性，就会去执行另外几个函数

- 比如在Vue中

  - 对象中的某个值改变了，就可以让本组件中使用这个值的元素内容进行改变
  - 那么这些元素内容为啥会改变呢？因为这些元素其实会被转化成render函数或者说h函数
  - 一旦属性发生改变，就会重新执行render函数

- 像这种，某个值改变了，就让某些函数执行一遍，最主要的不是去想具体怎么实现

  - 而是应该想，这个对象如何与所有有关的函数关联起来
  - 这个对象中的属性如何与与之有关的部分函数关联起来
  - 我们的最终目的就是让属性和函数出现映射关系
  - 后面无非就是监听这些属性的改变，监听到了属性的改变，就让与之对应的所有函数挨个执行一遍
  - 所以我们最终要想的就是如何让这些数据，通过某种数据结构让它们关联到一起

### 4.具体

```js
const obj1 = {
  name: 'why',
  age: 18,
};

function obj1NameFn1() {
  console.log("obj1NameFn1");
};
function obj1NameFn2() {
  console.log("obj1NameFn2");
};
function obj1AgeFn1() {
  console.log("obj1AgeFn1");
};
function obj1AgeFn2() {
  console.log("obj1AgeFn2");
};

const obj2 = {
  name: "yt",
  height: 1.74,
  address: "济南市",
};

function obj2NameFn1() {
  console.log("obj2NameFn1");
};
function obj2NameFn2() {
  console.log("obj2NameFn2");
};
```

```js
const weakMap = new WeakMap();

weakMap.set(obj1, 这里填什么？);
```

- 应该是Map，为什么不是WeakMap？因为Map中的key需要是基本数据类型

```js
const weakMap = new WeakMap();

const map = new Map();
map.set(name, [obj1NameFn1, obj1NameFn2]);
map.set(age, [obj1AgeFn1, obj1AgeFn2]);

weakMap.set(obj1, map);
```

- 如果某个时段，obj1.name发生了改变

  ```js
  weakMap.get(obj1)
  ```

  - 这样我可以取出obj1对应的map，我们拿到的是一个Map对象
  - map.get(name)我得到的是个数组，拿到数组后进行遍历，然后依次调用

- 相应的，obj2也可以这样

- 这里有一个问题，用对象类型替换WeakMap行不行？

  - 不行啊，因为WeakMap存储值得时候，key必须是对象类型
  - 还有一个比较重要的是：如果obj1指向了null，那么这个对象由于是被WeakMap弱引用着，所以会被销毁到
  - 并且Map也会自动销毁

### 5.代码

```js
const obj1 = {
  name: 'why',
  age: 18,
};

function obj1NameFn1() {
  console.log("obj1NameFn1");
};
function obj1NameFn2() {
  console.log("obj1NameFn2");
};
function obj1AgeFn1() {
  console.log("obj1AgeFn1");
};
function obj1AgeFn2() {
  console.log("obj1AgeFn2");
};

const weakMapObj1 = new WeakMap();

const obj1Map = new Map();
obj1Map.set("name", [obj1NameFn1, obj1NameFn2]);
obj1Map.set("age", [obj1AgeFn1, obj1AgeFn2]);

weakMapObj1.set(obj1, obj1Map);

const obj2 = {
  name: "yt",
  height: 1.74,
  address: "济南市",
};

function obj2NameFn1() {
  console.log("obj2NameFn1");
};
function obj2NameFn2() {
  console.log("obj2NameFn2");
};

const weakMapObj2 = new WeakMap();

const obj2Map = new Map();
obj2Map.set("name", [obj2NameFn1, obj2NameFn2]);

weakMapObj2.set(obj2, obj2Map);
```

- 当然你得监听，不管是通过proxy监听，还是通过Object.defineProperty进行监听

```js
obj1.name = "james";
const targetMap = weakMapObj1.get(obj1);
const fns = targetMap.get("name");
fns.forEach(item => item());
```

- 比如这些你可以在set里面做