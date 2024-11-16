// Casual Mode Script //

import { randomizeArray } from "../functions/wordhandler.js";
import { save } from "../save.js";

export async function casualMode() {
  $("button.new-element").each(function () {
    $(this).text(`${$(this).data("word")} : ${$(this).data("definition")}`);
  });
  randomizeArray(storeWords);
  // showFlashCards();
  save();
}

// export function showFlashCards() {
//   if ($(document.body).hasClass("modal-pick-mode "))
//   $(document.body).toggleClass("modal-play-mode");
// }
