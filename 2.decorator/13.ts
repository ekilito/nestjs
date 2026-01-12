function parameter1Decorator1() {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    console.log('parameter1Decorator1');
  };
}
function parameter1Decorator2() {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    console.log('parameter1Decorator2');
  };
}
function parameter2Decorator1() {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    console.log('parameter2Decorator1');
  };
}
function parameter2Decorator2() {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    console.log('parameter2Decorator2');
  };
}


class Example {
  method(
    @parameter1Decorator2()
    @parameter1Decorator1()
    param1,
    @parameter2Decorator1()
    @parameter2Decorator2()
    param2
  ) {
    console.log('Method execution');
  }
}