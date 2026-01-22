// 在没有使用 IOC 的时候，我们需要直接负责创建依赖的对象

class Engine {
  start() {
    console.log('Engine started');
  }
}

class Car {
  private engine: Engine; // 组合关系：Car 包含一个 Engine 实例

  constructor() {
    this.engine = new Engine();
  }

  drive() {
    this.engine.start();
    console.log('Car is driving');
  }
}

// 使用 Car 类
const car = new Car();
car.drive();