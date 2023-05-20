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
    cardHeader.setAttribute("class", "text-lead")
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
    cardHeader.setAttribute("class", "text-lead")
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

  resultEl.textContent = "";

  for (let i = 0; i < data.length; i++) {
    let element = data[i];

    let polarities = "";

    for (let i = 0; i < element.polarities.length; i++) {
      let currentIndex = element.polarities[i];
      polarities += `${currentIndex}, `;
    }

    let cardContainer = document.createElement("article");

    cardContainer.setAttribute("class", "card font-space");

    let cardHeader = document.createElement("h5");
    let cardDesc = document.createElement("p");
    let cardAura = document.createElement("p");
    let cardPassive = document.createElement("p");
    let cardPolarities = document.createElement("p");
    let cardVital = document.createElement("p");
    let cardLink = document.createElement("p");
    let cardHref = document.createElement("a");

    cardHref.setAttribute("href", element.wikiaUrl);
    cardHeader.setAttribute("class", "text-lead")
    cardHeader.textContent = element.name;
    cardDesc.textContent = `Description: ${element.description}`;
    cardAura.textContent = `Aura Polarity: ${element.aura}`;
    cardPassive.textContent = `Passive Ability: ${element.passiveDescription}`;
    cardPolarities.textContent = polarities
      ? `Polarities: ${polarities}`
      : "No inherent polarities";
    cardVital.textContent = `Health: ${element.health} / Shields: ${element.shield} / Armor: ${element.armor}`;
    cardLink.textContent = "For more information, click here: ";
    cardHref.textContent = "Wiki Link";

    resultEl.appendChild(cardContainer);
    // cardContainer.appendChild(cardImg);
    cardContainer.appendChild(cardHeader)
    cardContainer.appendChild(cardDesc);
    cardContainer.appendChild(cardAura);
    cardContainer.appendChild(cardPassive);
    cardContainer.appendChild(cardPolarities);
    cardContainer.appendChild(cardVital);
    cardContainer.appendChild(cardLink);
    cardLink.appendChild(cardHref);
  }
};

const getWeapon = async (weapon) => {
  let response = await fetch(`/api/getWeapon/${weapon}`);
  let data = await response.json();

  console.log("Query complete:", data);

  resultEl.textContent = "";

  let cardContainer = document.createElement("article");

  cardContainer.setAttribute("class", "card font-space");

  let cardHeader = document.createElement("h5");
  let cardDesc = document.createElement("p");
  let cardDmg = document.createElement("p");
  let cardFire = document.createElement("p");
  let cardAcc = document.createElement("p");
  let cardMag = document.createElement("p");
  let cardType = document.createElement("p");
  let cardLink = document.createElement("p");
  let cardHref = document.createElement("a");

  cardHref.setAttribute("href", data.wikiaUrl);
  cardHeader.textContent = data.name;
  cardHeader.setAttribute("class", "text-lead")
  cardDesc.textContent = `Description: ${data.description}`;
  cardDmg.textContent = `Total Damage: ${data.totalDamage}`;
  cardFire.textContent = `Rate of Fire: ${data.fireRate}`;
  cardAcc.textContent = `Accuracy: ${data.accuracy}`;
  cardMag.textContent = `Magazine size: ${data.magazineSize}`;
  cardType.textContent = `Class: ${data.type}`;
  cardLink.textContent = "For more information, click here: ";
  cardHref.textContent = "Wiki Link";

  resultEl.appendChild(cardContainer);
  cardContainer.appendChild(cardHeader);
  cardContainer.appendChild(cardDesc);
  cardContainer.appendChild(cardDmg);
  cardContainer.appendChild(cardFire);
  cardContainer.appendChild(cardAcc);
  cardContainer.appendChild(cardMag);
  cardContainer.appendChild(cardType);
  cardContainer.appendChild(cardLink);
  cardLink.appendChild(cardHref);
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
