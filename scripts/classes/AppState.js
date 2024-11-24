import { State } from "./state.js";
import { checkContainerStyle } from "../functions.js";
import { setCurrentMode, wait, randomizeArray, sortArray } from "../util.js";

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
    $("#casual, #timed, #memo-mode").on("mouseover", this.showExplanation);
    $("#casual, #timed, #memo-mode").on("click", this.showCardMode);
    $(".shuffle-words").on("click", this.shuffleRegularWords.bind(this));
    $(".randomize-cards").on("click", this.shuffleFlashCardWords);
    $(".sort-words").on("click", this.sortRegularWords.bind(this));
    $("text-areas input").on("keypress", (e) => this.AddVocab(e));
    $("#timed").on("click", this.timedMode);
    $("#memo-mode").on("click", this.memorizationMode);
    $("#input-vocab").on("click", this.addWords.bind(this));
    $("#cover").on("click mouseover", () => setCurrentMode(0));
    $("#casual").on("click mouseover", () => setCurrentMode(1));
    $("#timed").on("click mouseover", () => setCurrentMode(2));
    $("#memo-mode").on("click mouseover", () => setCurrentMode(3));
    $("#cover").on("click", () => this.setMode("cover"));
    $("#casual").on("click", () => this.setMode("casual"));
    $("#timed").on("click", () => this.setMode("timed"));
    $("#memo-mode").on("click", () => this.setMode("memo"));
    $(".next").on("click", async () => {
      await this.right();
    });

    $(".prev").on("click", async () => {
      await this.left();
    });

    // $("").on("click", hideCardMode);
  }

  setMode(mode) {
    switch (mode) {
      case "cover":
        this.coverMode();
        break;
      case "casual":
        this.casualMode();
        break;
      case "timed":
        this.timedMode();
        break;
      case "memo":
        this.memorizationMode();
        break;
      default:
        throw new Error("no current mode");
    }
  }

  showModal() {
    $("body").addClass("modal-pick-mode");
  }

  hideModal() {
    $("body").removeClass("modal-pick-mode");
  }

  showExplanation() {
    $("body").addClass("modal-pick-mode-explain");
  }

  hideExplanation() {
    $("body").removeClass("modal-pick-mode-explain");
  }

  showCardMode() {
    $("body")
      .removeClass("modal-pick-mode modal-pick-mode-explain")
      .addClass("modal-play-mode");
  }

  hideCardMode() {
    $("body")
      .addClass("modal-pick-mode modal-pick-mode-explain")
      .removeClass("modal-play-mode");
  }

  openMiniControls() {
    $("body").addClass("modal-ctrl-panel");
  }

  AddVocab(e) {
    if (e.key === "Enter") {
      this.addWords();
    }
  }

  removeOneVocab() {
    if (this.get("wordBank").length > 0) {
      this.get("wordBank").pop();
      this.displayRegularWords();
    } else {
      alert("No more words to remove!");
    }
  }

  removeAllVocab() {
    if (confirm("Are you sure you want to remove all words?")) {
      this.clear();
      this.displayRegularWords();
    }
  }

  shuffleRegularWords() {
    this.set("wordBank", randomizeArray(this.get("wordBank")));
    this.displayRegularWords();
    console.log("Re-Shuffled words:", this.get("wordBank"));
  }

  sortRegularWords() {
    this.sortArray(this.get("wordBank"));
    this.displayRegularWords();
    this.showCards(this.get("cardIndex"));
    console.log("Sorted words:", this.get("wordBank"));
  }

  shuffleFlashCardWords() {
    this.set("wordBank", randomizeArray(this.get("wordBank")));
    displayFlashCardWords();
    showCards(this.get("cardIndex"));
    console.log("Re-Shuffled words:", this.get("wordBank"));
  }

  displayRegularWords() {
    $("words-container").empty();
    this.get("wordBank").forEach(({ word, definition }) => {
      const $button = $("<button>");
      $button
        .addClass(`new-element`)
        .text(`${word} : ${definition}`)
        .on("click", () => {
          $button.remove();
          this.set(
            "wordBank",
            this.get("wordBank").filter(function ({
              word: storedWord,
              definition: storedDefinition,
            }) {
              return !(word === storedWord && definition === storedDefinition);
            })
          );
        })
        .appendTo("words-container")
        .data({ word, definition });
    });
  }

  addWords() {
    const word = $("#text-area").val().trim();
    const definition = $("#definition-area").val().trim();

    if (word && definition) {
      this.set("wordBank", [...this.get("wordBank"), { word, definition }]);
      $("#text-area").val("");
      $("#definition-area").val("");
      this.displayRegularWords();
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
