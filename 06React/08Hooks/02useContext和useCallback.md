### 1.useContext

- 创建Context

  ```js
  import { createContext } from "react"
  
  const UserContext = createContext()
  const ThemeContext = createContext()
  
  export { UserContext, ThemeContext }
  ```

- 共享数据

  ```jsx
  import { UserContext, ThemeContext } from "./02useContext/context"
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
  	<UserContext.Provider value={{name: "yt", age: 22}}>
      <ThemeContext.Provider value={{color: "red", fontSize: 30}}>
        <App />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
  ```

- 使用useContext

  ```jsx
  import { UserContext, ThemeContext } from "./context"
  
  const App = memo(() => {
    const user = useContext(UserContext)
    const theme = useContext(ThemeContext)
  
    return (
      <div>
        <h2>name: {user.name} - age: {user.age}</h2>
        <h2 style={{...theme}}>theme</h2>
      </div>
    )
  })
  ```

### 2.useCallback

- 函数定义

  ```jsx
  const App = memo(() => {
    const [counter, setCounter] = useState(0)
    const increment = () => setCounter(counter + 1)
  
    return (
      <div>
        <h2>{counter}</h2>
        <button onClick={increment}>+1</button>
      </div>
    )
  })
  ```

  - 如果App这个函数被执行了多次，那么increment这个函数在内存里也会被创建多次

- 使用useCallback

  ```js
  const increment = useCallback(() => setCounter(counter + 1))
  ```

  - 这么使用是没有做任何的优化的，useCallback中的那个函数依然会被定义多次

- 传入第二个参数，空数组，出现问题

  ```js
  const increment = useCallback(() => setCounter(counter + 1), [])
  ```

  - 当我点击加的按钮时，第一次会从0变为1，然后不管点击加按钮多少次，都是1
  - 这是因为存在闭包陷阱
  - 假如一上来，目前useCallback中的这个参数是foo1，然后后面可能要点击加按钮，再定义的函数为foo2
  - 由于第二个参数是空数组，没有任何依赖，所以它一直在使用foo1，而foo1所捕获到的counter一直是0

- 添加依赖

  ```js
  const increment = useCallback(() => setCounter(counter + 1), [counter])
  ```

  - 添加了依赖就可以了，但是和我下面直接这么写有啥区别吗？

    ```js
    const increment = () => setCounter(counter + 1)
    ```

  - 目前没有区别
  
- 使用某个组件

  ```jsx
  const Hello = memo((props) => {
    const {increment} = props
  
    return (
      <div>
        <button onClick={increment}>Hello+1</button>
      </div>
    )
  })
  
  const App = memo(() => {
    const [counter, setCounter] = useState(0)
  
    const increment = useCallback(() => setCounter(counter + 1), [counter])
  
    return (
      <div>
        <h2>{counter}</h2>
        <button onClick={increment}>+1</button>
  
        <Hello increment={increment}/>
      </div>
    )
  })
  ```

  - 这个时候和使用普通的函数依然没有区别
  - 当我们点击App的+1时依然会渲染Hello，因为counter发生了改变，useCallback中依然会定义新的函数
    - 传过去的increment依然是新的函数

- 做出修改

  ```jsx
  const App = memo(() => {
    const [counter, setCounter] = useState(0)
    const [message, setMessage] = useState("Hello")
  
    const increment = useCallback(() => setCounter(counter + 1), [counter])
  
    return (
      <div>
        <h2>{counter}</h2>
        <h2>{message}</h2>
        <button onClick={increment}>+1</button>
  
        <Hello increment={increment}/>
        <button onClick={e => setMessage(Math.random())}>修改message</button>
      </div>
    )
  })
  ```

  - 当我修改message时，Hello是否依然会跟着渲染，不会，因为increment一直是第一个函数，没有改变

- 结论：把一个函数传递给子组件时，让函数包裹一个useCallback，经useCallback优化后的函数再传给子组件

- 再优化，当counter发生变化时，一直用第一个函数，就是即便counter变化了，也不再创建新的函数

  - 使用useRef

    ```js
    const counterRef = useRef()
    counterRef.current = counter
    
    const increment = useCallback(() => setCounter(counterRef.current + 1), [])
    ```

    - counterRef永远都在使用同一个对象，不管你这个组件渲染多少次
    - counterRef有一个属性为current，我们把counter赋值给他，当我们点击+1时，counterRef.current就会加1，以此来更新counter，这样子组件就不会多次重新渲染了
  
- 整体的解释

  - 第一次渲染时，我们给counterRef.current赋值为0
  - 但我们点击了+1按钮，就会执行increment函数，然后counterRef.current + 1
    - 此时counterRef.current依然是0，因为不是counterRef.current += 1
    - 但是counter是1了，此时要重新执行App这个组件
  - 当重新执行App这个组件时，counterRef.current就变成了1，赋值了嘛
  - 然后又点击，再循环往复
  - 但是有一个点要注意，counterRef一直是同一个对象，虽然current一直在变，但是依然是同一个对象
  - 且useCallback没有依赖任何东西，所以increment一直是第一个函数，继而在数值变化时，Home组件不会被多次重新渲染，实现性能优化

