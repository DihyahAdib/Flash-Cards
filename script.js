// script.js
import { buttons, elements } from "./constants.js";

let storeWords = JSON.parse(localStorage.getItem("storeWords")) || [];

function displayWords() {
  elements.wordsContainer.innerHTML = "";

  storeWords.forEach(({ word, definition }) => {
    const wordbutton = document.createElement("button");
    wordbutton.textContent = `${word} : ${definition}`;
    wordbutton.onclick = function() {
        this.remove();
        storeWords = storeWords.filter(function({word: storedWord, definition: storedDefinition}) {
            return !(word === storedWord && definition === storedDefinition)
        });
        save();
    };
    wordbutton.style.fontWeight = 'bold';
    wordbutton.style.fontSize = '26px';
    elements.wordsContainer.appendChild(wordbutton);
    wordbutton.classList.add("new-element");
  });
};

buttons.input.addEventListener("click", function () {
  const word = elements.textArea.value.trim();
  const definition = elements.definitionArea.value.trim();

  if (word && definition) {
    storeWords.push({ word, definition });
    save();
    elements.textArea.value = "";
    elements.definitionArea.value = "";
    displayWords();
  } else {
    alert("Enter both the vocab & definition first!");
  }
});

buttons.removeInput.addEventListener("click", function () {
  storeWords.length = 0;
  localStorage.removeItem("storeWords");
  displayWords();
});

buttons.removeOne.addEventListener("click", function () {
  storeWords.pop();
  save();
  displayWords();
});

document.getElementById("pick-mode").addEventListener("click", function() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  overlay.querySelector('.modal').style.animation = "scaleIn 0.4s forwards";
});

document.getElementById("close-modal").addEventListener("click", function() {
  const overlay = document.getElementById("overlay")
  overlay.querySelector('.modal').style.animation = "none";
  overlay.style.display = "none";
});


displayWords();

function save() {
    localStorage.setItem("storeWords", JSON.stringify(storeWords));
}