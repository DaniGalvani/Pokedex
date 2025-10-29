  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

  async function displayAllPokemon() {
    try {
      const response = await fetch(`${BASE_URL}?limit=25`);
      const data = await response.json();
      const pokemonList = data.results;

      pokemonList.forEach(pokemon => {
        const pokemonElement = templateCreatePokemonCard(pokemon);
        document.querySelector('#content-cards').appendChild(pokemonElement);
      });
      console.log('Pokemon erfolgreich geladen!', pokemonList);

    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }