// Casual Mode Script //

import { wait } from "../events.js";
import { randomizeArray } from "../functions/wordhandler.js";
import { save } from "../save.js";
$(".prev").on("click", () => plusCards(-1));
$(".next").on("click", () => plusCards(1));

let cardIndex = 1;
window.WordTagNum = 0;
window.randomizedWordTagNum = 0;
window.plusCards = plusCards;
window.currentCards = currentCards;

showCards(cardIndex);

export async function plusCards(n) {
  await wait(150);
  showCards((cardIndex += n));
}

export async function currentCards(n) {
  await wait(150);
  showSlides((slideIndex = n));
}

export function showCards(n) {
  let cards = $(".flash-card-object");
  if (n > cards.length) {
    cardIndex = 1;
  }
  if (n < 1) {
    cardIndex = cards.length;
  }
  cards.css("visibility", "none").css("display", "none");
  cards
    .eq(cardIndex - 1)
    .css("visibility", "visible")
    .css("display", "grid");
  checkContainerStyle();
}

export async function casualMode() {
  $("button.new-element").each(function () {
    $(this).text(`${$(this).data("word")} : ${$(this).data("definition")}`);
  });
  randomizeArray(storeWords);

  storeWords.forEach(({ word, definition }) => {
    randomizedWordTagNum++;
    $("<div>")
      .addClass(`flash-card-object mySlides ${randomizedWordTagNum}`)
      .text(`${word}`)
      .prependTo("flash-card-container");
  });
  save();
  await wait(100);
  checkContainerStyle();
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
  if (!$(".flash-card-container").hasClass("active-container")) {
    $("flash-card-container").addClass("active-container");
  }
}
checkContainerStyle();
