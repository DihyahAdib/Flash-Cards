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
  BTN_MODE: "BTN_MODE",
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

  async showCards(n) {
    const cards = $(".flash-card-object");
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
    // debugger;
    const $currentCard = $(".flash-card-object").eq(this.get("cardIndex"));

    $currentCard.addClass("slideOutToRight");
    await wait(2000);
    $(".flash-card-object").removeClass("slideOutToRight");

    $currentCard.addClass("slideInFromLeft");
    await wait(2000);
    $(".flash-card-object").removeClass("slideInFromLeft");

    if (this.get("cardIndex") > $(".flash-card-object").length - 1)
      this.set("cardIndex", 0);
    this.set("cardIndex", this.get("cardIndex") + 1);
    await this.showCards(this.get("cardIndex"));
  }

  async left() {
    const $currentCard = $(".flash-card-object").eq(this.get("cardIndex"));
    $currentCard.addClass("slideOutToLeft");
    await wait(2000);
    $currentCard.removeClass("slideOutToLeft");
    $currentCard.addClass("slideInFromRight");
    await wait(2000);
    $currentCard.removeClass("slideInFromRight");
    if (this.get("cardIndex") < 0)
      this.set("cardIndex", $(".flash-card-object").length - 1);
    this.set("cardIndex", this.get("cardIndex") - 1);
    await this.showCards(this.get("cardIndex"));
  }
}
