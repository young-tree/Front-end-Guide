### 1.监听对象的操作

- 之前我们也有对对象进行过操作

  - 通过对象属性获取值

  - 通过对象属性设置值

  - 删除某个对象属性

    ```js
    const obj = {
      name: "yt",
      age: 18,
    };
    
    obj.name;
    obj.name = "why";
    delete obj.name;
    ```

- 假如我们可以监听到对象属性的赋值 `obj.name = "why";` 这一操作，我们就可以做一些事情

  - 比如在Vue中，我们在template中通过mustache语法获取到对象的name属性所对应的值

    ```vue
    <template>
      {{ obj.name }}
    </template>
    ```

  - 假如现在我们让obj.name = "kobe";了，由于我们对对象的name进行了操作，mustache语法就需要重新执行，再一次获取对象的值，并且把虚拟DOM渲染出来，再通过diff算法，最后给它更新到真实DOM里

- 需求：监听这个对象中的属性，当属性被设置值，或者通过属性获取值时，能够被我们知道

  - 那么我们之前学过的知识中可以做到这一点吗？可以啊，通过属性描述符就可以做到

    ```js
    const obj = {
      name: "yt",
      age: 22,
    };
    
    for(const key in obj) {
      let value = obj[key];
      Object.defineProperty(obj, key, {
        set(newValue) {
          console.log(`为${key}设置值`);
          value = newValue;
        },
        get() {
          console.log(`获取${key}的值`);
          return value;
        },
      });
    };
    
    console.log(obj.name);
    obj.name = "why";
    console.log(obj.name);
    /*
    获取name的值
    yt
    为name设置值
    获取name的值
    why
    */
    
    console.log(obj.age);
    obj.age = 18;
    console.log(obj.age);
    /*
    获取age的值
    22
    为age设置值
    获取age的值
    18
    */
    ```
  
- 这样监听对象的方式是存在问题的

  1. Object.defineProperty的设计初衷，并不是为了监听对象里的某个属性的变化
     - 它的目的主要是为了定义属性描述符
  2. 最重要的问题在于，这种方式无法监听更加丰富的对象操作
     - 新增属性的监听
     - 删除属性的监听

### 2.Proxy的基本使用

- 在ES6中新增了一个Proxy类，我们后面会学Reflect，Reflect是一个对象，所以你可以直接 `Reflect.属性`

- Proxy英文就是代理的意思，所以从名字就可以看出来，它的作用就是为我们创建一个代理

  - 假如我们希望监听刚才obj对象的相关操作，我们可以先创建一个代理对象（Proxy对象）

  - 对于obj对象的所有操作，都通过代理对象来完成，代理对象可以监听到我们想要对原对象进行哪些操作

  - 我们其实不应该用Object.defineProperty去监听我们的对象，因为它实际上是在修改我们的对象，我们其实非常忌讳这种行为

  - 当我们为obj创建了一个代理对象，我们就有了proxy对象

    ```js
    const proxy = new Proxy();
    ```

  - 假如我们想要操作obj对象的name，比如赋值，我们就可以给创建出来的proxy对象的name属性赋值

    ```js
    proxy.name = "why";
    ```

  - 最终，我们为proxy对象做的操作，都会传递到obj对象中

  - 我们可以重写Proxy中的捕获器（trap），它有13种捕获器，我们通过重写捕获器就可以捕获到我们对proxy对象都做了哪些操作了

- 用Proxy来实现上面的案例

  - 我们需要new Proxy，传入需要侦听的对象和一个处理对象

    ```js
    const p = new Proxy(target, handler);
    ```

    - target：我们要对哪个对象进行代理
    - handler：捕获器对象（这里面有很多捕获器）

  - 我们需要操作的是代理对象，而不是原有的obj对象

    ```js
    const obj = {
      name: "yt",
      age: 22,
    };
    
    const objProxy = new Proxy(obj, {});
    
    console.log(objProxy.name);  // yt
    console.log(objProxy.age);  // 22
    
    objProxy.name = "why";
    objProxy.age = 18;
    
    console.log(objProxy.name);  // why
    console.log(objProxy.age);  // 18
    ```

  - 如果想知道我们确实设置值了，确实获取值了，我们可以重写它的某些捕获器

    ```js
    const objProxy = new Proxy(obj, {
      // 获取值时的捕获器
      get(target, key) {
        console.log(`获取${key}的值`, target);
        return target[key];
      },
    
      // 设置值时的捕获器
      set(target, key, newValue) {
        target[key] = newValue;
        console.log(`为${key}设置值`, target);
      },
    });
    ```

    - target：就是obj
    - key：你需要操作的属性
    - newValue：设置的值
    - get和set都有最后一个参数，代表创建的这个Proxy对象：receiver

- 其他捕获器

  - 我们想要看一看某个属性在不在这个对象中，监听in的捕获器

    ```js
    const objProxy = new Proxy(obj, {
      // 监听in的捕获器
      has(target, key) {
        console.log(`监听到对${key}属性进行了in操作`);
        return key in target;
      },
    });
    
    console.log("name" in objProxy);
    /*
    监听到对name属性进行了in操作
    true
    */
    ```

  - 我们想要删除某个属性

    ```js
    const objProxy = new Proxy(obj, {
      // 监听delete的捕获器
      deleteProperty(target, key) {
        delete target[key];
        console.log(`监听到${key}属性被删除`, target)
      },
    });
    
    delete objProxy.name;
    // 监听到name属性被删除 { age: 22 }
    ```

### 3.还有一些Proxy的捕获器

- handler.getPrototypeOf 方法
  - Object.getPrototypeOf 方法的捕获器，获取某个对象的隐式原型
- handler.setPrototypeOf 方法
  - Object.setPrototypeOf 方法的捕获器，设置某个对象的隐式原型
- handler.isExtensible 方法
  - Object.isExtensible 方法的捕获器，判断某个对象能不能扩展

- handler.preventExtensions 方法
  - Object.preventExtensions 方法的捕捉器，对象中的所有属性的configurable全部设置为false
- handler.getOwnPropertyDescriptor 方法
  - Object.getOwnPropertyDescriptor 方法的捕捉器，获取对象某个属性的属性描述符
- handler.defineProperty 方法
  - Object.defineProperty 方法的捕捉器，设置对象某个属性的属性描述符
- handler.ownKeys 方法，获取对象所有的key
  - Object.getOwnPropertyNames 方法的捕捉器
  - Object.getOwnPropertySymbols 方法的捕捉器
- handler.apply 方法
  - 函数调用操作的捕捉器
- handler.construct 方法
  - new 操作符的捕捉器。

### 4.Proxy对函数对象的监听

```js
function foo(...args) {
  console.log(this, args)
};

const fooProxy = new Proxy(foo, {
  apply(target, thisArg, agrs) {
    console.log("监听到了foo被调用");
    return target.apply(thisArg, agrs);
  },
  construct(target, args) {
    console.log("监听到了foo被实例化");
    return new target(...args);  
  }
})

fooProxy.apply({}, ["abc", "nba"]);
new fooProxy("abc", 123);

/*
监听到了foo被调用
{} [ 'abc', 'nba' ]
监听到了foo被实例化
foo {} [ 'abc', 123 ]
*/
```

