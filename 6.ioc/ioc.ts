import "reflect-metadata"; // 导入 reflect-metadata 库以启用元数据反射

// 定义一个 Injectable 装饰器，用于标记可注入的类
function Injectable(): ClassDecorator {
  return (target: Function) => {
    // 这个装饰器不需要执行任何操作，仅用于元数据生成
  };
}

@Injectable()
class Engine {
  start() {
    console.log('Engine started');
  }
}

@Injectable()
class Car {
  // 通过构造函数依赖注入 Engine 实例
  constructor(private engine: Engine) { }
  drive() {
    this.engine.start();
    console.log('Car is driving');
  }
}

// 定义一个依赖注入的容器类
class DIContainer {
  private services = new Map<string, any>(); // 用于存储服务实例的 Map 对象
  // 注册服务
  register<T>(name: string, Service: new (...args: any[]) => T): void {
    this.services.set(name, Service); // 把类的名称和类的构造函数存放到Map 中
  }
  // 解析服务
  resolve<T>(name: string): T {
    // 获取服务的实现类
    const Service = this.services.get(name);
    if (!Service) {
      throw new Error(`Service ${name} not found`);
    }
    // 获取实现类的构造函数参数类型
    const dependencies = Reflect.getMetadata('design:paramtypes', Service) || [];
    // 递归解析所有依赖项
    const injections = dependencies.map((dep: any) => this.resolve(dep.name));
    // 创建并返回实现类的实例
    return new Service(...injections);
  }
}

// 创建一个依赖注入的容器实例
const container = new DIContainer();
// 注册 Engine 和 Car 服务
container.register<Engine>('Engine', Engine);
container.register<Car>('Car', Car);

// 解析 Car 服务并调用其 drive 方法
const car = container.resolve<Car>('Car');
car.drive();

// Engine started
// Car is driving