import { State } from "./state.js";
import { wait, randomizeArray } from "../util.js";

export const VIEW = {
  STARTING: "STARTING",
  PICK_MODE_NO_EXPLAIN: "PICK_MODE_NO_EXPLAIN",
  EXPLAIN_COVER: "EXPLAIN_COVER ",
  EXPLAIN_CASUAL: "EXPLAIN_CASUAL",
  EXPLAIN_MEMO: "EXPLAIN_MEMO",
  COVER_MODE: "COVER_MODE",
  CASUAL_MODE: "CASUAL_MODE",
  MEMO_MODE: "MEMO_MODE",
};

export const startingState = {
  wordBank: [],
  cardIndex: 1,
  currentView: VIEW.STARTING,
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

  async plusCards(n) {
    this.set("cardIndex", this.get("cardIndex") + n);
    await this.showCards(this.get("cardIndex"));
  }

  async showCards(n) {
    let cards = $(".flash-card-object");

    if (n > cards.length) this.set("cardIndex", 1);
    if (n < 1) this.set("cardIndex", cards.length);

    cards.css("display", "none");
    cards.eq(this.get("cardIndex") - 1).css("display", "grid");

    $("div.flash-card-object").each(function () {
      $(this).text(`${$(this).data("word")} : ${$(this).data("definition")}`);
    });
    if (!$("flash-card-container").hasClass("active-container")) {
      $("flash-card-container").addClass("active-container");
    }
  }

  async right() {
    let cards = $(".flash-card-object");
    cards.eq(this.get("cardIndex") - 1).addClass("slideOutToRight");
    await wait(600);
    cards.removeClass("slideOutToRight");
    cards.eq(this.get("cardIndex") - 1).addClass("slideInFromLeft");
    await wait(600);
    await this.plusCards(1);
    cards.removeClass("slideInFromLeft");
  }

  async left() {
    let cards = $(".flash-card-object");
    cards.eq(this.get("cardIndex") - 1).addClass("slideOutToLeft");
    await wait(600);
    cards.removeClass("slideOutToLeft");
    cards.eq(this.get("cardIndex") - 1).addClass("slideInFromRight");
    await wait(600);
    await this.plusCards(-1);
    cards.removeClass("slideInFromRight");
  }
}
