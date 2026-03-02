import 'reflect-metadata';
import { INJECTED_TOKENS } from '@nestjs/common'
export function Inject(token: string): ParameterDecorator {
  // target类的原型，propertyKey方法名，parameterIndex参数索引
  return (target: Object, propertyKey: string, parameterIndex: number) => {
    // 获取现有的注入令牌数组，如果不存在则初始化为空数组
    const existingInjectedTokens = Reflect.getMetadata(INJECTED_TOKENS, target) ?? [];
    existingInjectedTokens[parameterIndex] = token;
    // 将更新后的注入令牌数组存储到类的元数据中
    Reflect.defineMetadata(INJECTED_TOKENS, existingInjectedTokens, target);
  }
}