// 替换类的构造函数
// 可以通过返回一个新的构造函数来替换原有的构造函数

function replaceConstructor<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      console.log('instance created') // second
    }
  }
}

@replaceConstructor
class User {
  constructor(public name: string) {
    console.log('User created') // first
  }
}

const doc = new User('Alice');


console.log(doc.name)     // Alice

export { }
