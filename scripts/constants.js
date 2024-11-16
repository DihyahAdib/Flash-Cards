// constants.js
import { save } from "./save.js";

const currentModeName = [
  {
    name: "Cover Mode",
    Description:
      'This mode will allow you to only show the "Foriegn language," so it will show just the vocabulary and not its definition. This is not to be confused with Flash card mode.',
    color: "green",
  },

  {
    name: "Casual Mode",
    Description:
      "Casual mode has no timer and just allows you to quiz yourself on your own time, but the feature for choosing which words to include in your test still stands.",
    color: "orange",
  },

  {
    name: "Timed Mode",
    Description:
      "The Casual & Timed Flash Card Mode offers two modes: timer and casual. Timer mode randomly randomizes words from your word bank, quizzing you. You can select a word or all words, with the word appearing on the screen and correct definition provided.",
    color: "blue",
  },

  { name: "Memorization Mode", Description: "...", color: "red" },
];

export function setCurrentMode(index) {
  $(".mode-name")
    .text(currentModeName[index].name)
    .css({ color: currentModeName[index].color });
  $("#current-mode-explain-name")
    .text(currentModeName[index].name)
    .css({ color: currentModeName[index].color });
  $("#explaination-area").text(currentModeName[index].Description);
  save();
}