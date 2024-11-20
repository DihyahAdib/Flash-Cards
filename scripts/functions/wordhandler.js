// Word handler Script //

import { save } from "../save.js";

export function displayRegularWords() {
  $("words-container").empty();

  storeWords.forEach(({ word, definition }) => {
    $("<button>")
      .addClass(`new-element`)
      .text(`${word} : ${definition}`)
      .on("click", function () {
        this.remove();
        storeWords = storeWords.filter(function ({
          word: storedWord,
          definition: storedDefinition,
        }) {
          return !(word === storedWord && definition === storedDefinition);
        });
        save();
      })
      .appendTo("words-container")
      .data({ word, definition });
  });
}

export function displayFlashCardWords() {
  $("flash-card-container").empty();

  storeWords.forEach(({ word, definition }) => {
    $("<div>")
      .addClass(`flash-card-object`)
      .text(`${word}`)
      .prependTo("flash-card-container")
      .data({ word, definition });
  });
  save();
}

export function addWords() {
  const word = $("#text-area").val().trim();
  const definition = $("#definition-area").val().trim();

  if (word && definition) {
    storeWords.push({ word, definition });
    $("#text-area").val("");
    $("#definition-area").val("");
    displayRegularWords();
    save();
  } else {
    alert("Enter both the vocab & definition first!");
  }
}

export function randomizeArray(array) {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function sortArray(array) {
  return array.sort((a, b) => {
    if (a.word < b.word) return -1; // Sort in ascending
    if (a.word > b.word) return 1;
    return 0;
  });
}
