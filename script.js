// script.js
import { currentModeName } from "./constants.js";

let storeWords = JSON.parse(localStorage.getItem("storeWords")) || [];

function setCurrentMode(nice) {
  $(".mode-name")
    .text(currentModeName[nice].name)
    .css({ color: currentModeName[nice].color });

  $("#current-mode-explain-name")
    .text(currentModeName[nice].name)
    .css({ color: currentModeName[nice].color });
  $("#explaination-area").text(currentModeName[nice].Description);

  save();
}

$("toggle-visible-style").on("click", toggleDisplayStyle);

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
  $("#overlay").css({ display: "flex", animation: "opacityI 0.68s forwards" });
  $(".modal").css({ animation: "scaleIn 0.68s forwards" });
});

$("#close-modal").on("click", function () {
  $("#overlay").css({ animation: "opacityO 0.5s forwards" });

  $(".modal")
    .css({ animation: "scaleOut 0.58s forwards" })
    .on("animationend", function handleAnimationEnd() {
      $("#overlay").css({ display: "none" });
      $(".modal").off("animationend", handleAnimationEnd);
    });
});

$("#close-modal-explanation").on("click", function () {
  $(".modal-explanation").css({ animation: "slideOut 0.6s forwards" });
  $(".modal").on("animationend", function handleAnimationEnd() {
    $(".modal").off("animationend", handleAnimationEnd);
  });
});

$("#cover").on("mouseover", function () {
  $(".modal-explanation").css({
    visibility: "visible",
    animation: "slideIn 0.6s forwards",
  });
});

$("#casual").on("mouseover", function () {
  $(".modal-explanation").css({
    visibility: "visible",
    animation: "slideIn 0.6s forwards",
  });
});

$("#timed").on("mouseover", function () {
  $(".modal-explanation").css({
    visibility: "visible",
    animation: "slideIn 0.6s forwards",
  });
});

$("#memo-mode").on("mouseover", function () {
  $(".modal-explanation").css({
    visibility: "visible",
    animation: "slideIn 0.6s forwards",
  });
});

export function coverMode() {
  $("button.new-element").each(function () {
    console.log($(this).data("word"));
    $(this).text($(this).data("word"));
  });
  save();
}

export async function casualMode() {
  $("button.new-element").each(function () {
    $(this).text(`${$(this).data("word")} : ${$(this).data("definition")}`);
  });

  $("flash-cards").css({
    visibility: "visible",
    opacity: "1",
    animation: "scaleIn 0.68s forwards",
  });

  $(".modal")
    .css({ animation: "scaleOut 0.58s forwards" })
    .on("animationend", function handleAnimationEnd() {
      $(".modal").off("animationend", handleAnimationEnd);
    });

  let storeWords = JSON.parse(localStorage.getItem("storeWords")) || [];

  storeWords.forEach(({ word, definition }) => {
    $("<button>")
      .addClass("flash-card-objects")
      .html(`${word}: ${definition}`)
      .appendTo("modal-container");

    // toggle carousel or view all.
    $("modal-container").css("grid-template-columns", "1fr 1fr 1fr");
  }); 

  save();
}

function toggleDisplayStyle() {
  //sister requested of me to make two different visibility styles, one where it shows as a grid, one where is shows as a carousel card.
  //this is view all mode
  // $("modal-container").css("grid-template-columns", "1fr 1fr 1fr");

  //default mode which is technically a third mode and technically not, is called list mode

  //carousel mode
  // if ($("modal-container").css("grid-template-columns", "1fr 1fr 1fr")) {
  //   $("modal-container").css()
  // }
  //i think i should probably have three different functions for this 
}

export function timedMode() {
  save();
}

export function memorizationMode() {
  save();
}

displayWords();

function save() {
  localStorage.setItem("storeWords", JSON.stringify(storeWords));
}
