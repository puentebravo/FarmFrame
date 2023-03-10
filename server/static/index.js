const searchForm = document.querySelector("#searchForm");
const optionEl = document.querySelector("#itemSelect");
const searchEl = document.querySelector("#itemSearch");
const resultEl = document.querySelector("#results");

const getItem = async (item) => {
  let response = await fetch(`/api/getItemDrops/${item}`);
  let data = await response.json();

  console.log("Query complete:", data);

  resultEl.textContent = "";

  for (let i = 0; i < data.length; i++) {
    let element = data[i];

    let cardContainer = document.createElement("div");

    cardContainer.setAttribute("class", "card font-space");

    let cardHeader = document.createElement("h5");
    let cardPlace = document.createElement("p");
    let cardChance = document.createElement("p");
    let cardRare = document.createElement("p");

    cardHeader.textContent = element.item;
    cardPlace.textContent = `Found in: ${element.place}`;
    cardChance.textContent = `Drop Rate: ${element.chance}%`;
    cardRare.textContent = `Rarity: ${element.rarity}`;

    resultEl.appendChild(cardContainer);
    cardContainer.appendChild(cardHeader);
    cardContainer.appendChild(cardPlace);
    cardContainer.appendChild(cardChance);
    cardContainer.appendChild(cardRare);
  }
};

const getMod = async (mod) => {
  let response = await fetch(`/api/getMod/${mod}`);
  let data = await response.json();

  console.log("Query complete:", data);

  resultEl.textContent = "";

  for (let i = 0; i < data.length; i++) {
    let element = data[i];

    let cardContainer = document.createElement("article");

    cardContainer.setAttribute("class", "card font-space");

    let cardHeader = document.createElement("h5");
    let cardPolarity = document.createElement("p");
    let cardType = document.createElement("p");
    let cardInfo = document.createElement("p");
    let cardLink = document.createElement("p");
    let cardHref = document.createElement("a");
    cardHref.setAttribute("href", element.wikiaUrl);

    cardHeader.textContent = element.name;
    cardPolarity.textContent = `Polarity: ${element.polarity}`;
    cardType.textContent = `Mod Type: ${element.type}`;
    cardInfo.textContent = `Effects: ${element.levelStats[0].stats}`;
    cardLink.textContent = "For more information, click here:";
    cardHref.textContent = "Wiki link";

    resultEl.appendChild(cardContainer);
    cardContainer.appendChild(cardHeader);
    cardContainer.appendChild(cardType);
    cardContainer.appendChild(cardPolarity);
    cardContainer.appendChild(cardInfo);
    cardContainer.appendChild(cardLink);
    cardLink.appendChild(cardHref);
  }
};

const getFrame = async (frame) => {
  console.log("Fetching warframe data...");
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
  console.log(searchVal);

  switch (selectedOpt) {
    case "item":
      console.warn("Item selected");
      getItem(searchVal);
      searchEl.value = "";
      break;
    case "mod":
      console.warn("mod selected");
      getMod(searchVal);
      searchEl.value = "";
      break;
    case "warframe":
      console.warn("warframe selected");
      getFrame(searchVal);
      searchEl.value = "";
      break;
    default:
      console.warn("weapon selected");
      getWeapon(searchVal);
      searchEl.value = "";
  }
});
