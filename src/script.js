let originalPokemonList=[]
const pokemonListContainer= document.querySelector('#pokemon-list-container')
const featuredPokemonContainer= document.querySelector('#showcase-pokemon')
const pokemonObtainedList= document.querySelector('#pokemon-obtained-list')
const pokemonTeamContainer= document.querySelector('#pokemon-team-container')
let pageNumber = 0
const numberOfPokemonPerPage = 40
const backButton= document.querySelector('#back')
const forwardButton= document.querySelector('#forward')


const findPokemon= async() => {
    for (let id = 1; id <= 151; id++) {
    const fetchUrl= `https://pokeapi.co/api/v2/pokemon/${id}`
    await fetch(fetchUrl)
    .then(res => res.json())
    .then(pokemon => {
        const newPokemon= {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites['front_default'],
        type: pokemon.types.map(type => type.type.name).join(', ')
        }
    originalPokemonList.push(newPokemon)
     })
    }
    pageNumberAndPokemon(originalPokemonList)
}
findPokemon()

function displayPokemon(pokemon) {
    const showPokemonInfo= createPokemonProfile(pokemon, pokemonListContainer)
    showPokemonInfo.addEventListener('click', (event) => {
        featuredPokemonContainer.textContent= ''
        const showPokemonList= createPokemonProfile(pokemon, featuredPokemonContainer)
        const addToList= document.createElement('button')
        showPokemonList.append(addToList)
        addToList.textContent= 'Add to list'
        addToList.addEventListener('click', (event) => {
            const addPokemonObtained=document.createElement('p')
            pokemonObtainedList.append(addPokemonObtained)
            addPokemonObtained.textContent= pokemon.name

            addPokemonObtained.addEventListener('click', (event) => {
                featuredPokemonContainer.textContent= ''
                createPokemonProfile(pokemon,featuredPokemonContainer,true)
            })

            const addToTeamButton= document.createElement('button')
            addToTeamButton.textContent= 'Add to Team'
            const removeButton= document.createElement('button')
            removeButton.textContent= 'Remove'
            addPokemonObtained.append(addToTeamButton,removeButton)

            addToTeamButton.addEventListener('click', (event) => {
                const teamImage= document.createElement('img')
                const removeFromTeamButton= document.createElement('button')
                teamImage.src= pokemon.image
                removeFromTeamButton.textContent= 'Remove from team'
                pokemonTeamContainer.append(teamImage,removeFromTeamButton)
                addPokemonObtained.remove()
                removeFromTeamButton.addEventListener('click', (event) => {
                    teamImage.remove()
                    removeFromTeamButton.remove()
                    const addPokemonObtained=document.createElement('p')
                    pokemonObtainedList.append(addPokemonObtained)
                    addPokemonObtained.textContent= pokemon.name
                })
                })

            removeButton.addEventListener('click', (event) => {
                addPokemonObtained.remove()
                })
        })
    })
    
}

function createPokemonProfile(pokemon,container,pokeObtained=false) {
    const li= document.createElement('li')
    const img= document.createElement('img')
    const h2= document.createElement('h2')
    const p=document.createElement('p')
    if (pokeObtained===true) {
        h2.textContent= `${pokemon.id}. ${pokemon.name} (obtained)`
        h2.classList.add('pokemon-caught')
    }
    else{h2.textContent= `${pokemon.id}. ${pokemon.name}`}
    container.append(li)
    li.append(img,h2,p)
    img.src= pokemon.image
    p.textContent= `Type: ${pokemon.type}`
    return li
} 

const pageNumberAndPokemon= (originalPokemonList) => {
    const startIndex= pageNumber * numberOfPokemonPerPage
    const endIndex= startIndex + numberOfPokemonPerPage
    pokemonListContainer.querySelectorAll('li').forEach((pokemon)=> pokemon.remove())
    for (let i= startIndex; i < originalPokemonList.length && i < endIndex; i++) {
        displayPokemon(originalPokemonList[i])
    }
} 

backButton.addEventListener('click', (event) =>{
    if (pageNumber > 0) {
        pageNumber = pageNumber - 1
        pageNumberAndPokemon(originalPokemonList)
    }
})

forwardButton.addEventListener('click', (event) => {
    if(pageNumber >= 0 && pageNumber <= (Math.floor(originalPokemonList.length/numberOfPokemonPerPage))-1) {
        pageNumber= pageNumber + 1
        pageNumberAndPokemon(originalPokemonList) 
    }
})









