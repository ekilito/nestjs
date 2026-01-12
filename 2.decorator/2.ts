import 'reflect-metadata';

// 定义一个类
class MyClass {
  private myProperty: string;

  constructor(value: string) {
    this.myProperty = value;
  }

  // 定义一个方法，并为其添加元数据 
  @Reflect.metadata('customKey', 'customValue')
  // 原型方法
  myMethod() {
    console.log(`Executing myMethod`);
  }
}

/**
 * @Reflect.metadata('customKey', 'customValue') 其实是一个语法糖，可以简化我们对元数据的操作
 * 它等价于：
 * Reflect.defineMetadata('customKey', 'customValue', MyClass.prototype, 'myMethod');
 * @Reflect.metadata('customKey', 'customValue') 的作用是为 MyClass.prototype 上的 myMethod 方法添加元数据 customKey，值为 *customValue。
 */

// 实例化 MyClass
const instance = new MyClass('Hello');

// 1. Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey)：定义元数据。
// (给 instance 的 myProperty 属性定义一个元数据 属性 key1，值为 value1)
Reflect.defineMetadata('key1', 'value1', instance, 'myProperty');

// 2. Reflect.hasMetadata(metadataKey, target, propertyKey)：检查目标对象是否具有指定的元数据。
const hasMetadata = Reflect.hasMetadata('key1', instance, 'myProperty');
console.log(`Has metadata 'key1' for 'myProperty': ${hasMetadata}`); // true

// 3. Reflect.getMetadata(metadataKey, target, propertyKey)：获取目标对象的元数据。
const metadataValue = Reflect.getMetadata('key1', instance, 'myProperty');
console.log(`Metadata 'key1' value for 'myProperty': ${metadataValue}`); // value1

// 4. Reflect.getOwnMetadata(metadataKey, target, propertyKey)：获取目标对象的自有元数据。 （针对方法）
const ownMetadataValue = Reflect.getOwnMetadata('customKey', instance, 'myMethod');
console.log(`Own metadata 'customKey' value for 'myMethod': ${ownMetadataValue}`); // undefined

const ownMetadataValue2 = Reflect.getMetadata('customKey', instance, 'myMethod');
console.log(`Own metadata 'customKey' value for 'myMethod': ${ownMetadataValue2}`); // customValue
// 为什么上面两个获取的不一样？
// 因为 Reflect.getOwnMetadata 获取的是自有元数据，而 Reflect.getMetadata 获取的是所有元数据，包括继承的元数据。
// const ownMetadataValue = Reflect.getOwnMetadata('customKey', Reflect.getPrototypeOf(instance), 'myMethod'); 可以拿到
// const ownMetadataValue = Reflect.getOwnMetadata('customKey', MyClass.prototype, 'myMethod'); 可以拿到

// 5. Reflect.deleteMetadata(metadataKey, target, propertyKey)：删除目标对象的元数据。
Reflect.deleteMetadata('key1', instance, 'myProperty');
const deletedMetadata = Reflect.getMetadata('key1', instance, 'myProperty');
console.log(`Metadata 'key1' after deletion: ${deletedMetadata}`);  // undefined
