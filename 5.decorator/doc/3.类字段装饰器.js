
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

let initializeX = logged(undefined, {
    kind: "field",
    name: "x"
})

class Class {
    x = initializeX.call(this, 1);
}

// console.log(new Class().x)
// initializing x with value 1
