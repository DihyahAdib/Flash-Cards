// script.js

import { displayRegularWords } from "./functions/wordhandler.js";
import { checkContainerStyle } from "./modes/casual.js";

window.storeWords = JSON.parse(localStorage.getItem("storeWords")) || [];

displayRegularWords();
checkContainerStyle();
