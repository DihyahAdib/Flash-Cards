// Saving Script //

import { randomizeArray, sortArray } from "../util.js";

export class State {
  constructor() {
    this.onSetCallback = () => {};
  }

  load(fallbackState) {
    this.obj =
      JSON.parse(localStorage.getItem("currentState")) || fallbackState;
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
    return this;
  }

  shuffle(key) {
    this.set(key, randomizeArray(this.get(key)));
    return this;
  }

  sort(key) {
    this.set(key, sortArray(this.get(key)));
    return this;
  }

  pop(key) {
    this.obj[key].pop();
    this.set(key, this.obj[key]);
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
    localStorage.removeItem("currentState");
    window.location.reload();
    return this;
  }
}
