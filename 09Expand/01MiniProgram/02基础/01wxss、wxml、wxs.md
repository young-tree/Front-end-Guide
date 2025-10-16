### 1.wxss

```html
<view class="container">全局样式</view>
<view class="abc">页面中的样式</view>
<view style="color: red;">行内样式</view>
<view class="rpx">1px = 2rpx 在375的屏幕下</view>
```

```css
/* app.wxss */
.container { box-sizing: border-box }
```

```css
/* page.wxss */
.abc { border: 1px solid #000 }
.rpx { border: 2rpx solid #000 }
```

- wxss支持的选择器
  - 类选择器、id选择器、元素选择器、伪元素选择器
- 权重
  - !important、行内样式、id选择器、类选择器、元素选择器
- rpx
  - 以375作为视觉稿，1px = 2rpx

### 2.wxml

- mustache语法

  ```html
  <view>{{ message }}</view>
  <view>{{ name1 + name2 }}</view>
  <view>{{ date }}</view>
  ```

  ```js
  Page({
    data: {
      message: "Hello MiniProgram",
      name1: "yt1",
      name2: "yt2",
      date: new Date().toLocaleDateString()
    }
  })
  ```

- 条件判断

  ```html
  <view wx:if="{{ score >= 90 }}">优秀</view>
  <view wx:elif="{{ score >= 80 }}">良好</view>
  <view wx:elif="{{ score >= 60 }}">及格</view>
  <view wx:else>不及格</view>
  ```

- hidden属性

  ```html
  <view hidden>哈哈哈哈</view>
  
  <button bindtap="changeIsShow">切换</button>
  <view hidden="{{isShow}}">嘿嘿嘿</view>
  <view wx:if="{{!isShow}}">嘿嘿嘿</view>
  ```

  - 相当于vue中的v-show, 给元素的属性设置display为none

- 列表渲染

  ```html
  <!-- 1.遍历数组中的一个个对象 -->
  <block wx:for="{{books1}}" wx:key="time">
    <view>{{ item.name }} - {{ index }}</view>
  </block>
  <!-- 2.遍历数组 -->
  <block wx:for="{{books2}}" wx:key="*this">
    <view>{{item}} - {{index}}</view>
  </block>
  <!-- 3.遍历数字 -->
  <block wx:for="{{10}}" wx:key="*this">
    <view>{{item}}</view>
  </block>
  <!-- 4.遍历字符串 -->
  <block wx:for="yt" wx:key="*this">
    <view>{{item}}</view>
  </block>
  <!-- 5.改变item和index的名称 -->
  <block wx:for="{{books1}}" wx:key="time" wx:for-item="book" wx:for-index="indey">
    <view>{{ book.name }} - {{ indey }}</view>
  </block>
  ```

  ```js
  books1: [
    { name: "abc1", time: 2021 },
    { name: "abc2", time: 2022 },
    { name: "abc3", time: 2023 },
    { name: "abc4", time: 2024 },
  ],
  books2: ["abc1", "abc2", "abc3", "abc4"]
  ```

### 3.wxs

- 解决在mustache语法中无法使用js文件中的方法的问题

- 方式一

  ```html
  <wxs module="change">
    function changeName1() {
      return "abc"
    }
  
    module.exports = {
      changeName1: changeName1
    }
  </wxs>
  <view>{{ change.changeName1() }}</view>
  ```
  
- 方式二

  ```js
  // wxs文件
  function changeName1() {
    return "abc"
  }
  
  function changeCount(count) {
    if(count > 100000000) {
      return (count / 100000000).toFixed(1) + "亿"
    } else if (count > 10000) {
      return (count /  10000).toFixed(1) + "万"
    } else {
      return count
    }
  }
  
  function changeTime(time) {
    var minute = Math.floor(time / 1000 / 60)
    var finalM = minute[1] ? minute: "0" + minute
    var second = (time / 1000) % 60
    var finalS = second[1] ? second: "0" + second
  
    return finalM + ":" + finalS
  }
  
  module.exports = {
    changeName1: changeName1,
    changeCount: changeCount,
    changeTime: changeTime
  }
  ```

  ```html
  <wxs module="change" src="/utils/change.wxs"></wxs>
  <view>{{ change.changeName1() }}</view>
  <view>{{ change.changeCount(16540000) }}</view>
  <view>{{ change.changeCount(count) }}</view>
  <view>{{ change.changeCount(1600) }}</view>
  <view>{{ change.changeTime(240000) }}</view>
  ```

  





