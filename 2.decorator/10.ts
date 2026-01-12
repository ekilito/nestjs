// 属性访问
// 还可以实现用属性装饰器 来进行访问控制 或者设置初始设置

function defaultValue(value: any) {
  return function (target: any, propKey: string) {
    // target 是 Settings.prototype（原型对象）
    console.log(target, propKey, value); // {} theme dark     { theme: [Getter/Setter] } timeout 30
    let val = value;
    const getter = function () {
      return val;
    };
    const setter = function (newVal) {
      val = newVal;
    };

    Object.defineProperty(target, propKey, {
      enumerable: true,
      configurable: true,
      get: getter,
      set: setter,
    });
  }
}

class Settings {
  @defaultValue('dark')
  theme: string
  @defaultValue(30)
  timeout: number
}

const s1 = new Settings();
console.log(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(s1), "theme"));
//有值 {get: [Function: getter],set: [Function: setter],enumerable: true,configurable: true}

console.log(Object.getOwnPropertyDescriptor(s1, "theme"));
//{ value: undefined,writable: true,enumerable: true,configurable: true}

console.log(s1.theme, "--theme");// undefined --theme
console.log(s1.timeout, "--timeout");// undefined --timeout