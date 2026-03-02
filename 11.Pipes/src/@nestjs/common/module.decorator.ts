// 引入 reflect-metadata 库，用于处理元数据
import 'reflect-metadata';
// 模块的元数据 
export interface ModuleMetadata {
  controllers?: Function[];
  providers?: any[],
  exports?: any[], // 模块的导出 可以把自己的一部分providers导出给别的模块的，别的模块只要导入了自己这个模块
  imports?: any[]; // 模块的导入 可以导入别的模块，这样当前模块就可以使用别的模块的providers
}


// 定义 模块装饰器
export function Module(metadata: ModuleMetadata): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata('isModule', true, target);
    defineModule(target, metadata.controllers);
    Reflect.defineMetadata('controllers', metadata.controllers, target);
    // 给模块类AppModule 添加元数据 providers，值是 [LoggerService]
    // 在类上保存了一个providers的数组，表示给此模块注入的providers供应者
    // target 就是module
    defineModule(target, (metadata.providers ?? []).map(provider => provider instanceof Function ? provider : provider.useClass).filter(Boolean));
    Reflect.defineMetadata('providers', metadata.providers, target);
    Reflect.defineMetadata('exports', metadata.exports, target);
    Reflect.defineMetadata('imports', metadata.imports, target);
  };
}

export function defineModule(nestModule, targets) {
  (Array.isArray(targets) ? targets : [targets]).filter(Boolean).forEach(target => Reflect.defineMetadata('module', nestModule, target));
}

export function Global(): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata('global', true, target);
  };
}

export interface DynamicModule extends ModuleMetadata {
  module: Function;
}