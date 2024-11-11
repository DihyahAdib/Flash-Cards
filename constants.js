// constants.js
export const $ = (selector) => {
  return document.querySelector(selector);
};

export const $$ = (selector) => {
  return document.querySelectorAll(selector);
};

export const buttons = {
  input: document.querySelector("#input-vocab"),
  removeInput: document.querySelector("#remove-vocab"),
  removeOne: document.querySelector("#remove-one"),
  pickMode: document.getElementById("pick-mode"),
};

export const elements = {
  textArea: document.querySelector("#text-area"),
  definitionArea: document.querySelector("#definition-area"),
  wordsContainer: document.querySelector("#words-container"),
  modal: document.querySelector(".modal"),
  modalExplain: document.querySelector("#modal-explanation"),
  overlay: document.getElementById("overlay"),
  closeModal: document.getElementById("close-modal"),
  modeNameElement: document.getElementById("mode-name"),
  currentMode: document.querySelector(".current-mode")
};

export const currentModeName = [
    {name: "Cover Mode"},
    {name: "Casual Mode"},
    {name: "Timed Mode"},
    {name: "Memorization Mode"}
];
