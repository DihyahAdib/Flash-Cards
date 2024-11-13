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
  modalExplain: document.querySelector(".modal-explanation"),
  overlay: document.getElementById("overlay"),
  closeModal: document.getElementById("close-modal"),
  closeExplainbtn: document.getElementById("close-modal-explanation"),
  modeNameElement: document.getElementById("mode-name"),
  currentMode: document.querySelector(".current-mode"),
  currentModeExplain: document.getElementById("current-mode-explain-name"),
  explainArea: document.getElementById("explaination-area")
};

export const currentModeName = [
    {name: "Cover Mode", Description: 'This mode will allow you to only show the "Foriegn language," so it will show just the vocabulary and not its definition. This is not to be confused with Flash card mode.', color: "green"},

    {name: "Casual Mode", Description: "Casual mode has no timer and just allows you to quiz yourself on your own time, but the feature for choosing which words to include in your test still stands.", color: "orange"},

    {name: "Timed Mode", Description: "Casual & Timed Flash Card Mode: This mode has a few qualities. First, there are two modes to this mode: timer and casual. Timer mode will start a clock and randomly randomize the words from your word bank, effectively quizzing you from the words you've inputted. You're allowed to select a certain word for this mode, or just select all of the words in your bank if you're up for the challenge! The word will appear on the screen, and you'll be prompted to give the correct definition; if it's wrong, it will flip and reveal the right answer.", color: "blue"},

    {name: "Memorization Mode", Description: "..." , color: "red"}
];
