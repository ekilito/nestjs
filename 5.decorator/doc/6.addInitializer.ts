// addInitializer 是一个允许在类或类成员完成定义后运行额外初始化逻辑的函数

type ClassDecoratorContext = {
  kind: "class";
  name: string | undefined;
  addInitializer(initializer: () => void): void;
};

const withLogging = (value: Function, context: ClassDecoratorContext) => {
  if (context.kind === "class") {
    context.addInitializer(function () {
      console.log(`Class ${context.name} is initialized.`);
    });
  }
};
@withLogging
class MyClass {
  constructor() {
    console.log("Constructor of MyClass called.");
  }
}

new MyClass();

