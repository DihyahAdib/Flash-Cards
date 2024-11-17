// script.js

import { displayWords } from "./functions/wordhandler.js";
import { checkContainerStyle } from "./modes/casual.js";

window.storeWords = JSON.parse(localStorage.getItem("storeWords")) || [];

displayWords();
checkContainerStyle();
