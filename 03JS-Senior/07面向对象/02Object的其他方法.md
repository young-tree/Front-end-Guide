### 1.获取属性描述符

```js
var obj = {
  name: "kobe",
  _age: 40,
  set age(newValue) {
    this._age = newValue;
  },
  get age() {
    return this._age;
  },
};

Object.defineProperty(obj, "age", {
  configurable: true,
  enumerable: true,
});

console.log(Object.getOwnPropertyDescriptor(obj, "name"));
console.log(Object.getOwnPropertyDescriptor(obj, "age"));

console.log(Object.getOwnPropertyDescriptors(obj));
```

![image-20220302091449528](https://s2.loli.net/2022/03/02/8dfcUbrEW9QVPYj.png)

### 2.Object的方法对对象的限制

- 我们的对象是可以随便添加属性的

  ```js
  var obj = {
    name: "kobe",
    age: 40,
  };
  
  obj.height = 1.88;
  obj.address = "米国";
  console.log(obj); // { name: 'kobe', age: 40, height: 1.88, address: '米国' }
  ```

- 我们不想让其扩展

  ```js
  var obj = {
    name: "kobe",
    age: 40,
  };
  Object.preventExtensions(obj);
  
  obj.height = 1.88;
  obj.address = "米国";
  console.log(obj); // {name: 'kobe', age: 40}
  ```

### 3.将所有属性的configurable设置为false

```js
var obj = {
  name: "kobe",
  age: 40,
};

for(var key in obj) {
  Object.defineProperty(obj, key, {
    configurable: false,
    enumerable: true,
    writable: true,
    value: obj[key],
  });
};
```

- 但是这种范式比较繁琐

```js
var obj = {
  name: "kobe",
  age: 40,
};

Object.seal(obj);  // seal: 封印
```

### 4.将所有属性的writable设置为false

```js
var obj = {
  name: "kobe",
  age: 40,
};

Object.freeze(obj); // freeze: 冻结
```

