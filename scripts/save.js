// Saving Script //

export function save() {
  localStorage.setItem("storeWords", JSON.stringify(storeWords));
}
