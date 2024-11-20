const searchForm = document.querySelector("#searchForm");
const optionEl = document.querySelector("#itemSelect");
const searchEl = document.querySelector("#itemSearch");
const resultEl = document.querySelector("#results");
const resHeadEl = document.querySelector("#resHeader");

const displayFavorites = () => {
  const favoriteSearches = JSON.parse(localStorage.getItem("favorites")) || [];

  resultEl.textContent = "";
  if (favoriteSearches.length > 0) {
    resHeadEl.textContent = "Favorite Searches";

    for (let i = 0; i < favoriteSearches.length; i++) {
      let cardContainer = document.createElement("div");

      cardContainer.setAttribute("class", "resultCard font-space");

      resultEl.appendChild(cardContainer);

      let cardNumber = document.createElement("p");
      cardNumber.classList.add("font-heavy");
      cardNumber.textContent = i + 1;

      let favText = document.createElement("h5");
      favText.classList.add("text-lead", "text-favorite");
      favText.textContent = favoriteSearches[i].value;

      let deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("class", "glass-button deleteBtn");
      deleteBtn.innerHTML = `<i class="fa-regular fa-square-minus" data-id="${favoriteSearches[i].id}"></i>`;
      deleteBtn.setAttribute("data-id", favoriteSearches[i].id);

      cardContainer.appendChild(cardNumber);
      cardContainer.appendChild(favText);
      cardContainer.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", function (event) {
        let targetId = event.target.dataset.id;

        let filteredItems = favoriteSearches.filter(
          (item) => item.id != targetId
        );

        localStorage.setItem("favorites", JSON.stringify(filteredItems));

        displayFavorites();
      });
    }
  } else {
    resHeadEl.textContent =
      "No favorites yet - favorite a search to see it here";
  }
};

const displayData = (dropData) => {
  resultEl.textContent = "";
  for (let i = 0; i < dropData.length; i++) {
    let element = dropData[i];

    let cardContainer = document.createElement("div");

    cardContainer.setAttribute("class", "resultCard font-space");

    let cardHeader = document.createElement("h5");
    let cardPlace = document.createElement("p");
    let cardChance = document.createElement("p");
    let cardSubDiv = document.createElement("div");

    cardSubDiv.classList.add("subDiv");

    cardChance.classList.add("font-heavy");

    cardHeader.textContent = element.item;
    cardHeader.setAttribute("class", "text-lead");
    cardPlace.textContent = `${element.place}`;
    cardChance.textContent = `${Math.round(element.chance)}%`;

    resultEl.appendChild(cardContainer);
    cardContainer.appendChild(cardChance);
    cardContainer.appendChild(cardSubDiv);
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

    let expandedDisplay = data.slice(0, 15);

    resultEl.appendChild(moreBtn);

    moreBtn.addEventListener("click", function () {
      displayData(expandedDisplay);
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
  let favoriteBtnEl = document.querySelector("#saveBtn");

  descHeaderEl.textContent = "";
  descTextEl.textContent = "";
  favoriteBtnEl.innerHTML = `<i class="fa-regular fa-square-plus fa-sm fa-lg"></i> Save to Favorites`;

  if (wikiLinkEl.classList.contains("show")) {
    wikiLinkEl.classList.remove("show");
    wikiLinkEl.classList.add("hide");
  }

  descEl.classList.remove("hide");
  descEl.classList.add("show", "card");
  favoriteBtnEl.classList.remove("hide");
  favoriteBtnEl.classList.add("show");

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

  favoriteBtnEl.addEventListener("click", function () {
    const favoriteSearches =
      JSON.parse(localStorage.getItem("favorites")) || [];
    let favoriteObj = {
      id: Math.round(Math.random() * 10000000),
      value: descResponse.name,
    };

    favoriteSearches.push(favoriteObj);

    localStorage.setItem("favorites", JSON.stringify(favoriteSearches));

    favoriteBtnEl.textContent = "Saved!";
  });
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let searchVal = searchEl.value;

  getItem(searchVal);
  getDesc(searchVal);
  searchEl.value = "";
});

displayFavorites();
