const searchForm = document.querySelector("#searchForm");
const optionEl = document.querySelector("#itemSelect");
const searchEl = document.querySelector("#itemSearch");
const resultEl = document.querySelector("#results");
const resHeadEl = document.querySelector("#resHeader");

const displayData = (dropData) => {

  resultEl.textContent = ""
  for (let i = 0; i < dropData.length; i++) {
    let element = dropData[i];

    let cardContainer = document.createElement("div");

    cardContainer.setAttribute("class", "resultCard font-space");

    let cardHeader = document.createElement("h5");
    let cardPlace = document.createElement("p");
    let cardChance = document.createElement("p");
    let cardSubDiv = document.createElement("div");

    cardSubDiv.classList.add("subDiv")


    cardChance.classList.add("font-heavy");

    cardHeader.textContent = element.item;
    cardHeader.setAttribute("class", "text-lead");
    cardPlace.textContent = `${element.place}`;
    cardChance.textContent = `${Math.round(element.chance)}%`;

    resultEl.appendChild(cardContainer);
    cardContainer.appendChild(cardChance);
    cardContainer.appendChild(cardSubDiv)
    cardSubDiv.appendChild(cardHeader);
    cardSubDiv.appendChild(cardPlace);
  }
};

const getItem = async (item) => {
  let dropResponse = await fetch(`/api/getItemDrops/${item}`);
  let data = await dropResponse.json();

  resHeadEl.textContent = "";
  resultEl.textContent = "";
  if (!Array.isArray(data)) {
    return;
  }

  if (data.length == 0) {
    return;
  }

  let top4 = data.slice(0, 4);

  resHeadEl.textContent = "Fastest Farm:";

  displayData(top4);

  if (top4.length !== data.length) {
    let moreBtn = document.createElement("button");
    moreBtn.classList.add("glass-button");
    moreBtn.textContent = "Show more";
    moreBtn.type = "button";
    moreBtn.setAttribute("id", "moreBtn");

    resultEl.appendChild(moreBtn);

    moreBtn.addEventListener("click", function () {
      displayData(data);
    });
  }
};

const getDesc = async (item) => {
  let response = await fetch(`/api/getItemDesc/${item}`);
  let descResponse = await response.json();

  let descEl = document.querySelector("#description");
  let descHeaderEl = document.querySelector("#descHeader");
  let descTextEl = document.querySelector("#descText");
  let wikiLinkEl = document.querySelector("#wikiLink");

  descHeaderEl.textContent = "";
  descTextEl.textContent = "";

  if (wikiLinkEl.classList.contains("show")) {
    wikiLinkEl.classList.remove("show");
    wikiLinkEl.classList.add("hide");
  }

  descEl.classList.remove("hide");
  descEl.classList.add("show", "card");

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
    wikiLinkEl.classList.remove("hide");
    wikiLinkEl.classList.add("show");
    wikiLinkEl.href = `https://warframe.fandom.com/wiki/${item}`;
  } else if (descResponse.error == 404) {
    descHeaderEl.textContent = "Sorry - Ordis couldn't find anything.";
    descTextEl.textContent = "Are you sure you spelled it right?";
  } else if (descResponse.category == "Pets") {
    descHeaderEl.textContent = descResponse.name;
    descTextEl.textContent = descResponse.description;
    wikiLinkEl.classList.remove("hide");
    wikiLinkEl.classList.add("show");
    wikiLinkEl.href = `https://warframe.fandom.com/wiki/${item}`;
  } else {
    descHeaderEl.textContent = descResponse.name;
    descTextEl.textContent = descResponse.description;
    wikiLinkEl.classList.remove("hide");
    wikiLinkEl.classList.add("show");
    wikiLinkEl.href = descResponse.wikiaUrl;
  }
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let searchVal = searchEl.value;

  getItem(searchVal);
  getDesc(searchVal);
  searchEl.value = "";
});
