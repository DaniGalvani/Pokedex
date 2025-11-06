  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

  async function displayAllPokemon() {
      const response = await fetch(`${BASE_URL}?limit=30&offset=0`);
      const data = await response.json();
      console.log(`${data.results.length} Pokemon gefunden!`);      
      document.querySelector('#content-cards').innerHTML = '';
      for (let i = 0; i < data.results.length; i++) {
          const pokemon = data.results[i];
          const pokemonDetails = await fetchPokemonDetails(pokemon.url);
          renderPokemonCard(pokemonDetails);
      }
  }

  async function fetchPokemonDetails(url) {
      const response = await fetch(url);
      return await response.json();
  }

  function renderPokemonCard(pokemon) {
    const contentCards = document.querySelector('#content-cards');
    contentCards.innerHTML += templateRenderPokemonCard(pokemon);
  }

  function searchPokemon() {
    const input = document.getElementById('search-input').value.toLowerCase();
    if (input.length < 3) {
      const pokemonCards = document.querySelectorAll('.pokemon-card');
      pokemonCards.forEach(card => {
          card.style.display = 'block';
      });
      return;
    }
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    pokemonCards.forEach(card => {
        const pokemonName = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = pokemonName.includes(input) ? 'block' : 'none';
    });      
  }

  async function loadMorePokemon() {
    const currentCount = document.querySelectorAll('.pokemon-card').length;
    const newOffset = currentCount;
    const response = await fetch(`${BASE_URL}?limit=30&offset=${newOffset}`);
    const data = await response.json();
    for (let i = 0; i < data.results.length; i++) {
        const pokemon = data.results[i];
        const pokemonDetails = await fetchPokemonDetails(pokemon.url);
        renderPokemonCard(pokemonDetails);
      }
  }

  function resetDisplayPokemon() {
    displayAllPokemon();
  }
