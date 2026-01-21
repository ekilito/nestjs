type ClassDecorator = (value: Function, context: {
  kind: "class";
  name: string | undefined;
  addInitializer(initializer: () => void): void;
}) => Function | void;

function logged(value, context) {
  console.log('value', value); // [class Class]
  console.log('context', context);
  if (context.kind === "class") {
    return class extends value {
      constructor(public a: number) {
        super(a);
        console.log(`constructing an instance of ${context.name} with arguments ${a}`);
      }
    }
  }
}

@logged
class Class {
  constructor(public a: number) { }
}

new Class(1);
// constructing an instance of C with arguments 1
export { }