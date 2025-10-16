### 1.为什么要使用Symbol

ES6之前，对象的属性名（key）它是通过HashMap实现的

```js
const obj = {
  name: "yt",
  age: 22,
};
```

- 这里的name和age其实在底层都是当成字符串

  ```js
  const obj = {
    name: "yt",
    age: 22,
  };
  
  console.log(Object.keys(obj));  // [ 'name', 'age' ]
  ```

- 如果我添加一个相同的属性，必然会把之前的同属性的值进行覆盖

  ```js
  const obj = {
    name: "yt",
    age: 22,
  };
  
  obj["name"] = "james";
  console.log(obj);  // { name: 'james', age: 22 }
  ```

  - 由于我们不知道obj在之前是否有name这个属性，所以有可能会造成冲突

- 在我们实现call、apply、bind的时候，我们为this加了一个fn属性，如果别人调用你这个方法时，传入的对象正好有fn属性呢？添加的这个对象中fn属性必然会被覆盖掉

- 再比如，我们开发过程中可能会用到混入，混入中出现了同名的属性，必然有一个会被覆盖掉

### 2.Symbol的基本使用

Symbol就是为了解决上面的问题而生的，它用来生成一个独一无二的值

- Symbol是一个函数，但是不是一个构造函数，不要用new操作符操作它

- 你可以调用它来生成一个唯一的值

  ```js
  const s1 = Symbol();
  const s2 = Symbol();
  ```

  - 每次调用Symbol的时候，它生成的值是唯一的

  ```js
  console.log(s1 === s2);  // false
  ```

- 既然它是唯一的，我们就可以让它作为对象的key

- 你可能要问，对象的key不是字符串吗？

  - 从ES6开始，对象的属性名（key）可以是字符串类型，也可以是Symbol类型

- Symbol函数每次执行后，都会生成一个独一无二的值

- ES10（ES2019）中，Symbol还有一个描述（description）

  - 我们在创建Symbol的时候，可以给他传入一个描述，这个描述可以是一个字符串类型，也可以是一个数字类型

    ```js
    const s3 = Symbol("aaa");
    ```

- 当然你也可以拿到这个描述

  ```js
  const s3 = Symbol("aaa");
  console.log(s3.description);  // aaa
  ```

### 3.Symbol值作为key的写法

- 写法一：定义对象字面量

  ```js
  const s1 = Symbol();
  const s2 = Symbol();
  
  const obj = {
    [s1]: "abc",
    [s2]: "nba"
  };
  ```

- 写法二：新增属性

  ```js
  const s3 = Symbol("aaa");
  obj[s3] = "cba"
  ```

- 写法三：Object.defineProperty();的方式

  ```js
  const s4 = Symbol();
  Object.defineProperty(obj, s4, {
    configurable: true,
    enumerable: true,
    writable: true,
    value: "mba",
  });
  ```

- 如何通过Symbol（key）获取到对象的值（value）

  ```js
  console.log(obj[s1], obj[s2], obj[s3], obj[s4]);  // abc nba cba mba
  ```

  - 注意不能通过 `.` 这个语法进行获取
  - 这种写法是在找obj对象中作为字符串的属性名


### 4.获取对象中的Symbol的值

使用Symbol作为对象的属性名，在遍历或者Object.keys()等情况下是获取不到属性名的，即获取不到Symbol值

```js
console.log(Object.keys(obj));  // []
console.log(Object.getOwnPropertyNames(obj));  // []
```

- 如果你想获取Symbol，我们需要通过一个专门的方法去获取

  ```js
  console.log(Object.getOwnPropertySymbols(obj));
  // [ Symbol(), Symbol(), Symbol(aaa), Symbol() ]
  ```

- 如果你想遍历所有的Symbol值，需要像下面这样获取

  ```js
  const sKeys = Object.getOwnPropertySymbols(obj);
  for(const sKey of sKeys) {
    console.log(sKey);
  };
  /*
  Symbol()
  Symbol()
  Symbol(aaa)
  Symbol()
  */
  ```

### 5.创建相同的Symbol

有的时候我们希望创建出来的两个Symbol值是一样的，有没有办法？

```js
const sa = Symbol.for("aaa");
const sb = Symbol.for("aaa");
console.log(sa === sb);  // true
```

- 第二次创建的Symbol，如果key一样（就是都是aaa嘛），就会找到之前一样的key的值，即sa，再把这个值赋给sb

- 如何获取到key呢，也就是如何获取到aaa呢？

  ```js
  const key = Symbol.keyFor(sa);
  console.log(key);  // aaa
  ```

  - 之前的s3的那个aaa不是key，而是一个描述

- 我们还可以利用这个key再创建更多的、相同的Symbol值

  ```js
  const key = Symbol.keyFor(sa);
  const sc = Symbol.for(key);
  console.log(sc === sb);  // true
  ```

  