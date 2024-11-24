// Saving Script //

const MODAL_NONE = "MODAL_NONE";
const MODAL_PICK_MODE = "MODAL_PICK_MODE";
const MODAL_PICK_MODE_EXP = "MODAL_PICK_MODE_EXP";
const MODAL_PLAY_MODE = "MODAL_PLAY_MODE";

const startingState = {
  wordBank: [],
  cardIndex: 1,
  currentModal: MODAL_NONE,
};

export class State {
  constructor() {
    this.load();
  }

  load() {
    this.obj =
      JSON.parse(localStorage.getItem("currentState")) || startingState;
  }

  save() {
    localStorage.setItem("currentState", JSON.stringify(this.obj));
  }

  set(key, value) {
    this.obj[key] = value;
    this.save();
  }

  onSet(fun) {
    if (this.set()) {
    }
  }

  get(key) {
    return this.obj[key];
  }

  clear() {
    this.obj = startingState;
    localStorage.removeItem("currentState");
    this.save();
  }
}
