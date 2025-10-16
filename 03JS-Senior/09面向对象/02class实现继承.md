### 1.extends关键字

```js
class Person {};

class Student extends Person {};
```

- Student继承自Person

### 2.super关键字

- 我们一般把Student称之为子类，或者派生类

- JS引擎在解析子类的时候就有要求

  - 如果要实现继承，需要在子类的构造方法中，于this之前，或者于return之前，必须调用一下super

    ```js
    class Person {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      };
    };
    
    class Student extends Person {
      constructor(name, age, sno) {
        super(name, age);
    
        this.sno = sno;
      };
    };
    
    var stu = new Student("why", 18, 1);
    console.log(stu);  // Student { name: 'why', age: 18, sno: 1 }
    ```

### 3.关于方法的继承

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  };

  eating() {
    console.log(this.name + " 在吃饭~");
  };
};

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age);

    this.sno = sno;
  };

  studying() {
    console.log(this.name + " 在学习~");
  };
};

var stu = new Student("why", 18, 1);
stu.eating();  // why 在吃饭~
stu.studying();  // why 在学习习~
```

- 我们对Person中定义的eating方法不满意，可以在Student（子类）中进行方法的重写

  ```js
  class Student extends Person {
    constructor(name, age, sno) {
      super(name, age);
  
      this.sno = sno;
    };
    
    eating() {
      console.log("Student " + this.name + " 在吃饭~")
    }
  };
  
  var stu = new Student("why", 18, 1);
  stu.eating();  // Student why 在吃饭~
  ```

### 4.子类对父类方法的重写扩展

- 子类中的方法有一些处理逻辑，我们认为这些处理逻辑不够用，想要在子类中加入一些额外的处理逻辑

  - super的第二个用法：复用父类里面的处理逻辑

  ```js
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    };
    
    personMethod() {
      console.log("逻辑处理1");
      console.log("逻辑处理2");
      console.log("逻辑处理3");
    };
  };
  
  class Student extends Person {
    constructor(name, age, sno) {
      super(name, age);
  
      this.sno = sno;
    };
  
    personMethod() {
      super.personMethod();
  
      console.log("逻辑处理4");
      console.log("逻辑处理5");
      console.log("逻辑处理6");
    };
  };
  
  var stu = new Student("why", 18, 1);
  stu.personMethod();
  /* 
  逻辑处理1  
  逻辑处理2  
  逻辑处理3  
  逻辑处理4  
  逻辑处理5  
  逻辑处理6 
  */
  ```

### 5.继承静态方法

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  };

  static personS() {
    console.log("Person类的静态方法");
  };
};

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age);

    this.sno = sno;
  };
};

var stu = new Student("why", 18, 1);
Student.personS();  // Person类的静态方法
```

- 子类重写静态方法

  ```js
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    };
  
    static personS() {
      console.log("Person类的静态方法");
    };
  };
  
  class Student extends Person {
    constructor(name, age, sno) {
      super(name, age);
  
      this.sno = sno;
    };
    
    static personS() {
      console.log("重写父类的静态方法");
    };
  };
  
  var stu = new Student("why", 18, 1);
  Student.personS();  // 重写父类的静态方法
  ```

- 通过super调用父类的静态方法

  ```js
  class Student extends Person {
    constructor(name, age, sno) {
      super(name, age);
  
      this.sno = sno;
    };
    
    static personS() {
      super.personS();
      console.log("重写父类的静态方法");
    };
  };
  
  var stu = new Student("why", 18, 1);
  Student.personS();
  /*
  Person类的静态方法
  重写父类的静态方法
  */
  ```

  