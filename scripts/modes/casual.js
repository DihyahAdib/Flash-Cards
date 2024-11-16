// Casual Mode Script //

import { randomizeArray } from "../functions/wordhandler.js";
import { save } from "../save.js";

export async function casualMode() {
  $("button.new-element").each(function () {
    $(this).text(`${$(this).data("word")} : ${$(this).data("definition")}`);
  });
  randomizeArray(storeWords);

  storeWords.forEach(({ word, definition }) => {
    $("<button>")
      .addClass("flash-card-objects")
      .html(`${word}: ${definition}`)
      .appendTo("modal-container");
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
