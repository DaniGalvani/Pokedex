const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

let pokemonList = [];
let allPokemonDetails = [];

async function displayAllPokemon() {
  const response = await fetch(`${BASE_URL}?limit=30&offset=0`);
  const data = await response.json();
  pokemonList = data.results;
  console.log(`${data.results.length} Pokemon gefunden!`);
  document.querySelector("#content-cards").innerHTML = "";
    for (let i = 0; i < data.results.length; i++) {
      const pokemon = data.results[i];
      const pokemonDetails = await fetchPokemonDetails(pokemon.url);
      allPokemonDetails.push(pokemonDetails);
      renderPokemonCard(pokemonDetails);
    }
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
  const currentCount = document.querySelectorAll(".pokemon-card").length;
  const newOffset = currentCount;
  const response = await fetch(`${BASE_URL}?limit=30&offset=${newOffset}`);
  const data = await response.json();
  pokemonList = data.results;
  console.log(`${data.results.length} weitere Pokemon geladen!`);
  for (let i = 0; i < data.results.length; i++) {
    const pokemon = data.results[i];
    const pokemonDetails = await fetchPokemonDetails(pokemon.url);
    allPokemonDetails.push(pokemonDetails);
    renderPokemonCard(pokemonDetails);
  }
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

const popupCard = document.querySelector(".popup");
popupCard.addEventListener("click", (event) => {
    if (event.target === popupCard) {
      closePopupCard();
    }
  });