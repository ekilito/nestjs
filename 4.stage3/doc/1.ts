const log = (value, context) => {
  console.log(value, context);
}

@log
class Person {
  getName() { }
}
