import 'reflect-metadata'; // 引入 'reflect-metadata' 库，用于元数据的反射操作

// 定义一个工厂函数 createParamDecorator，用于创建参数装饰器
export const createParamDecorator = (key: string) => {
  return (data?: any) => (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    const existingParameters = Reflect.getMetadata(`params`, target, propertyKey) || []; // 获取已经存在的参数元数据，如果不存在则初始化为空数组
    // console.log('existingParameters', existingParameters)
    existingParameters[parameterIndex] = { index: parameterIndex, key, data }; // 将当前参数的信息（index, key, data）添加到参数元数据中
    Reflect.defineMetadata(`params`, existingParameters, target, propertyKey); // 更新参数元数据到目标对象的属性上
  };
};


export const Request = createParamDecorator('Request'); // 使用 createParamDecorator 创建 'Request' 参数装饰器
export const Req = createParamDecorator('Req');// 使用 createParamDecorator 创建 'Req' 参数装饰器
export const Query = (queryKey?: string) => createParamDecorator(`Query`)(queryKey);
export const Headers = (headerKey?: string) => createParamDecorator(`Headers`)(headerKey);
export const Session = createParamDecorator('Session');
export const Ip = createParamDecorator('Ip');
export const Param = (paramKey?: string) => createParamDecorator(`Param`)(paramKey);
export const Body = (bodyKey?: string) => createParamDecorator(`Body`)(bodyKey);
export const Res = createParamDecorator('Res');
export const Response = createParamDecorator('Response');