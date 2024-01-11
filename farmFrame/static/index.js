const searchForm = document.querySelector("#searchForm");
const optionEl = document.querySelector("#itemSelect");
const searchEl = document.querySelector("#itemSearch");
const resultEl = document.querySelector("#results");

const getItem = async (item) => {
  let dropResponse = await fetch(`/api/getItemDrops/${item}`);
  let data = await dropResponse.json();

  // Need to implement pagination here.

  console.log(data);



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
    cardHeader.setAttribute("class", "text-lead");
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

const getDesc = async (item) => {
  let response = await fetch(`/api/getItemDesc/${item}`);
  let descResponse = await response.json();

  let descEl = document.querySelector("#description");
  let descHeaderEl = document.querySelector("#descHeader");
  let descTextEl = document.querySelector("#descText");
  let wikiLinkEl = document.querySelector("#wikiLink");

  descEl.classList.remove("hide");
  descEl.classList.add("show");

  if (!descResponse) {
    descHeaderEl.textContent = "Sorry - Ordis couldn't find anything.";
    descTextEl.textContent = "Are you sure you spelled it right?";
  }

  if (descResponse.category == "Mods") {
    descHeaderEl.textContent = descResponse.name;
    descTextEl.textContent =
      "This item is a mod, capable of enhancing the abilities of weapons, warframes, or companions in various ways depending on their level and specs. Check out the wiki link for more information!";
    wikiLinkEl.classList.remove("hide");
    wikiLinkEl.classList.add("show");
    wikiLinkEl.href = descResponse.wikiaUrl;
  } else if (descResponse.category == "Arcanes") {
    descHeaderEl.textContent = descResponse.name;
    descTextEl.textContent =
      "This item is an Arcane, a powerful and rare kind of mod that grants passive buffs to warframes, weapons, or operators. Arcanes can be upgraded 5 times for progressively more powerful abilities. Check back soon for more information on this unique class of mods! In the mean time, check below for the fastest way to pick one up.";
  } else {

    descHeaderEl.textContent = descResponse.name;
    descTextEl.textContent = descResponse.description;
    wikiLinkEl.classList.remove("hide");
    wikiLinkEl.classList.add("show");
    wikiLinkEl.href = descResponse.wikiaUrl
  }
  console.log(descResponse);
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let searchVal = searchEl.value;
  console.log(searchVal);
  getItem(searchVal);
  getDesc(searchVal);
  searchEl.value = "";
});
