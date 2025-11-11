function templateRenderPokemonCard(pokemon) {
  return `
         <div class="pokemon-card" onclick="openPopupCard(${pokemon.id})">
            <h3>${
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            }</h3>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div class="pokemon-info"><p><b>Erfahrung:</b> <i>${
              pokemon.base_experience
            }</i></p><br></div>
            <div class="pokemon-info"><p><b>Typ:</b> <i>${pokemon.types
              .map(
                (type) =>
                  type.type.name.charAt(0).toUpperCase() +
                  type.type.name.slice(1)
              )
              .join(", ")}</i></p><br></div>
         </div>`;
}

function templateRenderPopupCard(pokemon) {
  return `
    <div class="flex-container">
      <div class="img-container">
        <h2>${
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
        }</h2>      
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      </div>
        <div class="pokemon-info"><p><b>Erfahrung:</b> <i>${
          pokemon.base_experience
        }</i></p><br></div>
        <div class="pokemon-info"><p><b>Typ:</b> <i>${pokemon.types
          .map(
            (type) =>
              type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
          )
          .join(", ")}</i></p><br></div>
        <div class="pokemon-info"><p><b>Gewicht:</b> <i>${
          pokemon.weight
        }</i></p><br></div>
        <div class="pokemon-info"><p><b>Höhe:</b> <i>${
          pokemon.height
        }</i></p><br></div>
    </div>`;
}
