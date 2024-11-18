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
  shuffleRegularWords,
  shuffleFlashCardWords,
  sortRegularWords,
} from "./functions/functions.js";

import { addWords } from "./functions/wordhandler.js";

import { setCurrentMode } from "./constants.js";
import { coverMode } from "./modes/cover.js";
import { casualMode, toggleDisplayGrid } from "./modes/casual.js";
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
$("#casual, #timed, #memo-mode").on("mouseover", showExplanation);

// Click | Press Events //
$("#cover").on("click", coverMode);
$("#casual").on("click", casualMode);
$("#timed").on("click", timedMode);
$("#memo-mode").on("click", memorizationMode);
$("#input-vocab").on("click", addWords);
$("#inputbutton").on("click", toggleDisplayGrid);
$("#pick-mode").on("click", showModal);
$("#close-modal").on("click", hideModal);
$("#casual, #timed, #memo-mode").on("click", showCardMode);
$("button-close-flash-cards").on("click", hideCardMode);
$("#close-modal-explanation").on("click", hideExplanation);
$("#remove-all").on("click", removeAllVocab);
$("#remove-one").on("click", removeOneVocab);
$("shuffle-words").on("click", shuffleRegularWords);
$(".randomize-cards").on("click", shuffleFlashCardWords);
$("sort-words").on("click", sortRegularWords);
$("text-areas input").on("keypress", function (e) {
  AddVocab(e);
});
