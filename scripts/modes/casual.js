// Casual Mode Script //

import { randomizeArray } from "../functions/wordhandler.js";
import { save } from "../save.js";

$(".prev").on("click", () => plusCards(-1));
$(".next").on("click", () => plusCards(1));

let cardIndex = 1;
showCards(cardIndex);

export function plusCards(n) {
  showCards((cardIndex += n));
}

export function currentCards(n) {
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
    $("<div>")
      .addClass("flash-card-object mySlides")
      .html(`${word}: ${definition}`)
      .prependTo("flash-card-container");
    // $("<span>").addClass("dot").apendTo("dot-container");
  });
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
