//lose functions script / functions.js //
import { showCards } from "../modes/casual.js";
import { save } from "../save.js";
import {
  addWords,
  displayFlashCardWords,
  displayRegularWords,
  randomizeArray,
} from "./wordhandler.js";

export function showModal() {
  $("body").addClass("modal-pick-mode");
}

export function hideModal() {
  $("body").removeClass("modal-pick-mode");
}

export function showExplanation() {
  $("body").addClass("modal-pick-mode-explain");
}

export function hideExplanation() {
  $("body").removeClass("modal-pick-mode-explain");
}

export function showCardMode() {
  $("body")
    .removeClass("modal-pick-mode modal-pick-mode-explain")
    .addClass("modal-play-mode");
}

export function hideCardMode() {
  $("body")
    .addClass("modal-pick-mode modal-pick-mode-explain")
    .removeClass("modal-play-mode");
}

export function AddVocab(e) {
  if (e.key === "Enter") addWords();
}

export function removeOneVocab() {
  storeWords.pop();
  displayRegularWords();
  save();
}

export function removeAllVocab() {
  storeWords.length = 0;
  localStorage.removeItem("storeWords");
  displayRegularWords();
}

export function shuffleRegularWords() {
  for (let R = 0; R < 100; R++) {
    randomizeArray(storeWords);
    displayRegularWords();
    save();
  }
  console.log("Re-Shuffled words:", storeWords);
}

export function shuffleFlashCardWords() {
  for (let R = 0; R < 100; R++) {
    randomizeArray(storeWords);
    displayFlashCardWords();
    showCards(cardIndex);
    save();
  }
  console.log("Re-Shuffled words:", storeWords);
}
