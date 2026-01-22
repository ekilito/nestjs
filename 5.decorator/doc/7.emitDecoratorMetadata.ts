import 'reflect-metadata';
// 类装饰器
function classDecorator(target: any) {

}
// 参数装饰器
function paramDecorator(target: any, propertyKey: string, parameterIndex: number) {

}
// 属性装饰器
function propDecorator(target: any, propertyKey: string) {

}
// 方法装饰器
function methodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

}
@classDecorator
class Example {
  @propDecorator
  myProperty: string;
  constructor(@paramDecorator serviceA: string, @paramDecorator serviceB: string) {
    console.log('Example instance created');
  }
  @methodDecorator
  myMethod(): string {
    return 'hello';
  }
}

// 获取属性的类型元数据
const propertyType = Reflect.getMetadata('design:type', Example.prototype, 'myProperty');
console.log('Property type:', propertyType.name);
const paramTypes = Reflect.getMetadata('design:paramtypes', Example);
console.log('Constructor param types:', paramTypes.map((type: any) => type.name));
const returnType = Reflect.getMetadata('design:returntype', Example.prototype, 'myMethod');
console.log('Method return type:', returnType.name);