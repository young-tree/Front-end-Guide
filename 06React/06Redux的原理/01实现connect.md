### 1.基本逻辑

<img src="images/image-20220915104627759.png" alt="image-20220915104627759" style="zoom:67%;" />

<img src="images/image-20220915104659269.png" alt="image-20220915104659269" style="zoom:67%;" />

- 传给connect两个函数，返回一个函数，这个函数是一个高阶组件
- 高阶组件接受一个组件，返回一个组件，使用返回的组件时，其实是在使用接收的那个组件

### 2.整体架构

<img src="images/image-20220915105057541.png" alt="image-20220915105057541" style="zoom:67%;" />

### 3.数据发生变化

<img src="images/image-20220915105300501.png" alt="image-20220915105300501" style="zoom:67%;" />

### 4.整体

<img src="images/image-20220915105356318.png" alt="image-20220915105356318" style="zoom:67%;" />

### 5.问题

- 这里的store不能这么引入

- 创建context

  <img src="images/image-20220915105525508.png" alt="image-20220915105525508" style="zoom:67%;" />

- 共享store

  <img src="images/image-20220915105741883.png" alt="image-20220915105741883" style="zoom:67%;" />

- 使用共享的store

  <img src="images/image-20220915105807342.png" alt="image-20220915105807342" style="zoom:67%;" />

- context就是store本身

  <img src="images/image-20220915110032903.png" alt="image-20220915110032903" style="zoom:67%;" />

