let orginalPokemonList={}
const pokemonListContainer= document.querySelector('#pokemon-list-container')

const findPokemon= () => {
    for(let id = 1; id <= 151; id++) {
    const fetchUrl= `https://pokeapi.co/api/v2/pokemon/${id}`
    fetch(fetchUrl)
    .then(res => res.json())
    .then(pokemon => {
        orginalPokemonList= {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites['front_default'],
        type: pokemon.types.map(type => type.type.name).join(', ')
        }
    displayPokemon(pokemonListContainer)
     })
    }
}

function displayPokemon(pokemon) {
    li= document.createElement('li')
    img= document.createElement('img')
    h2= document.createElement('h2')
    p=document.createElement('p')
    pokemonListContainer.append(li)
    li.append(img,h2,p)
    img.src= orginalPokemonList.image
    h2.textContent= `${orginalPokemonList.id}. ${orginalPokemonList.name}`
    p.textContent= `Type: ${orginalPokemonList.type}`
}

findPokemon()

