window.getState = function getState() {
  return state;
};

export function checkContainerStyle() {
  if (
    !$(".flash-card-container").hasClass("active-container") &&
    $(".flash-card-object").length > 0
  ) {
    $("flash-card-container").addClass("active-container");
  }
}
