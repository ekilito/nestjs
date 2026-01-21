class C {
  #x = 1; // 使用私有字段存储值

  get x() {
    return this.#x;
  }

  set x(val) {
    this.#x = val;
  }
}