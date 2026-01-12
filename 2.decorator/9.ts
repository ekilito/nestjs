// 元数据添加 实现参数的校验

import "reflect-metadata";
function required(target: any, propertyKey: string) {
  console.log(target, propertyKey); // {}（User.prototype）  username
  // 添加元数据， 就是给类的原型对象的 username 属性上添加元数据 required: true
  // 将 required: true 元数据绑定到 User.prototype 的 "username" 属性上
  Reflect.defineMetadata("required", true, target, propertyKey);
}

function validate(user: User) {
  console.log(user) // User { username: '' }
  for (let key in user) {
    // 检查该属性是否有 required 元数据，且值是否为空
    console.log(key)
    // 上面添加的添加类的原型上了，此处通过实例取没有问题，因为会找到原型链
    if (Reflect.getMetadata("required", user, key) && !user[key]) {
      throw new Error(`Property ${key} is required`);
    }
  }
}


class User {
  @required
  username: string

  // @required
  age: number    // 不在装饰器上
}

const user = new User();
user.username = "";
validate(user); // 抛出错误：Property username is required