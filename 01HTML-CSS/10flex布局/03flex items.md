### 1.order

- 决定了 flex items 的排布顺序
- 数字越小越往前排，数字越大越往后排

### 2.align-self

- 单独设置某一个item，覆盖之前设置的align-items
- stretch、flex-start、flex-end、center、baseline

### 3.flex-grow

- 默认值为：0
- 当某一行还有空间，即这一行的元素没有占满这一行，这个属性才会起作用
- 而为其设置的width不再起作用
- 如果这一行有剩余空间
  - 假如这一行有两个元素，分别为flex-grow: 1;和flex-grow: 2;
  - 那么第一个元素还需多占据的额外空间为：剩余空间 * 三分之一
  - 第二个元素还需多占据的额外空间为：剩余空间 * 三分之二
- 每个元素总宽度和高度，不能超过max-width/max-height

### 4.flex-shrink [ʃrɪŋk] 

- 默认值为：1
- 这一行元素都有设置宽度，但是总的宽度超过这一行的原有宽度
- 假如总共有4个，每个超出10px，总共超出了40px
- 又因为每个flex-shrink的默认值为1，所以每一个的宽度被压缩10px
- 那么相应的如果有一个item自己设置了2，那么他将被压缩：40px * 五分之二，另外三个为：40px * 五分之一，即原宽度 - 16，原宽度 -8，原宽度 -8，原宽度 -8
- felx-shrink压缩宽度或高度，不能小于min-width/min-height
- shrimp [ʃrɪmp] ：虾

### 5.flex-basis

- 设置flex item在main axis上的base size
  - 默认值：auto
  - 具体数值：比如100px
  - 最小宽度

### 6.flex

- flex-grow、flex-shrink、flex-basis的缩写属性