// Mode Selection Events

import {
  showModal,
  hideModal,
  showExplanation,
  hideExplanation,
  AddVocab,
  removeOneVocab,
  removeAllVocab,
  showCardMode,
  hideCardMode,
} from "./functions/functions.js";

import {
  addWords,
  displayWords,
  randomizeArray,
} from "./functions/wordhandler.js";

import { setCurrentMode } from "./constants.js";
import { coverMode } from "./modes/cover.js";
import { casualMode, showCards, toggleDisplayGrid } from "./modes/casual.js";
import { timedMode } from "./modes/timed.js";
import { memorizationMode } from "./modes/memorization.js";

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
$("#timed").on("click", timedMode);
$("#memo-mode").on("click", memorizationMode);
$("#input-vocab").on("click", addWords);
$("#inputbutton").on("click", toggleDisplayGrid);
$("#pick-mode").on("click", function () {
  showModal();
});

$("#close-modal").on("click", function () {
  hideModal();
});

$("#casual, #timed, #memo-mode")
  .on("mouseover", function () {
    showExplanation();
  })
  .on("click", function () {
    showCardMode();
  });

$("button-close-flash-cards").on("click", function () {
  hideCardMode();
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

$(".randomize-cards").on("click", function () {
  for (let cool = 0; cool < 10; cool++) {
    randomizeArray(storeWords);
    casualMode();
  }
  console.log("Re-Shuffled words:", storeWords);
});
