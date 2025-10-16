### 1.原理和使用

```html
<input type="text" :value="message" @input="message = $event.target.value">
<input type="text" v-model="name">
```

### 2.绑定其他

```html
<textarea v-model="intro"></textarea>

<input type="checkbox" v-model="isAgree">
<!-- 加value没有意义 -->

<input type="checkbox" v-model="hobbies" value="basketball">
<input type="checkbox" v-model="hobbies" value="football">
<input type="checkbox" v-model="hobbies" value="waterPolo">
<!-- 必须加value -->

<input type="radio" v-model="gender" value="male">
<!-- 本来是通过name进行互斥，但是现在可以通过v-model来实现互斥 -->
<input type="radio" v-model="gender" value="female">

<select v-model="fruit">
  <option value="apple">苹果</option>
  <option value="orange">橙子</option>
  <option value="banana">香蕉</option>
</select>
<!-- 可以不加value, 不加value的话, 会使用option中间的文字 -->
<select v-model="fruits" multiple size="2">
  <option value="apple">苹果</option>
  <option value="orange">橙子</option>
  <option value="banana">香蕉</option>
</select>
```

```js
{
  data: function() {
    return {
      intro: "Hello World!",
      isAgree: false,
      hobbies: [],
      gender: "male",
      fruit: "apple",
      fruits: ["apple", "orange"]
    }
  }
};
```

### 3.值绑定

```html
<select multiple size="3" v-model="fruits">
  <option v-for="item in allFruits" 
          :key="item.value" 
          :value="item.value">
    {{item.text}}
  </option>
</select>

<div class="hobbies">
  <template v-for="item in allHobbies" :key="item.value">
    <label :for="item.value">
      <input :id="item.value"
             type="checkbox"
             v-model="hobbies"
             :value="item.value">
      {{item.text}}
    </label>
  </template>
</div>
```

### 4.修饰符

- 将input事件改为change事件

  ```html
  <input type="text" v-model.lazy="message">
  ```

- 让绑定的message的值一直是number类型

  ```html
  <input type="text" v-model.number="message">
  
  <input type="number" v-model="message">
  <!-- 没有必要写number修饰符 -->
  ```

- 去掉无意义的空格

  ```html
  <input type="text" v-model.trim="message">
  ```

  

