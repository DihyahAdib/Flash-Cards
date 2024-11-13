// script.js
import { currentModeName } from "./constants.js";

let storeWords = JSON.parse(localStorage.getItem("storeWords")) || [];

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
      .on("click", function() {
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
  $("#current-mode-explain-name")
    .text(currentModeName[0].name)
    .css({ color: currentModeName[0].color });
  $("#explaination-area").text(currentModeName[0].Description);
});

$("#casual").on("mouseover", function () {
  $(".modal-explanation").css({
    visibility: "visible",
    animation: "slideIn 0.6s forwards",
  });
  $("#current-mode-explain-name")
    .text(currentModeName[1].name)
    .css({ color: currentModeName[1].color });
  $("#explaination-area").text(currentModeName[1].Description);
});

$("#timed").on("mouseover", function () {
  $(".modal-explanation").css({
    visibility: "visible",
    animation: "slideIn 0.6s forwards",
  });
  $("#current-mode-explain-name")
    .text(currentModeName[2].name)
    .css({ color: currentModeName[2].color });
  $("#explaination-area").text(currentModeName[2].Description);
});

$("#memo-mode").on("mouseover", function () {
  $(".modal-explanation").css({
    visibility: "visible",
    animation: "slideIn 0.6s forwards",
  });
  $("#current-mode-explain-name")
    .text(currentModeName[3].name)
    .css({ color: currentModeName[3].color });
  $("#explaination-area").text(currentModeName[3].Description);
});

export function coverMode() {
  $("button.new-element").each(() => {
    console.log($(this).data("word"));
    $(this).text($(this).data("word"));
  });
  
  $("#mode-name")
    .text(currentModeName[0].name)
    .css({ color: currentModeName[0].color });
  save();
}

export function casualMode() {
  $("#mode-name")
    .text(currentModeName[1].name)
    .css({ color: currentModeName[1].color });

  $("button.new-element").each(() => {
    $(this).text(`${$(this).data("word")} : ${$(this).data("definition")}`);
  });
  save();
}

export function timedMode() {
  $("#mode-name")
    .text(currentModeName[2].name)
    .css({ color: currentModeName[2].color });
  save();
}

export function memorizationMode() {
  $("#mode-name")
    .text(currentModeName[3].name)
    .css({ color: currentModeName[3].color });
  save();
}

displayWords();

function save() {
  localStorage.setItem("storeWords", JSON.stringify(storeWords));
}
