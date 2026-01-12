// 引入 reflect-metadata 库，用于处理元数据
import 'reflect-metadata';
// 定义 ModuleMetadata 接口，包含一个可选的 controllers 属性，类型为 Function 数组
export interface ModuleMetadata {
  controllers?: Function[];
}
// 定义 Module 函数，接收一个 ModuleMetadata 类型的参数 metadata，返回一个 ClassDecorator
export function Module(metadata: ModuleMetadata): ClassDecorator {
  // 返回一个装饰器函数，接收一个目标函数（类）
  return (target: Function) => {
    // 使用 Reflect.defineMetadata 方法将 metadata.controllers 元数据定义到目标函数上，键为 'controllers'
    Reflect.defineMetadata('controllers', metadata.controllers, target);
  };
}