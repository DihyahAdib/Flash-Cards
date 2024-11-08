// constants.js

export let storeWords = JSON.parse(localStorage.getItem("storeWords")) || [];

export const buttons = {
    input: document.querySelector("#input-vocab"),
    removeInput: document.querySelector("#remove-vocab"),
}

export const elements = {
    textArea: document.querySelector("#text-area"),
    wordsContainer: document.querySelector("#words-container")
}