// // script.js
// import { currentModeName } from "./constants.js";

// let storeWords = JSON.parse(localStorage.getItem("storeWords")) || [];

// let isModalAnimating = false;
// let isFlashCardsAnimating = false;
// const ANIMATION_DURATION = 500;

// $("#cover").on("click", () => setCurrentMode(0));
// $("#casual").on("click", () => setCurrentMode(1));
// $("#timed").on("click", () => setCurrentMode(2));
// $("#memo-mode").on("click", () => setCurrentMode(3));

// $("#cover").on("mouseover", () => setCurrentMode(0));
// $("#casual").on("mouseover", () => setCurrentMode(1));
// $("#timed").on("mouseover", () => setCurrentMode(2));
// $("#memo-mode").on("mouseover", () => setCurrentMode(3));

// $("#inputbutton").on("click", toggleDisplayGrid);
// $("#input-vocab").on("click", addWords);
// $("#cover").on("click", coverMode);
// $("#casual").on("click", casualMode);
// $("#timed").on("click", timedMode);
// $("#memo-mode").on("click", memorizationMode);

// function randomizeArray(array) {
//   for (let i = 0; i < array.length; i++) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// function setCurrentMode(index) {
//   $(".mode-name")
//     .text(currentModeName[index].name)
//     .css({ color: currentModeName[index].color }); // i couldnt find a work around for these //

//   $("#current-mode-explain-name")
//     .text(currentModeName[index].name)
//     .css({ color: currentModeName[index].color });
//   $("#explaination-area").text(currentModeName[index].Description); // i couldnt find a work around for these //
//   save();
// }

// function displayWords() {
//   $("#words-container").empty();

//   storeWords.forEach(({ word, definition }) => {
//     $("<button>")
//       .addClass("new-element")
//       .text(`${word} : ${definition}`)
//       .on("click", function () {
//         this.remove();
//         storeWords = storeWords.filter(function ({
//           word: storedWord,
//           definition: storedDefinition,
//         }) {
//           return !(word === storedWord && definition === storedDefinition);
//         });
//         save();
//       })
//       .appendTo("#words-container")
//       .data({ word, definition });
//   });
// }

// function addWords() {
//   const word = $("#text-area").val().trim();
//   const definition = $("#definition-area").val().trim();

//   if (word && definition) {
//     storeWords.push({ word, definition });
//     $("#text-area").val("");
//     $("#definition-area").val("");
//     displayWords();
//     save();
//   } else {
//     alert("Enter both the vocab & definition first!");
//   }
// }

// $("text-areas input").on("keypress", function (e) {
//   if (e.key === "Enter") {
//     addWords();
//   }
// });

// $("#remove-vocab").on("click", function () {
//   storeWords.length = 0;
//   localStorage.removeItem("storeWords");
//   displayWords();
// });

// $("#remove-one").on("click", function () {
//   storeWords.pop();
//   displayWords();
//   save();
// });

// $("#pick-mode").on("click", function () {
//   showModal();
// });

// $("#close-modal").on("click", function () {
//   hideModal();
// });

// $("#close-flash-card").on("click", function () {
//   hideFlashCards();
// });

// $("#close-modal-explanation").on("click", function () {
//   if (isModalAnimating) return;
//   isModalAnimating = true;
//   $("body")
//     .removeClass("show-explanation")
//     .addClass("remove-explanation-modal");

//   $(".modal-explanation").on("animationend", function handleAnimationEnd() {
//     $(this).off("animationend", handleAnimationEnd);
//     $("body").removeClass("remove-explanation-modal");
//     $(this).css("visibility", "hidden"); // i couldnt find a work around for these //
//     isModalAnimating = false;
//   });
// });

// $("#cover, #casual, #timed, #memo-mode").on("mouseover", function () {
//   if (isModalAnimating) return;

//   $("body").removeClass("remove-explanation-modal");
//   $("body").addClass("show-explanation");
//   $(".modal-explanation").css("visibility", "visible"); // i couldnt find a work around for these //
// });

// export function coverMode() {
//   $("button.new-element").each(function () {
//     $(this).text($(this).data("word"));
//   });
//   save();
// }

// export async function casualMode() {
//   $("button.new-element").each(function () {
//     $(this).text(`${$(this).data("word")} : ${$(this).data("definition")}`);
//   });

//   randomizeArray(storeWords);

//   showFlashCards();

//   save();
// }

// function timedMode() {
//   //ds
// }
// function memorizationMode() {
//   //ds
// }

// function toggleDisplayGrid() {
//   if ($("body").hasClass("casual-mode-has-columns")) {
//     $("body").removeClass("casual-mode-has-columns");
//     $(".inputbutton").text("Flash Card View");
//   } else {
//     $("body").addClass("casual-mode-has-columns");
//     $(".inputbutton").text("List View");
//   }
// }

// //ORIGINAL MODAL HIDE HANDLER//
// function hideModal() {
//   if (isModalAnimating) return;

//   isModalAnimating = true;
//   $("body").removeClass("overlay-visible").addClass("overlay-disappearing");

//   $("#overlay").one("animationend", function () {
//     isModalAnimating = false;
//     $("body").removeClass("overlay-disappearing");
//   });
// }

// //ORIGINAL MODAL SHOW HANDLER//
// function showModal() {
//   if (isModalAnimating) return;

//   isModalAnimating = true;
//   hideFlashCards();
//   $("body").addClass("overlay-visible");

//   $(".modal").one("animationend", function () {
//     isModalAnimating = false;
//   });
// }

// //FLASH CARD SHOW HANDLER//
// function showFlashCards() {
//   if (isFlashCardsAnimating) return;

//   isFlashCardsAnimating = true;
//   hideModal();
//   $("modal-container").empty();

//   setTimeout(() => {
//     $("body").addClass("flash-cards-visibility");
//     $("flash-cards").css("visibility", "visible");

//     storeWords.forEach(({ word, definition }) => {
//       $("<button>")
//         .addClass("flash-card-objects")
//         .html(`${word}: ${definition}`)
//         .appendTo("modal-container");
//     });
//   }, 50);

//   $("flash-cards").one("animationend", function () {
//     isFlashCardsAnimating = false;
//   });
// }

// //FLASH CARD HIDE HANDLER//
// function hideFlashCards() {
//   if (isFlashCardsAnimating) return;

//   isFlashCardsAnimating = true;
//   $("body")
//     .removeClass("flash-cards-visibility")
//     .addClass("flash-cards-disappearing");

//   $("flash-cards").one("animationend", function () {
//     isFlashCardsAnimating = false;
//     $("body").removeClass("flash-cards-disappearing");
//     $("modal-container").empty(); // Clear content when hidden
//     $(this).css("visibility", "hidden");
//   });
// }

// $("flash-cards").on("animationend", function () {
//   isFlashCardsAnimating = false;

//   if ($("body").hasClass("flash-cards-disappearing")) {
//     $("body").removeClass("flash-cards-disappearing");
//   }
// });

// displayWords();

// function save() {
//   localStorage.setItem("storeWords", JSON.stringify(storeWords));
// }
