```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  eating() {};

  static sleep() {};
};

class Student extends  Person {
  constructor(name, age, sno) {
    super(name, age);
    this.sno = sno;
  }

  studying() {};

  static work() {};
}

const stu = new Student("yt", 22, 1);
```

转化后

```js
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              "function" == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          }),
    _typeof(obj)
  );
}

function _inherits(subClass, superClass) {
  // 你是一个函数就不抛出异常, 你是一个null也不抛出异常
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  // 子类的显示原型赋值为一个空对象, 空对象的隐式原型指向父类的显示原型
  // 为子类的显示原型添加constructor属性
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });

  // 让子类的显示原型中的属性值不可被修改
  Object.defineProperty(subClass, "prototype", { writable: false });
  // 让子类的隐式原型指向父类，还有一个作用是让父类通过call被调用
  // 用于继承静态属性
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  // 将子类的隐式原型指向父类
  _setPrototypeOf = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  // 判断是否能使用Reflect
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    
    debugger
    // 获取父类
    var Super = _getPrototypeOf(Derived),
      result;
    // 相当于下面这个么写: 
    // var Super = _getPrototypeOf(Derived);
    // var result;
    if (hasNativeReflectConstruct) {
      // 这个this不是student, 而是new的实例对象
      // 所以调用这个_getPrototypeOf后, 返回的是实例对象的隐式原型
      // 这个实例对象的隐式原型指向Student.prototype(子类的显示原型)
      // 所constructor就是Student(子类)
      // 所以NewTarget就是Student
      var NewTarget = _getPrototypeOf(this).constructor;
      // new Super(...arguments);
      console.log(Super)
      // new Person(...arguments);
      // 就是在new Person
      // 但是呢, 却在给NewTarget的实例对象赋值
      // 所以这个result就是: Student{name: "yt", age: 22}
      // Super是父类, NewTarget是子类
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      // 直接通过apply调用父类
      result = Super.apply(this, arguments);
      
    }
    console.log(result)
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf.bind()
    : function _getPrototypeOf(o) {
        // 获取对象或者函数的隐式原型
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}


function Person(name, age) {
  // 检查是否通过new来操作函数, 如果不是就抛出异常
  _classCallCheck(this, Person);

  this.name = name;
  this.age = age;
}

// 为Person的显示原型添加实例方法
// 为Person这个函数对象添加静态方法
_createClass(
  Person,
  [
    {
      key: "eating",
      value: function eating() {}
    }
  ],
  [
    {
      key: "sleep",
      value: function sleep() {}
    }
  ]
);

// 实现继承
_inherits(Student, Person);

// _createSuper返回一个函数
var _super = _createSuper(Student);

function Student(name, age, sno) {
  var _this;

  // 检查是否通过new来操作函数, 如果不是就抛出异常
  _classCallCheck(this, Student);

  // 让父类通过call被调用
  _this = _super.call(this, name, age);
  _this.sno = sno;
  return _this;
}

// 为Student的显示原型添加实例方法
// 为Student这个函数对象添加静态方法
_createClass(
  Student,
  [
    {
      key: "studying",
      value: function studying() {}
    }
  ],
  [
    {
      key: "work",
      value: function work() {}
    }
  ]
);

var stu = new Student("yt", 22, 1);
```
