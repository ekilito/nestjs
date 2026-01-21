function logged(value, { kind, name }) {
    if (kind === "class") {
        return class extends value {
            constructor(...args) {
                super(...args);
                console.log(`constructing an instance of ${name} with arguments ${args.join(", ")}`);
            }
        }
    }
}

class Class {
  constructor() {}
}

let NewClass = logged(Class, {
  kind: "class",
  name: "C",
});

new NewClass(1);
