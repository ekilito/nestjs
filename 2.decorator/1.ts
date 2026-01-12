interface obj {
  a: number;
  b: number
}
const obj: obj = { a: 1, b: 2 }

// Reflect.get(target, propertyKey)：获取对象的属性值
console.log(Reflect.get(obj, 'a'))            // 1

// Reflect.set(target, propertyKey, value)：设置对象的属性值
Reflect.set(obj, 'b', 20)
console.log(obj.b)                     // 20

// Reflect.deleteProperty(target, propertyKey)：删除对象的属性值
const deleteResult = Reflect.deleteProperty(obj, 'a')
console.log(deleteResult)            // true
console.log(obj)                     // { b: 20 }

// Reflect.has(target, propertyKey)：检查对象是否有某个属性
console.log(Reflect.has(obj, 'a')) // false
console.log(Reflect.has(obj, 'b')) // true


// Reflect.defineProperty(target, propertyKey, descriptor)：定义对象的属性
const defineResult = Reflect.defineProperty(obj, 'newProp', {
  value: 'hello',
  writable: true,
  enumerable: false // 非枚举属性
})
console.log(defineResult) // true
console.log(obj) //  { b: 20, newProp: 'hello' }

// Reflect.getOwnPropertyDescriptor(target, propertyKey)：获取对象自有属性的描述符
const descriptor = Reflect.getOwnPropertyDescriptor(obj, 'b')
console.log(descriptor) // { value: 20, writable: true, enumerable: true, configurable: true }

// Reflect.ownKeys(target)：返回对象的所有自有属性的键
console.log(Reflect.ownKeys(obj)) // [ 'b', 'newProp' ]
