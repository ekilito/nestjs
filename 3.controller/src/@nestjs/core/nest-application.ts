// 导入 express 模块及相关类型
import express, { Express, Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
// 导入 path 模块
import path from 'path';
// 导入自定义的 Logger 模块
import { Logger } from './logger';

// 定义 NestApplication 类
class NestApplication {
  // 定义一个私有的 express 应用实例
  private readonly app: Express = express();
  // 定义一个私有的模块变量
  private readonly module: any;

  // 构造函数，接收一个模块参数
  constructor(module: any) {
    this.module = module;
  }
  // 定义 use 方法，用于注册中间件
  use(middleware: (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => void) {
    this.app.use(middleware);
  }
  // 定义 init 方法，初始化应用
  async init() {
    // 获取模块中的控制器元数据
    const controllers = Reflect.getMetadata('controllers', this.module) || [];
    // 记录日志：应用模块依赖已初始化
    Logger.log('AppModule dependencies initialized', 'InstanceLoader');
    // 遍历所有控制器
    for (const Controller of controllers) {
      // 创建控制器实例
      const controller = new Controller();
      // 获取控制器的路由前缀元数据，默认为 '/'
      const prefix = Reflect.getMetadata('prefix', Controller) || '/';
      // 获取控制器的原型对象
      const controllerPrototype = Reflect.getPrototypeOf(controller);
      // 记录日志：映射控制器名称和前缀
      Logger.log(`${Controller.name} {${prefix}}:`, 'RoutesResolver');
      // 遍历控制器原型对象上的所有方法
      for (const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
        const method = controllerPrototype[methodName];
        // 获取方法的路径元数据
        const pathMetadata = Reflect.getMetadata('path', method);
        // 获取方法的 HTTP 方法元数据
        const httpMethod = Reflect.getMetadata('method', method);
        if (httpMethod) {
          // 组合路由路径
          const routPath = path.posix.join('/', prefix, pathMetadata);
          // 注册路由及其处理函数
          this.app[httpMethod.toLowerCase()](routPath, async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
            const result = await method.call(controller);
            res.send(result);
          });
          // 记录日志：映射路由路径和 HTTP 方法
          Logger.log(`Mapped {${routPath}, ${httpMethod}} route`, 'RouterExplorer');
        }
      }
    }
    // 记录日志：Nest 应用程序成功启动
    Logger.log('Nest application successfully started', 'NestApplication');
  }
  // 定义 listen 方法，监听指定端口
  async listen(port: number) {
    // 初始化应用
    await this.init();
    // 监听指定端口
    this.app.listen(port, () => {
      // 记录日志：应用正在运行
      Logger.log(`Application is running on: http://localhost:${port}`, 'NestApplication');
    });
  }
}
// 导出 NestApplication 类
export { NestApplication };