### 1.安装依赖

- npm install @reduxjs/toolkit react-redux

### 2.创建片段

```js
import { createSlice } from "@reduxjs/toolkit"

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 100
  },
  reducers: {
    addNumberAction(state, { payload }) {
      state.count += payload
    },
    subNumberAction(state, { payload }) {
      state.count -= payload
    }
  }
})

export const { addNumberAction, subNumberAction } = counterSlice.actions
export default counterSlice.reducer
```

### 3.创建store

```js
import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./modules/counter"

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

export default store
```

### 4.应用store

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux"

import store from "./06redux中的Hooks/store"
import App from './06redux中的Hooks/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### 5.使用和派发数据

```jsx
import React, { memo } from 'react'
import { useSelector, useDispatch, shallowEqual } from "react-redux"

import { addNumberAction, subNumberAction } from "./store/modules/counter"

const App = memo(() => {
  const { counter } = useSelector((state) => ({
    counter: state.counter.count
  }), shallowEqual)

  const dispatch = useDispatch()
  function dispatchNumber(num, isSub = true) {
    if(isSub) {
      dispatch(addNumberAction(num))
    } else {
      dispatch(subNumberAction(num))
    }
  }

  return (
    <div>
      <h2>App: {counter}</h2>
      <button onClick={e => dispatchNumber(1)}>+1</button>
      <button onClick={e => dispatchNumber(1, false)}>-1</button>
    </div>
  )
})
```

### 6.性能优化

- 当我们的组件点击了+1按钮，整个组件会不会重新进行渲染？会的，因为count发生了变化
- 假如我们还有一个组件，这个组件通过useSelector映射了state中的message
- 并且这个组件在App组件中进行了使用，当我们点击+1按钮时子组件会不会进行重新渲染
- 会的，因为useSelector它所判断的是你这个state中是否有数据变化，如果有数据变化，就重新渲染整个组件
- 再一个，如果我在子组件改message，你这个App组件居然也会重新渲染，性能很低
- 怎么办呢？使用shallowEqual，为useSelector传入第二个参数，之后它就只比较当前用到的数据是否发生了变化，性能提高

