function templateRenderPokemonCard(pokemon) {
  return `
         <div class="pokemon-card">
            <h3>${
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            }</h3>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div class="pokemon-info"><p><b>Erfahrung:</b> <i class="green">${
              pokemon.base_experience
            }</i></p><br></div>
            <div class="pokemon-info"><p><b>Typ:</b> <i class="green">${pokemon.types
              .map(
                (type) =>
                  type.type.name.charAt(0).toUpperCase() +
                  type.type.name.slice(1)
              )
              .join(", ")}</i></p><br></div>
         </div>`;
}
