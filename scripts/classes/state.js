// Saving Script //

export class State {
  constructor() {
    this.onSetCallback = () => {};
  }

  load(startingState) {
    this.obj =
      JSON.parse(localStorage.getItem("currentState")) || startingState;
    this.onSetCallback(this.obj);
    return this;
  }

  save() {
    localStorage.setItem("currentState", JSON.stringify(this.obj));
    return this;
  }

  set(key, value) {
    this.obj[key] = value;
    this.onSetCallback(this.obj);
    this.save();
    return this;
  }

  removeArrayItem(key, itemToRemove) {
    if (!Array.isArray(this.obj[key])) {
      throw new Error("This only works for arrays!");
    }
    this.set(
      key,
      this.obj[key].filter((item) => !_.isEqual(item, itemToRemove))
    );
  }

  onSet(fun) {
    this.onSetCallback = fun;
    return this;
  }

  get(key) {
    return this.obj[key];
  }

  clear() {
    this.obj = startingState;
    localStorage.removeItem("currentState");
    this.save();
    return this;
  }
}
