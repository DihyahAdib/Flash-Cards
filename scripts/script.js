// script.js

import { displayWords } from "./functions/wordhandler.js";

window.storeWords = JSON.parse(localStorage.getItem("storeWords")) || [];

displayWords();
