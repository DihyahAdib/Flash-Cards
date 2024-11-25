window.getState = function getState() {
  return state;
};

export function toggleDisplayGrid() {
  if ($("body").hasClass("casual-mode-has-columns")) {
    $("body").removeClass("casual-mode-has-columns");
    $(".inputbutton").text("Flash Card View");
  } else {
    $("body").addClass("casual-mode-has-columns");
    $(".inputbutton").text("List View");
  }
}

export function checkContainerStyle() {
  if (
    !$(".flash-card-container").hasClass("active-container") &&
    $(".flash-card-object").length > 0
  ) {
    $("flash-card-container").addClass("active-container");
  }
}
