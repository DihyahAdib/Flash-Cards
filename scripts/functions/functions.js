//lose functions script / functions.js //
import { save } from "../save.js";
import { addWords, displayWords } from "./wordhandler.js";

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

export function AddVocab(e) {
  if (e.key === "Enter") addWords();
}

export function removeOneVocab() {
  storeWords.pop();
  displayWords();
  save();
}

export function removeAllVocab() {
  storeWords.length = 0;
  localStorage.removeItem("storeWords");
  displayWords();
}
