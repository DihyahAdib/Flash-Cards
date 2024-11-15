// Cover Mode Script //

import { save } from "../save.js";

export async function coverMode() {
  $("button.new-element").each(function () {
    $(this).text($(this).data("word"));
  });
  save();
  console.log("This is cover Mode");
}
