import 'reflect-metadata';
export const createParamDecorator = (keyOrFactory: String | Function) => {
  return (data?: any, ...pipes: any[]) => (target: any, propertyKey: string, parameterIndex: number) => {
    const existingParameters = Reflect.getMetadata(`params`, target, propertyKey) ?? [];
    if (keyOrFactory instanceof Function) {
      existingParameters[parameterIndex] = { parameterIndex, key: 'DecoratorFactory', factory: keyOrFactory, data, pipes };
    } else {
      existingParameters[parameterIndex] = { parameterIndex, key: keyOrFactory, data, pipes };
    }
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