### 1.简单值

```json
"简单值可以有: 字符串 数字 null"
```

### 2.对象

```json
{
  "name": "yt",
  "age": 22,
  "height": 1.88,
  "friend": {
    "name": "孤独"
  }
}
```

### 3.数组

```json
[
  123,
  "agc"
]
```

### 4.序列化和反序列化

```js
const obj = {
  name: "yt",
  age: 22,
  height: 1.88,
  friend: {
    name: "孤独"
  }
}

const jsonString = JSON.stringify(obj);
console.log(jsonString);
const objBack = JSON.parse(jsonString);
console.log(objBack);
```

### 5.stringify参数补充

```js
const obj = {
  name: "yt",
  age: 22,
  height: 1.88,
  friend: {
    name: "孤独"
  }
}

const jsonString = JSON.stringify(obj, (key, value) => {
  if (key === "name") {
    return "why";
  }
  return value
});
console.log(jsonString);

const jsonString1 = JSON.stringify(obj, null, 2);
console.log(jsonString1);  // 看起来更方便
```

### 6.parse参数补充

```js
const obj = {
  name: "yt",
  age: 22,
  height: 1.88,
  friend: {
    name: "孤独"
  }
}

const jsonString = JSON.stringify(obj);
const objBack = JSON.parse(jsonString, (key, value) => {
  if (key === "age") {
    return value + 2;
  }
  return value;
});
console.log(objBack);
```

