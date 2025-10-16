### 1.系统bind的使用

```js
function foo(num1, num2, num3, num4) {
  console.log(this, num1, num2, num3, num4);
};

var bindFn = foo.bind({}, 20, 30, 40, 50);
bindFn();

var bindFn = foo.bind({});
bindFn(20, 30, 40, 50);

var bindFn = foo.bind({}, 20, 30);
bindFn(40, 50);
```

### 2.初步实现

```js
Function.prototype.ytbind = function(thisArg, ...arg) {
  var fn = this;

  thisArg = thisArg ? Object(thisArg): window; 
  function proxyFn() {
    thisArg.fn = fn;
    var result = thisArg.fn(...arg);
    delete thisArg.fn;
    return result;
  };

  return proxyFn;
};

function foo(num1, num2, num3, num4) {
  console.log(this, num1, num2, num3, num4);
};

var bar = foo.ytbind("abc", 20, 30, 40, 50);
bar();
```

### 3.在bar中传递参数

```js
Function.prototype.ytbind = function(thisArg, ...arg) {
  var fn = this;

  thisArg = thisArg ? Object(thisArg): window; 
  function proxyFn(...subArg) {
    thisArg.fn = fn;
    var allArg = [...arg, ...subArg]
    var result = thisArg.fn(...allArg);
    delete thisArg.fn;
    return result;
  };

  return proxyFn;
};

function foo(num1, num2, num3, num4) {
  console.log(this, num1, num2, num3, num4);
};

var bar = foo.ytbind("abc", 20, 30);
bar(40, 50);
```

