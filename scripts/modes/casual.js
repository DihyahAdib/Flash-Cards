// Casual Mode Script //

import { wait } from "../events.js";
import {
  displayFlashCardWords,
  randomizeArray,
} from "../functions/wordhandler.js";
import { save } from "../save.js";

$(".next").on("click", async function () {
  await wait(140);
  right();
});

$(".prev").on("click", async function () {
  await wait(140);
  left();
});

window.cardIndex = 1;
window.plusCards = plusCards;
window.currentCards = currentCards;

export async function plusCards(n) {
  showCards((cardIndex += n));
}

export async function currentCards(n) {
  showCards((cardIndex = n));
}

export async function showCards(n) {
  let cards = $(".flash-card-object");

  if (n > cards.length) cardIndex = 1;
  if (n < 1) cardIndex = cards.length;

  cards.css("display", "none");
  cards
    .eq(cardIndex - 1) //current card
    .css("display", "grid");
  checkContainerStyle();
}

async function right() {
  let cards = $(".flash-card-object");
  plusCards(1);
  cards.eq(cardIndex - 1).addClass("slideOutToRight");
  await wait(600);
  cards.removeClass("slideOutToRight");
  cards.eq(cardIndex - 1).addClass("slideInFromLeft"); //current card
  await wait(600);
  cards.removeClass("slideInFromLeft");
}

async function left() {
  let cards = $(".flash-card-object");
  plusCards(-1);
  cards.eq(cardIndex - 1).addClass("slideOutToLeft"); //current card
  await wait(600);
  cards.removeClass("slideOutToLeft");
  cards.eq(cardIndex - 1).addClass("slideInFromRight");
  await wait(600);
  cards.removeClass("slideInFromRight");
}

export async function casualMode() {
  $("div.flash-card-object").each(function () {
    $(this).text(`${$(this).data("word")} : ${$(this).data("definition")}`);
  });

  randomizeArray(storeWords);
  displayFlashCardWords();
  await wait(600);
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
