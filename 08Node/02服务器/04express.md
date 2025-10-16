### 1.单文件上传

- 使用第三方库multer
- 请求示例：<img src="images/image-20221117101905433.png" alt="image-20221117101905433" style="zoom:50%;" />
- 代码示例：<img src="images/image-20221117102050867.png" alt="image-20221117102050867" style="zoom:50%;" />，有的时候就得自己创建文件夹<img src="images/image-20221117102137307.png" alt="image-20221117102137307" style="zoom:50%;" /><img src="images/image-20221117102210455.png" alt="image-20221117102210455" style="zoom:50%;" />，加上后缀名就可以查看了：<img src="images/image-20221117102318585.png" alt="image-20221117102318585" style="zoom:33%;" />

### 2.多文件上传

- 请求示例：<img src="images/image-20221117113548015.png" alt="image-20221117113548015" style="zoom:50%;" />
- 代码示例：<img src="images/image-20221117113617646.png" alt="image-20221117113617646" style="zoom:50%;" /><img src="images/image-20221117113629788.png" alt="image-20221117113629788" style="zoom:50%;" />

### 3.解析formdata

- 一般不会通过formdata来传递数据：<img src="images/image-20221117115116621.png" alt="image-20221117115116621" style="zoom:50%;" />
- 代码示例：<img src="images/image-20221117115051012.png" alt="image-20221117115051012" style="zoom:50%;" />结果：<img src="images/image-20221117115145821.png" alt="image-20221117115145821" style="zoom:50%;" />

### 4.querystring和params的解析

- querystring的解析
  - 请求示例：<img src="images/image-20221117120804270.png" alt="image-20221117120804270" style="zoom: 50%;" />
  - 代码示例和结果：<img src="images/image-20221117120915619.png" alt="image-20221117120915619" style="zoom:50%;" />
- params的解析
  - 请求示例：<img src="images/image-20221117121344355.png" alt="image-20221117121344355" style="zoom:50%;" />
  - 代码示例和结果：<img src="images/image-20221117121426942.png" alt="image-20221117121426942" style="zoom:50%;" />

### 5.res对象

- 我们一般用end是比较少的，因为我们一般是返回json数据，所以使用json方法比较多：<img src="images/image-20221117124621413.png" alt="image-20221117124621413" style="zoom:50%;" /><img src="images/image-20221117124640432.png" alt="image-20221117124640432" style="zoom: 50%;" />
- 除了以上两个方法还有一个status方法：<img src="images/image-20221117124845947.png" alt="image-20221117124845947" style="zoom:50%;" /><img src="images/image-20221117124859271.png" alt="image-20221117124859271" style="zoom:50%;" />

### 6.路由

- 代码示例：<img src="images/image-20221117154011129.png" alt="image-20221117154011129" style="zoom:50%;" />
- 将路由部分的代码抽取出来：<img src="images/image-20221117154609444.png" alt="image-20221117154609444" style="zoom:50%;" />

### 7.静态资源服务器

- 将一个图片文件夹作为静态资源
  - 我们之前上传过很多图片资源，如何才能让用户访问呢？<img src="images/image-20221117160954017.png" alt="image-20221117160954017" style="zoom:50%;" />
  - 地址跟上图片名称即可访问：![image-20221117161029333](images/image-20221117161029333.png)
- 将一个项目作为静态资源
  - 之前我们开发过很多项目，打包之后交给nginx，让nginx作为静态资源服务器，我们也可以交给node
  - 复制一个之前打包的目录：<img src="images/image-20221117161621845.png" alt="image-20221117161621845" style="zoom:50%;" />，代码：<img src="images/image-20221117161804821.png" alt="image-20221117161804821" style="zoom:50%;" />效果：<img src="images/image-20221117161725879.png" alt="image-20221117161725879" style="zoom: 25%;" />

### 8.错误处理方案

- 我们在访问服务器的时候并不是每次都是正确的，比如过期的token，比如错误的密码，不存在的用户等
- 当出现这些错误时，我们应该给客户端返回错误信息
  - 方案一：返回http错误码，比如：res.status(401)或者res.json("未授权")
  - 方案二：返回http错误码为200，明明是一个错误的请求，为啥还要返回200，会把错误信息包含进去
    - 举例：res.json({code: -1001, message: "未授权，请检查token"})
    - 示例：<img src="images/image-20221117173334865.png" alt="image-20221117173334865" style="zoom:50%;" />
    - 但是这种方式并不优雅，因为正确的代码和错误的代码都在一起
  - 方案三：<img src="images/image-20221117191555564.png" alt="image-20221117191555564" style="zoom:50%;" /><img src="images/image-20221117191626322.png" alt="image-20221117191626322" style="zoom:50%;" />

