import 'reflect-metadata';
// 定义一个名为 createParamDecorator 的装饰器工厂函数，接受一个 keyOrFactory 参数
export const createParamDecorator = (keyOrFactory: String | Function) => {
  // 返回一个装饰器函数，接受 data 和可变参数 pipes
  return (data?: any, ...pipes: any[]) => (target: any, propertyKey: string, parameterIndex: number) => {
    // 如果 data 存在且为对象，并且具有 transform 属性，将其作为管道处理
    if (data && typeof data === 'object' && data.transform) {
      pipes.unshift(data); // 将 data 插入到 pipes 的最前面
      data = undefined; // 将 data 置为 undefined
    }
    // 获取现有的参数元数据，如果不存在则初始化为空数组
    const existingParameters = Reflect.getMetadata(`params`, target, propertyKey) ?? [];
    // 获取参数的元类型
    const metatype = Reflect.getMetadata('design:paramtypes', target, propertyKey)[parameterIndex];
    // 如果 keyOrFactory 是一个函数，定义装饰器工厂参数
    if (keyOrFactory instanceof Function) {
      existingParameters[parameterIndex] = { parameterIndex, key: 'DecoratorFactory', factory: keyOrFactory, data, pipes, metatype };
    } else {
      // 否则，定义普通的装饰器参数
      existingParameters[parameterIndex] = { parameterIndex, key: keyOrFactory, data, pipes, metatype };
    }
    // 将参数元数据定义到目标方法上
    Reflect.defineMetadata(`params`, existingParameters, target, propertyKey);
  }
}
export const Request = createParamDecorator('Request');
export const Req = createParamDecorator('Req');
export const Query = createParamDecorator('Query');
export const Headers = createParamDecorator('Headers');
export const Session = createParamDecorator('Session');
export const Ip = createParamDecorator('Ip');
export const Param = createParamDecorator('Param');
export const Body = createParamDecorator('Body');
export const Response = createParamDecorator('Response');
export const Res = createParamDecorator('Res');
export const Next = createParamDecorator('Next');