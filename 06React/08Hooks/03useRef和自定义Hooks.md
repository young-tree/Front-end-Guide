### 1.useRef

- 返回一个ref对象，返回的这个ref对象在组件的整个生命周期中保持不变

- useRef最常用在两个地方

  - 一：获取元素
  - 二：保存一个数据，这个对象在整个生命周期中可以保存不变
    - 这个在useCallback那里说过

- 获取元素

  ```jsx
  import React, { memo, useRef } from 'react'
  
  const App = memo(() => {
    const titleRef = useRef()
    const inputRef = useRef()
  
    function showRef() {
      console.log(titleRef.current);
      inputRef.current.focus()
    }
  
    return (
      <div>
        <h2 ref={titleRef}>我是标题</h2>
        <input type="text" ref={inputRef}/>
        <button onClick={showRef}>展示</button>
      </div>
    )
  })
  
  export default App
  ```

### 2.自定义Hooks

- 自定义Hook是一种代码逻辑的抽取

- 案例一：获取滚动位置

  ```jsx
  function useScrollPosition() {
    const [scrollY, setScrollY] = useState(0)
  
    function scrollHandle() {
      setScrollY(window.scrollY)
    }
  
    useEffect(() => {
      window.addEventListener("scroll", scrollHandle)
  
      return () => {
        window.removeEventListener("scroll", scrollHandle)
      }
    }, [])
  
    return scrollY
  }
  
  const App = memo(() => {
    const scrollY = useScrollPosition()
  
    return (
      <div>
        <h2>App: {scrollY}</h2>
      </div>
    )
  })
  ```

  - 如果useEffect那里不写第二个参数，每次更新时都会添加新的事件监听，性能降低

- 案例二：localStorage存储数据

  ```jsx
  function useLocalStorage(key) {
    const [data, setData] = useState(() => {
      const item = localStorage.getItem(key)
      if(!item) return ""
      return item
    })
  
    useEffect(() => {
      JSON.stringify(localStorage.setItem(key, data))
    }, [data, key])
  
    return [data, setData]
  }
  
  const App = memo(() => {
    const [data, setData] = useLocalStorage("token")
    function setToken() {
      setData("你好啊")
    }
  
    return (
      <div>
        <h2>token: {data}</h2>
        <button onClick={setToken}>改变token</button>
      </div>
    )
  })
  ```

  