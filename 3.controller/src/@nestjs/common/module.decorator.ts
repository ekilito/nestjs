// 引入 reflect-metadata 库，用于处理元数据
import 'reflect-metadata';
// 模块的元数据 
export interface ModuleMetadata {
  controllers?: Function[];
}


// 定义 模块装饰器
export function Module(metadata: ModuleMetadata): ClassDecorator {
  return (target: Function) => {
    // 使用 Reflect.defineMetadata 方法将 metadata.controllers 元数据定义到目标函数上，键为 'controllers'
    // 给模块类添加元数据 AppModule，元数据 controllers 值是 controllers数组[AppController]
    Reflect.defineMetadata('controllers', metadata.controllers, target);
  };
}