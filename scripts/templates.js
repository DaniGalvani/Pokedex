function templateRenderPokemonCard(pokemon) {
       return `
         <div class="pokemon-card">
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p><b>Erfahrung:</b> <i class="green">${pokemon.base_experience}</i></p><br>
            <p><b>Fähigkeiten:</b><br><i>${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</i></p>
         </div>`;
  }