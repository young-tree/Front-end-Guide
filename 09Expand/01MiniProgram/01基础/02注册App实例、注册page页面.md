### 1.注册App实例

- 操作一：判断小程序的进入场景

  ```js
  App({ onShow(res) { console.log(res) } })
  ```

  - res是一个对象，这个对象中有一个属性：scene，这个属性对应一个数字
  - 这个数字代表场景值，具体值所对应的场景请去官网查看

- 操作二：在全局共享数据

  ```js
  App({
    globalData: {
      name: "yt",
      level: 60
    }
  })
  ```

  - 特点：数据不是响应式的
  - 用途：主要用于共享一些固定的数据

- 操作三：生命周期函数

  ```js
  App({
    globalData: {
      token: "",
      userInfo: null
    },
    onLaunch() {
      // 1.发送网络请求, 请求一些必要的数据
      wx.request({ url: 'url' })
  
      // 2.获取本地的token和userInfo
      let token = wx.getStorageSync('token')
      let userInfo = wx.getStorageSync('userInfo')
  
      // 3.进行登录操作
      if(!token || !userInfo) {
        // 4.具体的登录操作, 后续再说
        // 5.往本地的storage中存放token和userInfo
        wx.setStorageSync('token', 'yttoken')
        wx.setStorageSync('userInfo', { name: "yt", age: 22 })
  
        // 6.给token和userInfo赋值
        token = 'yttoken'
        userInfo = { name: "yt", age: 22 }
      }
  
      // 7.将数据保存到globalData中, 进行全局共享
      this.globalData.token = token
      this.globalData.userInfo = userInfo
    }
  })
  ```

  - 补充两个生命周期函数
    - onShow：界面切到前台，只要界面显示，这个函数就会被回调
    - onHide：界面切到后台，只要界面消失，这个函数就会被回调

### 2.注册page页面

- 操作一：发送网络请求

  ```js
  Page({
    data: {
      banners: null,
      recommends: null
    },
    onLoad() {
      wx.request({
        url: 'http://123.207.32.32:8000/home/multidata',
        success: (res) => {
          const banners = res.data.data.banner.list;
          const recommends = res.data.data.recommend.list;
          this.setData({banners, recommends})
        }, 
      })
    }
  })
  ```

  ```html
  <view class="container">
    <swiper>
      <block wx:for="{{banners}}" wx:key="image">
        <swiper-item>
          <image src="{{item.image}}" mode="widthFix" class="img"></image>
        </swiper-item>
      </block>
    </swiper>
  </view>
  ```

  ```css
  .img { width: 750rpx; }
  ```

- 操作二：在本地定义一些固定的数据和绑定事件以及回调

  ```js
  Page({
    data: {
      counter: 100,
      color: ["red", "green", "black", "blue"]
    },
    onBtnClick(event) { console.log(event.target.dataset.color) }
  })
  ```

  ```html
  <block wx:for="{{color}}" wx:key="*this">
    <button 
      size="mini"
      style="color: {{item}};"
      data-color="{{item}}"
      bindtap="onBtnClick"
    >
      {{ item }}
    </button>
  </block>
  ```

- 操作三：下拉刷新、达到底部、页面滚动回调函数

  ```js
  Page({
    onPullDownRefresh() { console.log("下拉刷新") },
    onReachBottom() { console.log("上拉加载更多") },
    onPageScroll(event) { console.log("页面滚动", event) }
  })
  ```

  ```json
  { "enablePullDownRefresh": true }
  ```

- 操作四：其他生命周期函数

  ```js
  Page({
    onLoad() { console.log("load"); },
    onShow() { console.log("show"); },
    onReady() { console.log("ready"); },
    onHide() { console.log("hide"); },
    onUnload() { console.log("unload"); }
  })
  ```

![01](images/01.png)

