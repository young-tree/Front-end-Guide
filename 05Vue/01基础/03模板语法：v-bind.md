### 1.绑定基本属性

```html
<img v-bind:src="imgurl" alt="图片">
<a v-bind:href="link">百度一下</a>


<!-- 语法糖 -->
<img :src="imgurl" alt="图片">
```

- imgurl和link是data函数返回对象中的属性

### 2.绑定class

- 基本绑定

  ```html
  <h2 :class="young">{{message}}</h2>
  ```

- 对象绑定

  ```html
  <h2 :class="{active: true, title: true}">{{message}}</h2>
  <h2 :class="{active: isActive, title: isTitle}">{{message}}</h2>
  ```

  - key只能是字符串类型
  - value可以是任意类型

- 数组绑定

  ```html
  <h2 :class="['active', title]">{{message}}</h2>
  
  <h2 :class="['active', title, haveAgeOrGender ? 'age': gender]">{{message}}</h2>
  
  <h2 :class="['active', title, {gender: haveAgeOrGender}]">{{message}}</h2>
  ```

  - 数组中可以存放任意类型

### 3.绑定style

- 对象绑定

  ```html
  <h2 :style="{color: 'red'}">{{message}}</h2>
  
  <h2 :style="{color: finalColor}">{{message}}</h2>
  
  <h2 :style="{fontSize: '40px'}">{{message}}</h2>
  
  <h2 :style="{'font-size': '40px'}">{{message}}</h2>
  ```

- 数组绑定

  ```html
  <h2 :style="[{color: 'red'}, {color: finalColor}]">{{message}}</h2>
  ```

### 4.动态绑定属性

```html
<h2 :[name]="value">{{message}}</h2>
```

- 这里的name和value都是data函数返回对象中的属性

### 5.绑定对象

```html
<h2 v-bind="info">{{message}}</h2>
<h2 :="info">{{message}}</h2>
```

- info是一个data函数返回对象中的一个属性，这个属性是一个对象
- 这样做可以同时绑定很多的属性和值，简洁方便