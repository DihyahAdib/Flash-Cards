//lose functions script / functions.js //
import { save } from "../save.js";
import { addWords, displayWords } from "./wordhandler.js";

export function showModal() {
  $("body").addClass("show-modal-visibility");
}

export function hideModal() {
  $("body").removeClass("show-modal-visibility");
}

export function showExplanation() {
  $("body").addClass("show-modalExplanation-visibility");
}

export function hideExplanation() {
  $("body").removeClass("show-modalExplanation-visibility");
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
