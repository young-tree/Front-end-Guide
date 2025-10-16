### 1.js最基本的两个东西

- Function函数和Object函数
- 他们两个既是函数又是对象

### 2.Function本身是一个对象

- 如果把它看作是一个对象，那么它是怎么来的呢？
  - 不是new Object();而来，而是new Function();而来
  - 所以它就有`__proto__`属性，这个`__proto__`属性指向Function.prototype

### 3.Function本身还是一个构造函数

- 如果把它看作是一个构造函数，那么它里面就有一个东西叫：prototype
  - 这个prototype是Function的原型对象
  - 也就是说和2中的`__proto__`属性指向的是同一个对象
  - Function.prototype里有一个`__proto__`属性指向Object.prototype

### 4.Object本身是一个对象

- 如果把它看作是一个对象，这个对象是怎么来的？
  - 是new Function();而来，`__proto__`指向Function.prototype

### 5.Object本身还是一个构造函数

- 如果把它看作是一个构造函数，Object.prototype是Object的原型对象

### 6.我们有一个新的函数

```js
function Foo() {};
```

- Foo本身是一个对象，它里面有一个`__proto__`属性，指向Funtion.prototype
- Foo本身还是一个构造函数，所以new出来的f1或者f2中的也有一个`__proto__`指向Foo.prototype

![image-20220306125150136](https://s2.loli.net/2022/03/06/EAWZsXYVxuq8NMa.png)

