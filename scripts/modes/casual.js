// Casual Mode Script //

import { wait } from "../events.js";
import { randomizeArray } from "../functions/wordhandler.js";
import { save } from "../save.js";
$(".prev").on("click", () => plusCards(-1));
$(".next").on("click", () => plusCards(1));

let cardIndex = 1;
export var wordTagNum = 0;

showCards(cardIndex);

export async function plusCards(n) {
  await wait(200);
  showCards((cardIndex += n));
}

export async function currentCards(n) {
  await wait(200);
  showSlides((slideIndex = n));
}

export function showCards(n) {
  let cards = $(".flash-card-object");
  let dots = $(".dot");
  if (n > cards.length) {
    cardIndex = 1;
  }
  if (n < 1) {
    cardIndex = cards.length;
  }
  cards.css("visibility", "none").css("display", "none");
  dots.removeClass("active");
  cards
    .eq(cardIndex - 1)
    .css("visibility", "visible")
    .css("display", "grid");
  checkContainerStyle();
  dots.eq(cardIndex - 1).addClass("active");
}

window.plusCards = plusCards;
window.currentCards = currentCards;

export async function casualMode() {
  $("button.new-element").each(function () {
    $(this).text(`${$(this).data("word")} : ${$(this).data("definition")}`);
  });
  randomizeArray(storeWords);

  storeWords.forEach(({ word, definition }) => {
    wordTagNum++;
    $("<div>")
      .addClass(`flash-card-object mySlides ${wordTagNum}`)
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
