### 1.对象的键

- 对象的键，只能是字符串类型和ES6新增的Symbol类型

- 但是能不能用对象类型作为对象的key呢？

  ```js
  const obj1 = { name: "why" };
  const obj2 = { name: "yt" };
  
  const obj = {
    [obj1]: "aaa",
    [obj2]: "bbb",
  };
  
  console.log(obj);  // { '[object Object]': 'bbb' }
  ```

  - 问题一：它会把对象类型转为字符串，把对象转为字符串是什么样子：'[object Object]'
  - 问题二：由于key的名字重复，所以只会把最后一个值设为value
  - 所以不能用对象作为对象的key

### 2.Map

- ES6新增数据结构，用于存储映射关系

  - Map允许我们使用对象类型作为key，也可以使用其它数据类型，你甚至可以用数组或数字类型作为key

    ```js
    const obj1 = { name: "why" };
    const obj2 = { name: "yt" };
    const arr = [1, 2, 3];
    
    const map = new Map();
    map.set(obj1, "aaa");
    map.set(obj2, "bbb");
    map.set(arr, "ccc");
    map.set(1, "ddd");
    
    console.log(map);
    /*
    Map(4) {
      { name: 'why' } => 'aaa',
      { name: 'yt' } => 'bbb',
      [ 1, 2, 3 ] => 'ccc',
      1 => 'ddd'
    }
    */
    ```

    - 当然，key重复是会被覆盖的

### 3.实例化Map时可以传入数组

- 传入的数组包含一个个小数组，每个小数组只有两个元素，分别代表key和value

  ```js
  const obj1 = { name: "why" };
  const obj2 = { name: "yt" };
  
  const map = new Map([
    [obj1, "aaa"],
    [obj2, "bbb"]
  ]);
  ```

### 4.size属性

```js
console.log(map.size);
```

### 5.方法

- set(key, value)：在Map中添加key、value，并且返回整个Map对象

- get(key)：根据key获取Map中的value

  ```js
  console.log(map.get(obj1));
  ```

- delete(key)：根据key删除一个键值对，返回Boolean

- has(key)：判断是否包括某一个key，返回Boolean

- clear()：清空所有的元素

- 通过forEach遍历Map

  ```js
  const obj1 = { name: "why" };
  const obj2 = { name: "yt" };
  
  const map = new Map([
    [obj1, "aaa"],
    [obj2, "bbb"]
  ]);
  
  map.forEach((value, key) => {
    console.log(value, key);
  });
  /*
  aaa { name: 'why' }
  bbb { name: 'yt' }
  */
  ```

### 6.for of遍历

```js
const obj1 = { name: "why" };
const obj2 = { name: "yt" };

const map = new Map([
  [obj1, "aaa"],
  [obj2, "bbb"]
]);

for(const item of map) {
  console.log(item);
};
/*
[ { name: 'why' }, 'aaa' ]
[ { name: 'yt' }, 'bbb' ]
*/
for(const [key, value] of map) {
  console.log(key, value);
};
/*
{ name: 'why' } aaa
{ name: 'yt' } bbb
*/
```

