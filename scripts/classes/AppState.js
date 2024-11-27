import { State } from "./state.js";

export const VIEW = {
  STARTING: "STARTING",
  PICK_MODE_NO_EXPLAIN: "PICK_MODE_NO_EXPLAIN",
  EXPLAIN_COVER: "EXPLAIN_COVER ",
  EXPLAIN_CASUAL: "EXPLAIN_CASUAL",
  EXPLAIN_MEMO: "EXPLAIN_MEMO",
  CASUAL_MODE: "CASUAL_MODE",
  MEMO_MODE: "MEMO_MODE",
  BTN_MODE: "BTN_MODE",
};

export class AppState extends State {
  constructor() {
    super();
  }

  addWords() {
    const word = $("#text-area").val().trim();
    const definition = $("#definition-area").val().trim();

    if (word && definition) {
      this.set("wordBank", [...this.get("wordBank"), { word, definition }]);
      $("#text-area").val("");
      $("#definition-area").val("");
    } else {
      alert("Enter both the vocab & definition first!");
    }
  }
}
