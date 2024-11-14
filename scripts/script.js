// script.js
import { currentModeName } from "./constants.js";

let storeWords = JSON.parse(localStorage.getItem("storeWords")) || [];
let isAnimating = false;

function randomizeArray(array) {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setCurrentMode(index) {
  $(".mode-name")
    .text(currentModeName[index].name)
    .css({ color: currentModeName[index].color }); // i couldnt find a work around for these //

  $("#current-mode-explain-name")
    .text(currentModeName[index].name)
    .css({ color: currentModeName[index].color });
  $("#explaination-area").text(currentModeName[index].Description);// i couldnt find a work around for these //
  save();
}

$("#inputbutton").on("click", toggleDisplayGrid);

$("#cover").on("click", () => setCurrentMode(0));
$("#casual").on("click", () => setCurrentMode(1));
$("#timed").on("click", () => setCurrentMode(2));
$("#memo-mode").on("click", () => setCurrentMode(3));

$("#cover").on("mouseover", () => setCurrentMode(0));
$("#casual").on("mouseover", () => setCurrentMode(1));
$("#timed").on("mouseover", () => setCurrentMode(2));
$("#memo-mode").on("mouseover", () => setCurrentMode(3));

$("#input-vocab").on("click", addWords);
$("#cover").on("click", coverMode);
$("#casual").on("click", casualMode);
$("#timed").on("click", timedMode);
$("#memo-mode").on("click", memorizationMode);

function displayWords() {
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

function addWords() {
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

$("text-areas input").on("keypress", function (e) {
  if (e.key === "Enter") {
    addWords();
  }
});

$("#remove-vocab").on("click", function () {
  storeWords.length = 0;
  localStorage.removeItem("storeWords");
  displayWords();
});

$("#remove-one").on("click", function () {
  storeWords.pop();
  displayWords();
  save();
});

$("#pick-mode").on("click", function () {
  $("body").addClass("overlay-visible");
});

$("#close-modal").on("click", function () {
  $("body").removeClass("overlay-visible").addClass("overlay-disappearing");

  $("#overlay").on("animationend", function handleAnimationEnd() {
    $("body").removeClass("overlay-disappearing");
    $(".modal").off("animationend", handleAnimationEnd);
  });
});

$("#close-modal-explanation").on("click", function () {
  if (isAnimating) return;
  isAnimating = true;
  $("body")
    .removeClass("show-explanation")
    .addClass("remove-explanation-modal");

  $(".modal-explanation").on("animationend", function handleAnimationEnd() {
    $(this).off("animationend", handleAnimationEnd);
    $("body").removeClass("remove-explanation-modal");
    $(this).css("visibility", "hidden"); // i couldnt find a work around for these //
    isAnimating = false;
  });
});

$("#cover, #casual, #timed, #memo-mode").on("mouseover", function () {
  if (isAnimating) return;

  $("body").removeClass("remove-explanation-modal");
  $("body").addClass("show-explanation");
  $(".modal-explanation").css("visibility", "visible"); // i couldnt find a work around for these //
});

export function coverMode() {
  $("button.new-element").each(function () {
    $(this).text($(this).data("word"));
  });
  save();
}

export async function casualMode() {
  $("button.new-element").each(function () {
    $(this).text(`${$(this).data("word")} : ${$(this).data("definition")}`);
  });
  
  $("body").addClass("flash-cards-visibility")
  $(".modal")
    .css({ animation: "scaleOut 0.58s forwards" }) // i couldnt find a work around for these //
    .on("animationend", function handleAnimationEnd() {
      $(".modal").off("animationend", handleAnimationEnd);
    });    

  randomizeArray(storeWords);

  storeWords.forEach(({ word, definition }) => {
    $("<button>")
      .addClass("flash-card-objects")
      .html(`${word}: ${definition}`)
      .appendTo("modal-container");
  });

  save();
}

function timedMode() {
  //ds
}
function memorizationMode() {
  //ds
}

function toggleDisplayGrid() {
  if ($("body").hasClass("casual-mode-has-columns")) {
    $("body").removeClass("casual-mode-has-columns");
    $(".inputbutton").text("List View")
  } else {
    $("body").addClass("casual-mode-has-columns");
    $(".inputbutton").text("Flash Card View")

  }
}

displayWords();

function save() {
  localStorage.setItem("storeWords", JSON.stringify(storeWords));
}
