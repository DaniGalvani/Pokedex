  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

  async function displayAllPokemon() {
      const response = await fetch(`${BASE_URL}?limit=30&offset=15`);
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