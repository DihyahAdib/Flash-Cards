// script.js
import { storeWords, buttons, elements } from "./constants.js";

function displayWords() {
  elements.wordsContainer.innerHTML = "";

  storeWords.forEach(({ word, definition }) => {
    const wordbutton = document.createElement("button");
    wordbutton.textContent = `${word} : ${definition}`;
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
    localStorage.setItem("storeWords", JSON.stringify(storeWords));
    displayWords();
    checkInputs()
    elements.textArea.value = "";
    elements.definitionArea.value = "";
  }
});

buttons.removeInput.addEventListener("click", function () {
  storeWords.length = 0;
  localStorage.removeItem("storeWords");
  displayWords();
  checkInputs();
});

buttons.removeOne.addEventListener("click", function () {
  storeWords.pop();
  localStorage.setItem("storeWords", JSON.stringify(storeWords));
  displayWords();
  checkInputs();
});

displayWords();

function checkInputs() {
  if (elements.textArea.value === "" && elements.definitionArea.value === "") {
    alert("Enter both the vocab & definition first!");
    elements.textArea.disabled = true;
    elements.definitionArea.disabled = true;
  }
};
