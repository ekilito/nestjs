import 'reflect-metadata';
export function Injectable(): ClassDecorator {
  return function (target: Function) {
    // 给类的定义添加元数据，表示这个类是可注入的 数据名称为 'injectable'，值为 true
    Reflect.defineMetadata('injectable', true, target)
  }
}