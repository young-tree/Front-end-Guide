### 1.奇怪的现象

```js
var name = "y t";
var age = 12.987;

console.log(name.length);
console.log(name.split(" "));
console.log(age.toFixed(2));
```

- 为什么基本数据类型可以调用属性和方法
- 默认是不能调用的

### 2.解释

- 创建了基本数据类型后

- 当我们调用基本数据类型的属性或者方法时，JS引擎会为其包装一个类

  - 类似于下面这样

    ```js
    var name = new String("y t");
    var age = new Number(12.987);
    // 或者这样
    var name = String("y t");
    var age = Number(12.987);
    ```

- 为基本数据类型包装了类之后，就会为其创建实例对象，继而获取它的属性和方法

- 如果实例对象不再被使用了，就会被销毁掉

- 常见的包装类型有：String、Number、Boolean、Symbol、BigInt类型

- 通常JavaScript引擎会进行很多的优化

  - 它可以跳过创建包装类的过程
  - 在内部直接完成属性的获取或者方法的调用。

- 注意

  - null和undefined没有任何的方法，也没有对应的“对象包装类”

### 3.Number类的使用

- 类属性：Number自身存在的属性

  ```js
  console.log(Number.MAX_VALUE);  // 能表示的最大浮点数
  console.log(Number.MIN_VALUE);  // 能表示的最小浮点数
  console.log(Number.MAX_SAFE_INTEGER);  // 能表示的最大整数
  console.log(Number.MIN_SAFE_INTEGER);  // 能表示的最小整数
  ```

- 实例对象的方法：new Number()得到的对象

  - toString方法：会把数字类型转化为字符串类型

    ```js
    var num = 100;
    console.log(num.toString());  // 字符串类型 十进制
    console.log(num.toString(2));  // 2进制
    console.log(num.toString(8));  // 8进制
    console.log(num.toString(16));  // 16进制
    ```

  - toFixed方法：会把数字类型转化为字符串类型

    ```js
    var num1 = 17.896;
    console.log(num1.toFixed(2));  // 保留两位小数, 四舍五入, 字符串类型
    ```

- 类方法：Number自身存在的方法

  ```js
  var numStr = "123.527";
  console.log(Number.parseInt(numStr));  // 数字类型, 转成整数, 向下取整
  console.log(Number.parseFloat(numStr));  // 数字类型, 转成浮点数
  // 一般用于将一个字符串类型的浮点数, 转换成数字类型的浮点数
  ```



