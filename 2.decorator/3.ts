function logClass(constructor: Function) {
  console.log("constructor is:", constructor);  // class Person { ... } 构造函数
  console.log("constructor.name is:", constructor.name);  // Person  构造函数名称
  console.log("constructor === Person?", constructor === Person); // true
  console.log("构造函数的原型:", constructor.prototype); // {}
}

@logClass // 这个装饰器会应用到下面的 Person 类 
class Person {
  constructor(public name: string) {

  }
}

// 输出: Class created: Person

// 为什么 @logClass 要写在类声明上面？ 装饰器是一种声明式的语法，它告诉编译器/解释器：“对这个类/方法/属性应用特定的装饰逻辑”。
// 这就像给类贴上了一个标签，告诉 TypeScript 在创建这个类时要执行 logClass 函数。

// 写在下面行不行？不行，因为装饰器需要在类声明之前应用。
// 装饰器和类之间可以有空格或空行，只要装饰器在类声明之前

// 下面写两个 class 行不行 ？不行，装饰器只作用于紧接着它的那个类声明

// 装饰器实际上是一个函数调用
// Person = logClass(Person) || Person;
// logClass 函数接收构造函数作为参数，可以在此时执行一些逻辑

// 以堆叠多个装饰器，从上到下执行


// 类装饰器工厂
// 是一个返回装饰器函数的函数，可以接收参数来控制装饰器的行为
function logClassWithParams(params: string) {
  return function (constructor: Function) {
    console.log(params); // Creating class:
    console.log(constructor); // [Function: Car]
    console.log(constructor.name); // Car
  }
}

@logClassWithParams('Creating class:')
class Car {
  constructor(public name: string) {
  }
}

