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
