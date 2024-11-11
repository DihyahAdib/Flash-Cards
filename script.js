// script.js
import { buttons, elements, $, $$, currentModeName } from "./constants.js";

let storeWords = JSON.parse(localStorage.getItem("storeWords")) || [];

function displayWords() {
  elements.wordsContainer.innerHTML = "";

  storeWords.forEach(({ word, definition }) => {
    const wordbutton = document.createElement("button");
    wordbutton.textContent = `${word} : ${definition}`;
    wordbutton.dataset.word = word;
    wordbutton.dataset.definition = definition;
    wordbutton.onclick = function() { //remove itself
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

buttons.pickMode.addEventListener("click", function() {
  elements.overlay.style.display = "flex";
  elements.overlay.style.animation = "opacityI 0.68s forwards";
  elements.modal.style.animation = "scaleIn 0.68s forwards";
});

elements.closeModal.addEventListener("click", function() {
  elements.modal.style.animation = "scaleOut 0.58s forwards";
  elements.overlay.style.animation = "opacityO 0.5s forwards";
  
  elements.modal.addEventListener("animationend", function handleAnimationEnd() {
    elements.overlay.style.display = "none";

    elements.modal.removeEventListener("animationend", handleAnimationEnd);
  });
  
});

$("#cover").onclick = () => coverMode();
$("#casual").onclick = () => casualMode();
$("#timed").onclick = () => timedMode();
$("#memo-mode").onclick = () => memorizationMode();

export function coverMode() {
  const wordButtons = elements.wordsContainer.querySelectorAll("button.new-element");

  wordButtons.forEach(button => {
    const word = button.dataset.word;
    button.textContent = `${word}`;
    save();
  });
  console.log("Cover mode activated: definitions hidden.");
  const modeNameElement = document.getElementById("mode-name");
  modeNameElement.innerText = currentModeName[0].name;
  modeNameElement.style.color = "green";
  save();
};

export function casualMode() {
  console.log("Casual");
};

export function timedMode() {
  console.log("Timed");
};

export function memorizationMode() {
  console.log("memo");
};

displayWords();

function save() {
    localStorage.setItem("storeWords", JSON.stringify(storeWords));
};