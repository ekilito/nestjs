// 导入 express 模块及相关类型
import express, { Express, Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
// 导入 path 模块
import path from 'path';
// 导入自定义的 Logger 模块
import { Logger } from './logger';

class NestApplication {

  private readonly app: Express = express(); // 定义一个私有的 express 应用实例
  private readonly module: any;   // 定义一个私有的模块变量

  constructor(module: any) {
    this.module = module;
    this.app.use(express.json()); // 解析 JSON 格式的请求体
    this.app.use(express.urlencoded({ extended: true })); // 解析 URL 编码的请求体
  }

  // 定义 use 方法，用于注册中间件
  use(middleware: (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => void) {
    this.app.use(middleware);
  }

  // 初始化应用 
  async init() { // 取出模块里所有的控制器，然后做好路由配置

    const controllers = Reflect.getMetadata('controllers', this.module) || [];  // 获取模块中的控制器元数据 [class AppControllers]
    Logger.log('AppModule dependencies initialized', 'InstanceLoader'); // 记录日志：应用模块依赖已初始化

    for (const Controller of controllers) {
      const controller = new Controller(); // 创建每个控制器实例
      const prefix = Reflect.getMetadata('prefix', Controller) || '/';   // 获取控制器的路由前缀元数据，默认为 '/'
      // 开始解析路由
      Logger.log(`${Controller.name} {${prefix}}:`, 'RoutesResolver');

      const controllerPrototype = Reflect.getPrototypeOf(controller);// 获取控制器的原型对象

      // 遍历控制器原型对象上的所有方法名
      for (const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
        const method = controllerPrototype[methodName]; // 获取原型上的方法 （index）

        const pathMetadata = Reflect.getMetadata('path', method);  // 获取方法的路径元数据
        const httpMethod = Reflect.getMetadata('method', method); // 获取方法的 HTTP 方法元数据
        const redirectUrl = Reflect.getMetadata('redirectUrl', method);
        const redirectStatusCode = Reflect.getMetadata('redirectStatusCode', method);
        const httpCode = Reflect.getMetadata('httpCode', method);
        const headers = Reflect.getMetadata('headers', method) || [];
        // 如果方法存在，则进行路由配置
        if (httpMethod) {
          // 组合路由路径
          const routPath = path.posix.join('/', prefix, pathMetadata);
          // 注册路由及其处理函数
          this.app[httpMethod.toLowerCase()](routPath, async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
            // 解析方法参数
            const args = this.resolveParams(controller, methodName, req, res, next);
            // 调用方法并获取结果
            const result = await method.call(controller, ...args);

            if (result && result.url) {
              res.redirect(result.statusCode || 302, result.url);
              return;
            }
            // 重定向到指定到 redirectUrl
            if (redirectUrl) {
              res.redirect(redirectStatusCode || 302, redirectUrl);
              return;
            }
            // 设置 HTTP 状态码
            if (httpCode) {
              res.status(httpCode);
            } else if (httpMethod === 'POST') {
              res.status(201);
            }
            // 判断controller 的 methodName 方法里有没有使用Response/Res参数装饰器 用了任何一个则不发送
            const responseMeta = this.getResponseMetadata(controller, methodName);
            // 如果没有注入 Response/Res 参数装饰器，或者注入了但是传递了 passthrough 选项 都会由Nestjs 返回响应！
            if (!responseMeta || (responseMeta.data?.passthrough)) {
              headers.forEach((header: { name: string; value: string }) => {
                res.setHeader(header.name, header.value);
                return res.send(result);
              });
            }
          });
          // 记录日志：映射路由路径和 HTTP 方法
          Logger.log(`Mapped {${routPath}, ${httpMethod}} route`, 'RouterExplorer');
        }
      }
    }
    // 记录日志：Nest 应用程序成功启动
    Logger.log('Nest application successfully started', 'NestApplication');
  }

  private getResponseMetadata(instance: any, methodName: string): any {
    const paramsMetadata = Reflect.getMetadata(`params`, instance, methodName) || [];
    return paramsMetadata.filter(Boolean).find((param: any) => param.key === 'Res' || param.key === 'Response' || param.key === 'Next');
  }

  // 解析方法参数
  private resolveParams(instance: any, methodName: string, req: ExpressRequest, res: ExpressResponse, next: Function): any[] {
    // 获取参数元数据
    const paramsMetadata = Reflect.getMetadata(`params`, instance, methodName) || [];
    // 根据参数的索引排序并返回参数数组
    return paramsMetadata.map((param: any) => {
      const { key, data } = param;
      switch (key) {
        case 'Request':
        case 'Req':
          return req;
        case 'Query':
          return data ? req.query[data] : req.query;
        case 'Headers':
          return data ? req.headers[data] : req.headers;
        case 'Session':
          return req.session;
        case 'Ip':
          return req.ip;
        case 'Param':
          return data ? req.params[data] : req.params;
        case 'Body':
          return data ? req.body[data] : req.body;
        case 'Res':
        case 'Response':
          return res;
        case 'Next':
          return next;
        default:
          return null;
      }
    });
  }

  // 启动 HTTP 服务器
  async listen(port: number) {
    // 初始化应用
    await this.init();
    // 调用 express 实例的 listen 方法启动一个 HTTP 服务器，监听 port 端口
    this.app.listen(port, () => {
      // 记录日志：应用正在运行
      Logger.log(`Application is running on: http://localhost:${port}`, 'NestApplication');
    });
  }
}

export { NestApplication };