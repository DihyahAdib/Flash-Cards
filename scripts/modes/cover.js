// Cover Mode Script //

export function coverMode() {
  $("button.new-element").each(function () {
    $(this).text($(this).data("word"));
  });
  save();
}
