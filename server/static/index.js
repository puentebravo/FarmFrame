const searchForm = document.querySelector("#searchForm");
const optionEl = document.querySelector("#itemSelect");
const searchEl = document.querySelector("#itemSearch");

const getItem = async (item) => {
  let response = await fetch(`/api/getItemDrops/${item}`);
  let data = await response.json();

  console.log("Query complete:", data);
};

const getMod = async (mod) => {
  let response = await fetch(`/api/getMod/${mod}`);
  let data = await response.json();

  console.log("Query complete:", data);
};

const getFrame = async (frame) => {
  console.log("Fetching warframe data...")
  let response = await fetch(`/api/getWarFrame/${frame}`);
  let data = await response.json();

  console.log("Query complete:", data);
};

const getWeapon = async (weapon) => {
  let response = await fetch(`/api/getWeapon/${weapon}`);
  let data = await response.json();

  console.log("Query complete:", data);

};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let selectedOpt = optionEl.value;
  let searchVal = searchEl.value;
  console.log(searchVal)

  switch (selectedOpt) {
    case "item":
      console.warn("Item selected");
      getItem(searchVal);
      searchEl.value = ""
      break;
    case "mod":
      console.warn("mod selected");
      getMod(searchVal);
      searchEl.value = ""
      break;
    case "warframe":
      console.warn("warframe selected");
      getFrame(searchVal)
      searchEl.value = ""
      break;
    default:
      console.warn("weapon selected");
      getWeapon(searchVal)
      searchEl.value = ""
  }
});
