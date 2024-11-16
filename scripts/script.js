// script.js

import { displayWords } from "./functions/wordhandler.js";

window.storeWords = JSON.parse(localStorage.getItem("storeWords")) || [];

displayWords();
$(document).ready(function(){
    $('modal-container').slick({
      setting-name: setting-value
    });
  });
// $("modal-container").slick();
// var currentSlide = $('modal-container').slick('.flash-card-object');
