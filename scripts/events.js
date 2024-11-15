// Mode Selection Events
import { toggleDisplayGrid, displayWords } from "./functions/wordhandler.js";
import { save } from "./save.js";
import { addWords } from "./functions/wordhandler.js";
import { setCurrentMode } from "./constants.js";

//Mode handlers//
$("#cover").on("click mouseover", () => setCurrentMode(0));
$("#casual").on("click mouseover", () => setCurrentMode(1));
$("#timed").on("click mouseover", () => setCurrentMode(2));
$("#memo-mode").on("click mouseover", () => setCurrentMode(3));
$("#cover, #casual, #timed, #memo-mode").on("mouseover", function () {});

// Input Events//
$("#inputbutton").on("click", toggleDisplayGrid);
$("#input-vocab").on("click", addWords);

$("#pick-mode").on("click", function () {
  $("body").addClass("show-modal-visibility");
});
$("#close-modal").on("click", function () {
  $("body").removeClass("show-modal-visibility");
});

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
