// 类装饰器 
function classDecorator() {
  return function (constructor: Function) {
    console.log('Class decorator');
  };
}

// 方法装饰器
function methodDecorator() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('Method decorator');
  };
}

// 访问器装饰器
function accessorDecorator() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator');
  };
}

// 属性装饰器
function propertyDecorator() {
  return function (target: any, propertyKey: string) {
    console.log('Property decorator');
  };
}

function parameterDecorator() {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    console.log('Parameter decorator');
  };
}

@classDecorator()
class Example {
  @propertyDecorator()
  prop: string;

  @accessorDecorator()
  get myProp() {
    return this.prop;
  }

  @methodDecorator()
  method(@parameterDecorator() param: any) {
    console.log('Method execution');
  }
}