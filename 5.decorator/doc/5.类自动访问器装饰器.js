class Class {
  #x = initializeX.call(this, 1);
  get x() {
    return this.#x;
  }
  set x(val) {
    this.#x = val;
  }
}
let { get: oldGet, set: oldSet } = Object.getOwnPropertyDescriptor(Class.prototype, "x");

const logged = (value, context) => {
  if (context.kind === "accessor") {
    let { get, set } = value;
    return {
      get() {
        console.log(`getting ${context.name}`);
        return get.call(this);
      },
      set(val) {
        console.log(`setting ${context.name} to ${val}`);
        return set.call(this, val);
      },
      init(initialValue) {
        console.log(`initializing ${context.name} with value ${initialValue}`);
        return initialValue;
      },
    };
  }
};

let {
  get: newGet = oldGet,
  set: newSet = oldSet,
  init: initializeX = (initialValue) => initialValue,
} = logged({ get: oldGet, set: oldSet }, { kind: "accessor", name: "x" }) ?? {};

Object.defineProperty(Class.prototype, "x", { get: newGet, set: newSet });
let clazz = new Class();
// initializing x with value 1
clazz.x;
// getting x
clazz.x = 123;
// setting x to 123
export {};

