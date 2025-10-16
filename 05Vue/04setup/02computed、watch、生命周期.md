### 1.computed

```js
const firstName = ref("Kobe")
const lastName = ref("Bryant")
const fullName = computed(() => firstName.value + " " + lastName.value)
```

- 代替computed选项
- 也可以给computed函数传递一个对象，写相应的set和get方法

### 2.watch

1.侦听单个数据源

```js
// 对ref的侦听
const name = ref("web")
watch(name, (newValue, oldValue) => console.log(newValue, oldValue))
```

- watch需要侦听特定的数据源，并且需要执行其回调函数
- 默认情况下它是惰性的
  - 惰性的意思是，只有当被侦听的源发生变化时才会执行回调（第二个参数）
  - 第一次是不执行的

```js
// 对于reactive的侦听
const info = reactive({name: "young", age: 18})
watch(() => info.name, (newValue, oldValue) => console.log(newValue, oldValue))

// 还有一些侦听整个reactive的方式, reactive本身就用的少, 这里不给出案例
```

2.侦听多个数据源

```js
const name1 = ref("web1")
const name2 = ref("web2")
watch([info, info2], (newValue, oldValue) => console.log(newValue, oldValue))
```

3.选项(深度侦听和立即执行)

- 默认是深度侦听的，错了，默认不是深度侦听
  - reactive不写getter函数，直接写值，默认是深度侦听
- 启用第三个参数，对象，两个属性，分别是deep和immediate

### 3.watchEffect

1.正常使用

```js
const name = ref("young")
const age = ref(21)

const stop = watchEffect(() => console.log(name.value, age.value))
```

- 上来就会执行一次
- 收集依赖console.log(name.value, age.value)这里面的依赖
  - 也就是监听name和age的值什么时候改变了
  - 如果改变了就会执行() => console.log(name.value, age.value)这个函数

- 停止侦听，需要停止侦听时执行stop()即可

2.选项

- 第二个参数是一个对象
- 这个对象中有一个flush属性
  - 值为pre：默认值，在DOM挂载前就会进行第一次执行，所以拿不到DOM元素
  - 值为post：等到DOM挂载完毕，再进行第一次的执行，这样才可以拿到DOM元素
  - 值为sync：不要用，强制同步
- 与之对应的也有两个方法
  - watchPostEffect和watchSyncEffect

3.与watch的区别

- watch不会在第一次执行（懒执行）
  - watchEffect一定会在一开始执行一次
- watch可以说明具体哪个或者哪些状态发生了变化，变化时触发watch的回调
  - watchEffect不能具体说明，它自己会收集相关依赖
- watch可以访问变化前后的值
  - watchEffect不能，只能在它自己收集的依赖发生变化之后，执行自己的回调函数

### 4.生命周期

|   选项式 API    | Hook inside `setup` |
| :-------------: | :-----------------: |
| `beforeCreate`  |     Not needed      |
|    `created`    |     Not needed      |
|  `beforeMount`  |   `onBeforeMount`   |
|    `mounted`    |     `onMounted`     |
| `beforeUpdate`  |  `onBeforeUpdate`   |
|    `updated`    |     `onUpdated`     |
| `beforeUnmount` |  `onBeforeUnmount`  |
|   `unmounted`   |    `onUnmounted`    |
|   `activated`   |    `onActivated`    |
|  `deactivated`  |   `onDeactivated`   |

### 5.provide和inject

```js
import { ref, readonly, provide } from "vue"

const name = ref("youngtree")
const counter = ref(0)

provide("name", readonly(name))
provide("counter", readonly(counter))
```

```js
import { inject } from "vue"

const name = inject("name", "默认值")
const counter = inject("counter", 10)  // 第二个参数是默认值

const addOne = () => counter.value++  // 会报警告, 执行失败
```

