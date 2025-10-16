### 1.Emmet

- Emmet（前身是Zen Coding）
  - 可以大幅度提高前端开发效率的工具
  - 在前端开发过程中，大部分的工作是写HTML和CSS代码
  - 如果手动敲，效率很低
- VSCode内置了Emmet语法，在后缀为.html和.css的文件中输入缩写，按下tab键或者回车键，即可生成代码
- 比如输入!或者html:5，再按回车键或者tab键，即可一键生成完整的html5代码

### 2.>和+

- `>` 表示子代
- `+` 表示兄弟

![image-20220405091310719](https://s2.loli.net/2022/04/05/J29drGBQusVOI8H.png)

### 3.*和^

- `*` 表示多个
- `^` 表示上一级

![image-20220405091523732](https://s2.loli.net/2022/04/05/YirSsqHhZCVNeI9.png)

### 4.()

- `()` 表示分组

  - div>(header>ul>li*2)+footer>p

    <img src="https://s2.loli.net/2022/04/07/6qiwmGo2CaJLBSp.png" alt="image-20220407073827197" style="zoom: 50%;" />

### 5.属性和{}

- 属性

  - id属性：`#`
  - class属性：`.`
  - 普通属性：`[attr]`

  ![image-20220405091924567](https://s2.loli.net/2022/04/05/CPwaVc3vtu98xYN.png)

- `{}` 表示内容

  ![image-20220405091916338](https://s2.loli.net/2022/04/05/Ld1CiSk8KUuneMG.png)

### 6.$

- `$` 表示数字

  ![image-20220405091957392](https://s2.loli.net/2022/04/05/NdZcqXK5vyOwefm.png)

### 7.隐式标签

- `.box+.container`

  ![image-20220405092058386](https://s2.loli.net/2022/04/05/OXGKaEm8PstMcw1.png)

- ul>.item*5

  ![image-20220405092127240](https://s2.loli.net/2022/04/05/nmJFz4bel2QcNSo.png)

### 8.CSS中的Emmet

![image-20220405092302373](https://s2.loli.net/2022/04/05/jbpJ9h5oTNYHVIR.png)

- dib

  ```css
  display: inline-block;
  ```

- bd

  ```css
  border: 1px solid #000;
  ```

  