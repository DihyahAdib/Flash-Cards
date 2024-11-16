// Word handler Script //

import { save } from "../save.js";

let isFlashCardsAnimating = false;

export function displayWords() {
  $("#words-container").empty();

  storeWords.forEach(({ word, definition }) => {
    $("<button>")
      .addClass("new-element")
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
      .appendTo("#words-container")
      .data({ word, definition });
  });
}

export function addWords() {
  const word = $("#text-area").val().trim();
  const definition = $("#definition-area").val().trim();

  if (word && definition) {
    storeWords.push({ word, definition });
    $("#text-area").val("");
    $("#definition-area").val("");
    displayWords();
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

export function toggleDisplayGrid() {
  if ($("body").hasClass("casual-mode-has-columns")) {
    $("body").removeClass("casual-mode-has-columns");
    $(".inputbutton").text("Flash Card View");
  } else {
    $("body").addClass("casual-mode-has-columns");
    $(".inputbutton").text("List View");
  }
}
