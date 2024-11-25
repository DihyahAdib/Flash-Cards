// Saving Script //

export class State {
  constructor() {}

  load(startingState) {
    this.obj =
      JSON.parse(localStorage.getItem("currentState")) || startingState;
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
