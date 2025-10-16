### 1.WeakSet

- 它与Set相似，也是内部元素不能重复的数据结构

- 那么它和Set有什么区别呢？

  - WeakSet中只能存放对象类型，不能存放基本数据类型

    ```js
    const weakset = new WeakSet();
    
    weakset.add(10);  // TypeError: Invalid(无效的) value used in weak set
    ```

  - WeakSet对元素的引用是弱引用

### 2.什么是弱引用

```js
const obj = { name: "yt" }
```

- 在ES6中，VE指向 `variables_` 对象，`variables_` 对象中有一个obj属性，这个属性的值是我们设置的对象的内存地址，比如0x100
- GC是一个垃圾回收器，就这段代码来说，GC会不定时的去看每一个对象，是否有引用指着它（或者说是否有从根对象开始，沿着根对象一路下来，是否有东西引用着这个对象），如果没有引用，或者即便有引用，但是不是从根对象出发的引用，比如是一个循环引用，这个被调查的对象就会被GC在内存中删除（回收），旨在不浪费内存
- 那么这个对象会被回收掉吗？不会的，因为它被引用着呢
- 这种是强引用：strong reference
- 那么什么是弱引用呢：weak reference
  - 一个对象只被某个东西引用着，但是它是一个弱引用
  - 那么GC就不管了，你这个对象即便是被引用着，由于你是弱引用，我GC会回收你

### 3.举例子进行解释

```js
const obj = { name: "yt" }

const set = new Set();
set.add(obj);
```

- 常量obj引用着{ name: "yt" }这个对象
- 常量set引用着Set对象
- 在Set对象中还引用着{ name: "yt" }这个对象
- 假如我们让obj = null
- GC会对{ name: "yt" }这个对象，进行回收吗？不会的
- 因为Set对象发出（建立）的引用是强引用，即{ name: "yt" }这个对象被Set对象中的某个东西强引用着，不会被GC回收

```js
const obj = { name: "yt" }

const weakset = new WeakSet();
weakset.add(obj);
```

- 我们Set换成了WeakSet
- WeakSet发出（建立）的引用是弱引用，所以obj指向null后，即便{ name: "yt" }这个对象被WeakSet对象引用着，但是你发出（建立）的是弱引用，我GC可以回收你

### 4.WeakSet常见用法

- add(value)：添加某个元素，返回WeakSet对象本身
- delete(value)：从WeakSet中删除和这个值相等的元素，返回Boolean
- has(value)：判断WeakSet中是否存在某个元素，返回Boolean

### 5.WeakSet不能遍历

- 因为WeakSet对对象实行弱引用，如果我们能够通过遍历，一个一个的获取到其中的元素，很有可能造成GC无法对对象进行正常回收的情况
- 所以存储在WeakSet中的对象无法被获取的

### 6.WeakSet的使用

- 那，它到底有啥用呢？

  ```js
  class Person {
    running() {
      console.log("running", this);
    };
  };
  
  const p = new Person();
  p.running();
  
  p.running.call({name: "why"});
  ```

  - 我只希望你通过p.running();的方式调用，并不希望通过p.running.call({name: "why"});这么调用

    ```js
    const personWSet = new WeakSet();
    
    class Person {
      constructor() {
        personWSet.add(this)
      }
    
      running() {
        if(!personWSet.has(this)) {
          throw new Error("不能通过非构造对象方法创建出来的对象调用running方法")
        } else {
          console.log("running", this);
        };
      };
    };
    
    const p = new Person();
    
    p.running.call({name: "why"});
    ```

  - 为什么我们不用Set呢？

    - 因为set是强引用，这里的this是一个对象（Person对象），如果使用this意味着它会被强引用一份
    - 这个Person对象被p强引用着，也被Set强引用着
    - 如果某一天我们让p = null，由于Person对象还被Set引用着，所以Person对象不会被回收
    - 你可能会说我调用delete方法就行了，首先比较麻烦，最重要的是，可能会忘记

  - 所以当我们给p = null时，WeakSet就可以实现让GC把它弱引用的对象给回收了