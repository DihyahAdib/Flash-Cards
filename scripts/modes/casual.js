// Casual Mode Script //

import { wait } from "../events.js";
import {
  displayFlashCardWords,
  randomizeArray,
} from "../functions/wordhandler.js";
import { save } from "../save.js";

$(".prev").on("click", () => plusCards(-1));
$(".next").on("click", () => plusCards(1));

window.cardIndex = 1;
window.plusCards = plusCards;
window.currentCards = currentCards;

export async function plusCards(n) {
  await wait(140); //some delay cuz ppl can spam
  showCards((cardIndex += n));
}

export async function currentCards(n) {
  await wait(140);
  showCards((cardIndex = n));
}

export async function showCards(n) {
  // debugger;
  let cards = $(".flash-card-object");

  if (n > cards.length) cardIndex = 1;
  if (n < 1) cardIndex = cards.length;

  cards.css("display", "none");

  cards
    .eq(cardIndex - 1) //current card
    .css("display", "grid");
  cards.eq(cardIndex - 1).addClass("slideInFromRight");
  await wait(500);
  cards.removeClass("slideInFromRight");
  cards.eq(cardIndex - 1).addClass("slideOutToLeft"); //current card
  await wait(500);
  cards.removeClass("slideOutToLeft");
  cards.eq(cardIndex - 1).css("display", "grid");
  checkContainerStyle();
}
function right() {}
function left() {}

export async function casualMode() {
  $("div.flash-card-object").each(function () {
    $(this).text(`${$(this).data("word")} : ${$(this).data("definition")}`);
  });

  randomizeArray(storeWords);
  displayFlashCardWords();

  $(document.body).ready(function () {
    showCards(cardIndex);
  });

  checkContainerStyle();
  save();
}

export function toggleDisplayGrid() {
  if ($("body").hasClass("casual-mode-has-columns")) {
    $("body").removeClass("casual-mode-has-columns");
    $(".inputbutton").text("Flash Card View");
  } else {
    $("body").addClass("casual-mode-has-columns");
    $(".inputbutton").text("List View");
  }
}

export function checkContainerStyle() {
  if (
    !$(".flash-card-container").hasClass("active-container") &&
    $(".flash-card-object").length > 0
  ) {
    $("flash-card-container").addClass("active-container");
  }
}
checkContainerStyle();
