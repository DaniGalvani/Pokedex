const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

let allPokemonDetails = [];

async function displayAllPokemon() {
  const searchInput = document.getElementById("search-input");
  searchInput.value = "";
  showSpinner();
  const response = await fetch(`${BASE_URL}?limit=20&offset=0`);
  const data = await response.json();
  allPokemonDetails = [];
  document.querySelector("#content-cards").innerHTML = "";
  const promises = data.results.map(pokemon => fetchPokemonDetails(pokemon.url));
  const pokemonDetailsArray = await Promise.all(promises);
  pokemonDetailsArray.forEach(pokemonDetails => {
    allPokemonDetails.push(pokemonDetails);
    renderPokemonCard(pokemonDetails);
  });
  ButtonVisibility();
  setTimeout(() => {
    hideSpinner();
  }, 300);
}

async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  return await response.json();
}

function renderPokemonCard(pokemon) {
  const contentCards = document.querySelector("#content-cards");
  const primaryType = pokemon.types[0].type.name;
  contentCards.innerHTML += templateRenderPokemonCard(pokemon, primaryType);
  const cards = contentCards.querySelectorAll(".pokemon-card");
  const currentCard = cards[cards.length - 1];
  currentCard.classList.add(`type-${primaryType.toLowerCase()}`);
}

function searchPokemon() {
  const input = document.getElementById("search-input").value.toLowerCase();
  ButtonVisibility();
  if (input.length < 3) {
    const pokemonCards = document.querySelectorAll(".pokemon-card");
    pokemonCards.forEach((card) => {
      card.style.display = "block";
    });
    return;
  }
  const pokemonCards = document.querySelectorAll(".pokemon-card");
  pokemonCards.forEach((card) => {
    const pokemonName = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = pokemonName.includes(input) ? "block" : "none";
  });
}

async function loadMorePokemon() {
  showSpinner();
  const currentCount = document.querySelectorAll(".pokemon-card").length;
  const newOffset = currentCount;
  const response = await fetch(`${BASE_URL}?limit=20&offset=${newOffset}`);
  const data = await response.json();
  const promises = data.results.map(pokemon => fetchPokemonDetails(pokemon.url));
  const pokemonDetailsArray = await Promise.all(promises);
  
  pokemonDetailsArray.forEach(pokemonDetails => {
    allPokemonDetails.push(pokemonDetails);
    renderPokemonCard(pokemonDetails);
  });
  setTimeout(() => {
    hideSpinner();
  }, 300);
}

function resetDisplayPokemon() {
  displayAllPokemon();
}

function closePopupCard() {
  const popupCard = document.querySelector(".popup");
  const popupCardInfo = document.getElementById("popup-card-info");
  popupCardInfo.className = "popup-card-info";
  popupCard.style.display = "none";
  document.body.style.overflow = "auto";
}

function openPopupCard(id) {
  const pokemon = allPokemonDetails.find((p) => p.id === id);
  const primaryType = pokemon.types[0].type.name;
  const popupCardInfo = document.getElementById("popup-card-info");
  const popup = document.querySelector(".popup");  
  document.body.style.overflow = "hidden";
  popupCardInfo.classList.add(`type-${primaryType.toLowerCase()}`);
  popupCardInfo.innerHTML = templateRenderPopupCard(pokemon, primaryType);
  popup.style.display = "flex";
}

const popup = document.querySelector(".popup");
popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopupCard();
    }
  });

function popupNextPokemon(currentId) {
  const currentIndex = allPokemonDetails.findIndex((p) => p.id === currentId);
  const nextIndex = (currentIndex + 1) % allPokemonDetails.length;
  const nextPokemon = allPokemonDetails[nextIndex];
  const popupCardInfo = document.getElementById("popup-card-info");
  popupCardInfo.className = "popup-card-info";
  openPopupCard(nextPokemon.id);
}

function popupPreviousPokemon(currentId) {
  const currentIndex = allPokemonDetails.findIndex((p) => p.id === currentId);
  const previousIndex = (currentIndex - 1 + allPokemonDetails.length) % allPokemonDetails.length;
  const previousPokemon = allPokemonDetails[previousIndex];
  const popupCardInfo = document.getElementById("popup-card-info");
  popupCardInfo.className = "popup-card-info";
  openPopupCard(previousPokemon.id);
}

function showSpinner() {
  document.querySelector(".spinner-container").style.display = "flex";
  document.body.style.overflow = "hidden";
  document.getElementById("load-more-btn").disabled = true;
}

function hideSpinner() {
  document.querySelector(".spinner-container").style.display = "none";
  document.body.style.overflow = "auto";
  document.getElementById("load-more-btn").disabled = false;
}

function ButtonVisibility() {
  const resetBtn = document.getElementById("reset-btn");
  const searchInput = document.getElementById("search-input");
  const topBtn = document.getElementById("top-btn");
  const loadMoreBtn = document.getElementById("load-more-btn");
  searchInput.value.length >= 3 ? resetBtn.removeAttribute("hidden") : resetBtn.setAttribute("hidden", "");
  searchInput.value.length >= 3 ? loadMoreBtn.setAttribute("hidden", "") : loadMoreBtn.removeAttribute("hidden");
  searchInput.value.length >= 3 ? topBtn.setAttribute("hidden", "") : topBtn.removeAttribute("hidden");
  searchInput.value.length >= 3 ? buttonCenter() : buttonSpaceEvenly();
}

function buttonCenter() {
  const btnFlex = document.querySelector(".btn-flex");
  btnFlex.style.justifyContent = "center";
}

function buttonSpaceEvenly() {
  const btnFlex = document.querySelector(".btn-flex");
  btnFlex.style.justifyContent = "space-evenly";
}