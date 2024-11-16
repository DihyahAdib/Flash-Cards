// Mode Selection Events
import {
  toggleDisplayGrid,
  displayWords,
  addWords,
} from "./functions/wordhandler.js";
import {
  showModal,
  hideModal,
  showExplanation,
  hideExplanation,
  AddVocab,
  removeOneVocab,
  removeAllVocab,
} from "./functions/functions.js";
import { setCurrentMode } from "./constants.js";
import { coverMode } from "./modes/cover.js";
import { casualMode } from "./modes/casual.js";

export async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

//Mode handlers //
$("#cover").on("click mouseover", () => setCurrentMode(0));
$("#casual").on("click mouseover", () => setCurrentMode(1));
$("#timed").on("click mouseover", () => setCurrentMode(2));
$("#memo-mode").on("click mouseover", () => setCurrentMode(3));

// Click | Press Events //
$("#cover").on("click", coverMode);
$("#casual").on("click", casualMode);
$("#input-vocab").on("click", addWords);
$("#inputbutton").on("click", toggleDisplayGrid);
$("#pick-mode").on("click", function () {
  showModal();
});
$("#close-modal").on("click", function () {
  hideModal();
});
$("#cover, #casual, #timed, #memo-mode")
  .on("mouseover", function () {
    showExplanation();
  })
  .on("click", function () {
    $("body")
      .removeClass("modal-pick-mode modal-pick-mode-explain")
      .addClass("modal-play-mode");
  });
$("#close-modal-explanation").on("click", function () {
  hideExplanation();
});
$("text-areas input").on("keypress", function (e) {
  AddVocab(e);
});
$("#remove-one").on("click", function () {
  removeOneVocab();
});
$("#remove-vocab").on("click", function () {
  removeAllVocab();
});