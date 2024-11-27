import { VIEW } from "./classes/AppState.js";

export function shouldShowModalPickModeClass(currentView) {
  return (
    currentView === VIEW.PICK_MODE_NO_EXPLAIN ||
    currentView === VIEW.EXPLAIN_COVER ||
    currentView === VIEW.EXPLAIN_CASUAL ||
    currentView === VIEW.EXPLAIN_MEMO
  );
}

export function shouldShowModalEXPModeClass(currentView) {
  return (
    currentView === VIEW.EXPLAIN_COVER ||
    currentView === VIEW.EXPLAIN_CASUAL ||
    currentView === VIEW.EXPLAIN_MEMO
  );
}

export function shouldShowModalCardModeClass(currentView) {
  return currentView === VIEW.CASUAL_MODE || currentView === VIEW.MEMO_MODE;
}

export function shouldShowModalCardBTNModeClass(currentView) {
  return (
    currentView === VIEW.CASUAL_MODE ||
    currentView === VIEW.MEMO_MODE ||
    currentView !== VIEW.BTN_MODE
  );
}
export function getWordButtonText(wordObj = {}, coverDefinition) {
  const { word = "Unknown", definition = "No Definition" } = wordObj;
  if (coverDefinition === true) {
    return `${word}`;
  }
  return `${word} : ${definition}`;
}

export function getModeNameText(currentView) {
  if (currentView === VIEW.EXPLAIN_COVER || currentView === VIEW.COVER) {
    return "Cover Mode";
  } else if (
    currentView === VIEW.EXPLAIN_CASUAL ||
    currentView === VIEW.CASUAL_MODE
  ) {
    return "Casual Mode";
  } else if (
    currentView === VIEW.EXPLAIN_MEMO ||
    currentView === VIEW.MEMO_MODE
  ) {
    return "Memorization Mode";
  }
  return "";
}

export function getModeNameColor(currentView) {
  if (currentView === VIEW.EXPLAIN_COVER || currentView === VIEW.COVER) {
    return "green";
  } else if (
    currentView === VIEW.EXPLAIN_CASUAL ||
    currentView === VIEW.CASUAL_MODE
  ) {
    return "orange";
  } else if (
    currentView === VIEW.EXPLAIN_MEMO ||
    currentView === VIEW.MEMO_MODE
  ) {
    return "blue";
  }
  return "black";
}

export function buildWordsContainerHTML({ wordBank, onClickWord, bankCover }) {
  return wordBank.map((word) =>
    $("<button>")
      .addClass(`new-element`)
      .text(getWordButtonText(word, bankCover))
      .on("click", () => {
        onClickWord(word);
      })
      .data(word)
  );
}

export function getModeDescription(currentView) {
  if (currentView === VIEW.EXPLAIN_COVER) {
    return 'This mode will allow you to only show the "Foriegn language," so it will show just the vocabulary and not its definition. This is not to be confused with Flash card mode.';
  } else if (currentView === VIEW.EXPLAIN_CASUAL) {
    return "Casual mode has no timer and just allows you to quiz yourself on your own time, but the feature for choosing which words to include in your test still stands.";
  } else if (currentView === VIEW.EXPLAIN_MEMO) {
    return "...";
  }
  return "";
}
