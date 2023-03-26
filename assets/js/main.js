const pokelist = document.getElementsByClassName("pokemons")[0]
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10
const maxRecords = 150
let offset = 0





function loadPokemonItens(offset, limit) {
    if (offset / maxRecords < 1) {
    
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
        <div class="pokeinfo">              
            <span class="name" style="font-weight: bold;">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
            </ol>
        </div> 
        <div class="pokeimg">
            <img src="assets/img/pokemons/poke_${pokemon.id}.gif" alt="">
            <img class="imgbackground" src="https://pokemoncalc.web.app/en/assets/pokeball.svg" alt="${pokemon.name}">
        </div>
        
        </li>
        `).join('')
        pokelist.innerHTML += newHtml
        

})}
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    if (limit > maxRecords - offset) {
        loadPokemonItens(offset, maxRecords - offset)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

})