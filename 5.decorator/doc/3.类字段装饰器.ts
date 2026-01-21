type ClassFieldDecorator = (value: undefined, context: {
  kind: "field";
  name: string | symbol;
  access: { get(): unknown, set(value: unknown): void };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
}) => (initialValue: unknown) => unknown | void;

const logged = (value, context) => {
  console.log('value', value)
  console.log('context', context)
  if (context.kind === "field") {
    return function (initialValue) {
      console.log(`initializing ${context.name} with value ${initialValue}`);
      return initialValue;
    };
  }
}

class Class {
  @logged x = 1;
}

console.log(new Class().x)
// initializing x with value 1
export { }