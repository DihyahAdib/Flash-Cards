// util.js

export async function delayUpdate($element, message, delay) {
  await wait(delay);
  $element.text(message);
}

export async function displayLoadingText(text) {
  for (let i = 0; i < 5; i++) {
    await delayUpdate($("text"), text + ".".repeat(i), 100);
  }
}

export async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomizeArray(array) {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function sortArray(array) {
  return array.sort((a, b) => {
    if (a.word < b.word) return -1;
    if (a.word > b.word) return 1;
    return 0;
  });
}
