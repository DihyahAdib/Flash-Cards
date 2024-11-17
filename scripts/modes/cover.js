// Cover Mode Script //

import { save } from "../save.js";

export function coverMode() {
  $("button.new-element").each(function () {
    $(this).text($(this).data("word"));
  });
  save();
}
