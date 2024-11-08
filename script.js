// script.js
import {storeWords, buttons, elements} from "./constants.js";

function displayWords() {
    elements.wordsContainer.innerHTML = "";

    storeWords.forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.textContent = word;
        elements.wordsContainer.appendChild(wordDiv);
        wordDiv.classList.add("new-element");
    });
}

buttons.input.addEventListener("click", function() {
    const word = elements.textArea.value.trim();

    if (word) {
        storeWords.push(word); // Add word to storeWords array
        localStorage.setItem("storeWords", JSON.stringify(storeWords)); // Update local storage
        displayWords(); // Update the displayed words

        elements.textArea.value = ""; // Clear the input after adding
    }
});

buttons.removeInput.addEventListener("click", function() {
    storeWords.length = 0;
    localStorage.removeItem("storeWords");

    // Clear the displayed words from the DOM
    displayWords();
});


displayWords();