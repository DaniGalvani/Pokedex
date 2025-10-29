function templateCreatePokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>URL: ${pokemon.url}</p>
    `;
    return card;
}