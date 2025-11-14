function templateRenderPokemonCard(pokemon) {
  return `
         <div class="pokemon-card" onclick="openPopupCard(${pokemon.id})">
            <h3>${
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            }</h3>
            <img src="${pokemon.sprites.other.home.front_shiny}" alt="${pokemon.name}">
            <div class="pokemon-info"><p> <i>${pokemon.types
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
        <img src="${pokemon.sprites.other.home.front_shiny}" alt="${pokemon.name}">
      </div>
      <div class="info-container">
        <ul>
          <li><strong>Typ:</strong> ${pokemon.types
            .map((type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1))
            .join(", ")}</li>
          <li><strong>Abilities:</strong> ${pokemon.abilities
            .map((ability) => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1))
            .join(", ")}</li>
        </ul>
      </div>  
        <nav class="nav-btn">
          <button class="preview-btn"><img src="./assets/img/zuruck-button.png" alt="Previous" onclick="popupPreviousPokemon(${pokemon.id})"></button>
          <button class="next-btn"><img src="./assets/img/zuruck-button.png" alt="Next" onclick="popupNextPokemon(${pokemon.id})"></button>
        </nav>  
    </div>`;
}

{/* <div class="pokemon-info"><p>Fähigkeit: ${pokemon.abilities
          .map((ability) => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1))
          .join(", ")}</p><br></div>
        <div class="pokemon-info"><p>Gewicht: ${
          pokemon.weight
        }</p><br></div>
        <div class="pokemon-info"><p>Höhe: ${
          pokemon.height
        }</p><br></div> */}
