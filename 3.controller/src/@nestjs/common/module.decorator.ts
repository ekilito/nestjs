// 引入 reflect-metadata 库，用于处理元数据
import 'reflect-metadata';
// 模块的元数据 
export interface ModuleMetadata {
  controllers?: Function[];
  providers?: any[],
  exports?: any[],
  imports?: any[]
}


// 定义 模块装饰器
export function Module(metadata: ModuleMetadata): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata('isModule', true, target); // 标记这是一个模块
    // 使用 Reflect.defineMetadata 方法将 metadata.controllers 元数据定义到目标函数上，键为 'controllers'
    // 给模块类添加元数据 AppModule，元数据 controllers 值是 controllers数组[AppController]
    Reflect.defineMetadata('controllers', metadata.controllers, target);
    // 给模块类AppModule 添加元数据 providers，值是 [LoggerService]
    // 在类上保存了一个providers的数组，表示给此模块注入的providers供应者
    Reflect.defineMetadata('providers', metadata.providers, target);
    Reflect.defineMetadata('exports', metadata.exports, target);
    Reflect.defineMetadata('imports', metadata.imports, target);
  };
}