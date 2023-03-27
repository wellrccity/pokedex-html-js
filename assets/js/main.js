const pokelist = document.getElementById('pokemons')
const loadMoreButton = document.getElementById('loadMoreButton')
const selectGen = document.getElementById('selectGen')
const limit = 10
const maxRecords = {"gen_1": 152, "gen_2": 100, "gen_3": 135}
let countRecords = 0
const generations = {"gen_1": 0, "gen_2": 152, "gen_3": 252}
let offset = 0


function loadPokemonItens(offset, limit) {

    if (countRecords / maxRecords[selectGen.value] < 1) {
    
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" id="pokemon">
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
    countRecords += limit
    if (limit > maxRecords[selectGen.value] - countRecords) {
        loadPokemonItens(offset, maxRecords[selectGen.value] - offset)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

})

selectGen.addEventListener('change', () => {
    console.log(selectGen.value)
    pokelist.innerHTML = ''
    countRecords = 0
    offset = generations[selectGen.value]
    loadPokemonItens(offset, limit)
})