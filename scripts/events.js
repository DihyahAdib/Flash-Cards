// Mode Selection Events
import {
  toggleDisplayGrid,
  displayWords,
  addWords,
} from "./functions/wordhandler.js";
import { setCurrentMode } from "./constants.js";
import { save } from "./save.js";

export async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

//Mode handlers //
$("#cover").on("click mouseover", () => setCurrentMode(0));
$("#casual").on("click mouseover", () => setCurrentMode(1));
$("#timed").on("click mouseover", () => setCurrentMode(2));
$("#memo-mode").on("click mouseover", () => setCurrentMode(3));

// Hover Events //
$("#cover, #casual, #timed, #memo-mode").on("mouseover", function () {
  $("body").addClass("show-modalExplanation-visibility");
});

// Click | Press Events //
$("#inputbutton").on("click", toggleDisplayGrid);

$("#pick-mode").on("click", async function () {
  $("body").addClass("show-modal-visibility");
});

$("#close-modal").on("click", function () {
  $("body").removeClass("show-modal-visibility");
});

$("#close-modal-explanation").on("click", function () {
  $("body").removeClass("show-modalExplanation-visibility");
});

$("#input-vocab").on("click", addWords);

$("#remove-one").on("click", function () {
  storeWords.pop();
  displayWords();
  save();
});

$("#remove-vocab").on("click", function () {
  storeWords.length = 0;
  localStorage.removeItem("storeWords");
  displayWords();
});

$("text-areas input").on("keypress", function (e) {
  if (e.key === "Enter") addWords();
});
