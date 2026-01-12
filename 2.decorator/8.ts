// 方法缓存 方法装饰器可以实现缓存结果

function cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value; // 保存原始的factorial函数  [Function: factorial]
  const cacheMap = new Map<string, any>(); // 创建缓存存储 Map
  // 重写原方法
  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args); // 生成缓存键
    if (cacheMap.has(key)) {
      return cacheMap.get(key); // 缓存命中，直接返回结果
    }
    const result = originalMethod.apply(this, args); // 执行原方法
    cacheMap.set(key, result); // 缓存结果
    return result;
  };
  return descriptor;
}

class MathOperations {
  @cache
  factorial(n: number): number {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }
}

const mathOps = new MathOperations();
console.log(mathOps.factorial(5)); // 120
console.log(mathOps.factorial(5)); // 从缓存中获取结果