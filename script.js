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

elements.closeExplainbtn.addEventListener("click", function() {
  elements.modalExplain.style.animation = "slideOut 0.6s forwards";
  elements.modal.addEventListener("animationend", function handleAnimationEnd() {
    elements.modal.removeEventListener("animationend", handleAnimationEnd);
  });
});

$("#cover").onclick = () => coverMode();
$("#casual").onclick = () => casualMode();
$("#timed").onclick = () => timedMode();
$("#memo-mode").onclick = () => memorizationMode();

$("#cover").addEventListener("mouseover", function() {
  elements.modalExplain.style.visibility = "visible";
  elements.modalExplain.style.animation = "slideIn 0.6s forwards";
})
$("#casual").addEventListener("mouseover", function() {
  elements.modalExplain.style.visibility = "visible";
  elements.modalExplain.style.animation = "slideIn 0.6s forwards";
})
$("#timed").addEventListener("mouseover", function() {
  elements.modalExplain.style.visibility = "visible";
  elements.modalExplain.style.animation = "slideIn 0.6s forwards";
})
$("#memo-mode").addEventListener("mouseover", function() {
  elements.modalExplain.style.visibility = "visible";
  elements.modalExplain.style.animation = "slideIn 0.6s forwards";
})

export function coverMode() {
  const wordButtons = elements.wordsContainer.querySelectorAll("button.new-element");
  wordButtons.forEach(button => {
    const word = button.dataset.word;
    button.textContent = `${word}`;
    save();
  });
  console.log("Cover mode activated: definitions hidden.");
  elements.modeNameElement.innerText = currentModeName[0].name;
  elements.modeNameElement.style.color = "green";
  save();
};

export function casualMode() {
  console.log("Casual mode activated:");
  elements.modeNameElement.innerText = currentModeName[1].name;
  elements.modeNameElement.style.color = "orange";
  save();
};

export function timedMode() {
  console.log("Timed mode activated:");
  elements.modeNameElement.innerText = currentModeName[2].name;
  elements.modeNameElement.style.color = "blue";
  save();
};

export function memorizationMode() {
  console.log("Memorization mode activated:");
  elements.modeNameElement.innerText = currentModeName[3].name;
  elements.modeNameElement.style.color = "red";
  save();
};

displayWords();

function save() {
    localStorage.setItem("storeWords", JSON.stringify(storeWords));
};