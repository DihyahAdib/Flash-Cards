import { State } from "./state.js";
import { checkContainerStyle } from "../functions.js";
import { setCurrentMode, wait, randomizeArray, sortArray } from "../util.js";

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
    this.initEventHandlers();
  }
  initEventHandlers() {
    $("#pick-mode").on("click", this.showModal);
    $("#close-modal").on("click", this.hideModal);
    $("#remove-all").on("click", this.removeAllVocab.bind(this));
    $("#remove-one").on("click", this.removeOneVocab.bind(this));
    $("#inputbutton").on("click", this.toggleDisplayGrid);
    $("#cntrl-panel").on("click", this.openMiniControls);
    $("#close-modal-explanation").on("click", this.hideExplanation);
    $("#casual, #memo-mode").on("mouseover", this.showExplanation);
    $("#casual, #memo-mode").on("click", this.showCardMode);
    $(".shuffle-words").on("click", this.shuffleRegularWords.bind(this));
    $(".randomize-cards").on("click", this.shuffleFlashCardWords);
    $(".sort-words").on("click", this.sortRegularWords.bind(this));
    $("text-areas input").on("keypress", (e) => this.AddVocab(e));
    $("#memo-mode").on("click", this.memorizationMode);
    $("#input-vocab").on("click", this.addWords.bind(this));
    $("#cover").on("click mouseover", () => setCurrentMode(0));
    $("#casual").on("click mouseover", () => setCurrentMode(1));
    $("#memo-mode").on("click mouseover", () => setCurrentMode(2));
    $("#cover").on("click", () => this.setMode("cover"));
    $("#casual").on("click", () => this.setMode("casual"));
    $("#memo-mode").on("click", () => this.setMode("memo"));

    $(".next").on("click", async () => {
      await this.right();
    });

    $(".prev").on("click", async () => {
      await this.left();
    });
  }

  setMode(mode) {
    switch (mode) {
      case "cover":
        this.coverMode();
        break;
      case "casual":
        this.casualMode();
        break;
      case "memo":
        this.memorizationMode();
        break;
      default:
        throw new Error("no current mode");
    }
  }

  AddVocab(e) {
    if (e.key === "Enter") {
      this.addWords();
    }
  }

  removeOneVocab() {
    if (this.get("wordBank").length > 0) {
      this.get("wordBank").pop();
    } else {
      alert("No more words to remove!");
    }
  }

  removeAllVocab() {
    if (confirm("Are you sure you want to remove all words?")) {
      this.clear();
    }
  }

  shuffleRegularWords() {
    this.set("wordBank", randomizeArray(this.get("wordBank")));
    console.log("Re-Shuffled words:", this.get("wordBank"));
  }

  sortRegularWords() {
    sortArray(this.get("wordBank"));
    this.showCards(this.get("cardIndex"));
    console.log("Sorted words:", this.get("wordBank"));
  }

  shuffleFlashCardWords() {
    this.set("wordBank", randomizeArray(this.get("wordBank")));
    displayFlashCardWords();
    showCards(this.get("cardIndex"));
    console.log("Re-Shuffled words:", this.get("wordBank"));
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
    checkContainerStyle();
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

  async casualMode() {
    $("div.flash-card-object").each(function () {
      $(this).text(`${$(this).data("word")} : ${$(this).data("definition")}`);
    });

    this.set("wordBank", randomizeArray(this.get("wordBank")));
    this.displayFlashCardWords();
    await wait(600);
    this.showCards(this.get("cardIndex"));
    checkContainerStyle();
  }

  displayFlashCardWords() {
    $("flash-card-container").empty();

    this.get("wordBank").forEach(({ word, definition }) => {
      $("<div>")
        .addClass(`flash-card-object`)
        .text(`${word}`)
        .prependTo("flash-card-container")
        .data({ word, definition });
    });
  }
}
