const searchForm = document.querySelector("#searchForm");
const optionEl = document.querySelector("#itemSelect");
const searchEl = document.querySelector("#itemSearch");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let selectedOpt = optionEl.value;
  let searchVal = searchEl.value;

  switch (selectedOpt) {
    case "item":
      console.warn("Item selected");
      break;
    case "mod":
      console.warn("mod selected");
      break;
    case "warframe":
      console.warn("warframe selected");
      break;
    default:
      console.warn("weapon selected");
  }
});
