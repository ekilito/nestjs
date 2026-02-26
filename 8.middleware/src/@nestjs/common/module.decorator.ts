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
    Reflect.defineMetadata('isModule', true, target); // 标记这是一个模块
    // metadata.controllers?.forEach(controller => {
    //   Reflect.defineMetadata('module', target, controller);
    // });
    // 使用 Reflect.defineMetadata 方法将 metadata.controllers 元数据定义到目标函数上，键为 'controllers'
    // 给模块类添加元数据 AppModule，元数据 controllers 值是 controllers数组[AppController]
    //给模块类添加元数据 AppModule,元数据的名字叫controllers,值是controllers数组[AppController]
    //给模块类AppModule添加元数据 providers，值是[LoggerService]
    //就是把控制器的类和提供者的类和对应的模块进行了关联
    defineModule(target, metadata.controllers);
    Reflect.defineMetadata('controllers', metadata.controllers, target);
    // 给模块类AppModule 添加元数据 providers，值是 [LoggerService]
    // 在类上保存了一个providers的数组，表示给此模块注入的providers供应者
    defineModule(target, metadata.providers ?? []);
    Reflect.defineMetadata('providers', metadata.providers, target);
    Reflect.defineMetadata('exports', metadata.exports, target);
    Reflect.defineMetadata('imports', metadata.imports, target);
  };
}

// 全局模块
export function defineModule(nestModule, targets = []) {
  //遍历targets数组，为每个元素添加元数据，key是nestModule,值是对应的模块
  targets.forEach(target => {
    Reflect.defineMetadata('module', nestModule, target);
  })
}

export function Global(): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata('global', true, target);
  };
}

export interface DynamicModule extends ModuleMetadata {
  module: Function;
}