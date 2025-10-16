### 1.ES6新增数据结构

- 不同的数据结构就像不同形状的房子，不同形状的房子，意味着需要存放一些适合这个房子的一些东西
- 这里的一些东西，就是数据
- 有哪些数据结构呢
  - 数组
  - 对象（hashmap、hashtable）
  - 链表
  - 哈希表
  - 树结构、红黑树、平衡二叉树
  - 图结构
- 在ES6之前，我们存储数据最主要用到的数据结构：数组、对象
- 在ES6中，新增了另外两种数据结构：Set、Map
  - 还有属于它们的另外两种形式：WeakSet、WeakMap
- 注意Symbol可不是数据结构，Symbol是一个函数，它返回一个独一无二的值

### 2.Set数据结构

- 它类似于数组，它与数组最大的区别就是，不能存储重复的元素，类似于元祖的概念

- 创建一个Set结构，我们应该通过构造方法的方式去创建，暂时还没有字面量的方式去创建Set

  - 我们可以把Set看成一个类

    ```js
    const set = new Set();
    set.add(10);  // 数组是push
    set.add(20);
    set.add(30);
    set.add(40);
    console.log(set);  // Set(4) { 10, 20, 30, 40 }
    ```

- Set不能存储相同的元素，比如我又添加了30，依然打印上面的结果

  ```js
  set.add(30);
  console.log(set);  // Set(4) { 10, 20, 30, 40 }
  ```

- 但是如果我们增加了多个空对象，会发生什么？

  ```js
  const set = new Set();
  set.add(10);
  set.add(20);
  set.add(30);
  set.add(40);
  set.add({});
  set.add({});
  console.log(set);  // Set(6) { 10, 20, 30, 40, {}, {} }
  ```

  - 因为对象的内存地址不一样，假如你是这么写的，就不一样了

    ```js
    const obj = {};
    set.add(obj);
    set.add(obj);
    console.log(set);  // Set(5) { 10, 20, 30, 40, {} }
    ```

    - 因为内存地址一样

### 3.Set的应用场景

- 我们有一组数据，希望保存此组数据的时候，不要有重复的数据

- 给我们的数组去重

  - 你可以这样写

    ```js
    const arr = [10, 20, 30, 30, 33, 40, 30, 40, 26];
    const newArr = [];
    
    for(const item of arr) {
      if(!newArr.includes(item)) {
        newArr.push(item);
      };
    };
    
    console.log(newArr);  // [ 10, 20, 30, 33, 40, 26 ]
    ```

  - 可以利用set

    ```js
    const arr = [10, 20, 30, 30, 33, 40, 30, 40, 26];
    
    const arrSet = new Set(arr);
    const newArr1 = Array.from(arrSet);
    const newArr2 = [ ...arrSet ];
    console.log(newArr1);  // [ 10, 20, 30, 33, 40, 26 ]
    console.log(newArr2);  // [ 10, 20, 30, 33, 40, 26 ]
    ```

### 4.size属性

- 返回Set中元素的个数

  ```js
  const arr = [10, 20, 30, 30, 33, 40, 30, 40, 26];
  const arrSet = new Set(arr);
  console.log(arrSet.size);  // 6
  ```

### 5.Set常见方法

- add(value)：添加某个元素，返回Set对象本身

  ```js
  const set = new Set();
  const set1 = set.add(10);
  console.log(set1)  // Set(1) { 10 }
  const set2 = set.add(20);
  console.log(set1, set2);  // Set(2) { 10, 20 } Set(2) { 10, 20 }
  console.log(set);  // Set(2) { 10, 20 }
  ```

- delete(value)：删除与value相等的元素，返回Boolean

  ```js
  const del1 = set.delete(10);
  const del2 = set.delete(11);
  console.log(del1, del2);  // true false
  console.log(set);  // Set(1) { 20 }
  ```

- has(value)：判断set中是否存在某个元素，返回Boolean

  ```js
  const set = new Set();
  set.add(10);
  set.add(20);
  
  const has1 = set.has(10);
  const has2 = set.has(11);
  
  console.log(has1);  // true
  console.log(has2);  // false
  ```

- clear()：清空set中所有的元素，没有返回值

  ```js
  const set = new Set();
  set.add(10);
  set.add(20);
  
  set.clear();
  console.log(set);  // Set(0) {}
  ```

- forEach()

  ```js
  const set = new Set();
  set.add(10);
  set.add(20);
  
  set.forEach((item) => {
    console.log(item);
  });
  /*
  10
  20
  */
  ```

### 6.Set支持for of遍历

```js
const set = new Set();
set.add(10);
set.add(20);

for(const item of set) {
  console.log(item);
};
/*
10
20
*/
```

