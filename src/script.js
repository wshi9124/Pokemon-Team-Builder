const originalPokemonList= []
const currentTeam= []
const pokemonListContainer= document.querySelector('#pokemon-list-container')
const featuredPokemonContainer= document.querySelector('#showcase-pokemon')
const pokemonObtainedList= document.querySelector('#pokemon-obtained-list')
const pokemonTeamContainer= document.querySelector('#pokemon-team-container')
let pageNumber = 0
const numberOfPokemonPerPage = 40
const saveTeamForm= document.querySelector('#save-team')
const teamNameBlank= document.querySelector('#team-name')
const backButton= document.querySelector('#back')
const forwardButton= document.querySelector('#forward')
const clearTeamButton= document.querySelector('#clear-team')
const pokemonSearchForm= document.querySelector('#pokemon-search-form')
const pokemonDatalist= document.querySelector('#pokemon-datalist')
const searchBlank= document.querySelector('#search')
const pokemonTeamList= document.querySelector('#pokemon-team-list')
const randomPokemonButton= document.querySelector('#random-pokemon')

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
    createDataList()
    searchForPokemon()
    
}
findPokemon()

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

const displayPokemon= (pokemon) => {
    const showPokemonInfo= createPokemonProfile(pokemon, pokemonListContainer)
    showPokemonInfo.addEventListener('click', (event) => {
        featuredPokemonContainer.textContent= ''
        const showPokemonList= createPokemonProfile(pokemon, featuredPokemonContainer)
        createRestOfButtons(showPokemonList,pokemon)
    })     
}

randomPokemonButton.addEventListener('click', (event) => {
    featuredPokemonContainer.textContent= ''
    const randomPokemon= originalPokemonList[Math.floor (Math.random() * originalPokemonList.length)]
    const createRandomPokemon=createPokemonProfile(randomPokemon,featuredPokemonContainer)
    createRestOfButtons(createRandomPokemon,randomPokemon)
})

const createDataList= () => {
    originalPokemonList.forEach(pokemon => { 
    const optionForPokemonSearch= document.createElement('option')
    optionForPokemonSearch.value= pokemon.name
    pokemonDatalist.append(optionForPokemonSearch) 
})
}

const searchForPokemon= () => {
    pokemonSearchForm.addEventListener('submit', (event) => {
        event.preventDefault()
        featuredPokemonContainer.textContent=''
        const individualPokemon= originalPokemonList.find(pokemon => pokemon.name === searchBlank.value)
        const createFindPokemon = createPokemonProfile(individualPokemon,featuredPokemonContainer)
        createRestOfButtons(createFindPokemon,individualPokemon)
    })
} 

const createPokemonProfile= (pokemon,container,pokeObtained=false) => {
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
    li.classList.add('li-to-showcase-pokemon')
    li.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    })
    return li
} 

const createRestOfButtons= (profile,pokemon) => {
    const addToList= document.createElement('button')
    profile.append(addToList)
    addToList.textContent= 'Add to list'
    addToList.classList.add('add-to-list-button')
    addToList.addEventListener('click', (event) => {
        const addPokemonObtained=document.createElement('p')
        pokemonObtainedList.append(addPokemonObtained)
        addPokemonObtained.textContent= pokemon.name
        addPokemonObtained.classList.add('pokemon-obtained-name')
        addPokemonObtained.addEventListener('click', (event) => {
            featuredPokemonContainer.textContent= ''
            createPokemonProfile(pokemon,featuredPokemonContainer,true)
        })
        const addtoTeamAndRemoveContainer= document.createElement('p')
            pokemonObtainedList.append(addtoTeamAndRemoveContainer)
            const addToTeamButton= document.createElement('button')
            addToTeamButton.classList.add('add-to-team-button')
            addToTeamButton.textContent= 'Add to Team'
            const removeButton= document.createElement('button')
            removeButton.classList.add('remove-button')
            removeButton.textContent= 'Remove'
            addtoTeamAndRemoveContainer.append(addToTeamButton,removeButton)
            addToTeamButton.addEventListener('click', (event) => {
                const allTeamImages= pokemonTeamContainer.querySelectorAll('img')
                if(allTeamImages.length < 6) {
                    const teamImage= document.createElement('img')
                    const removeFromTeamButton= document.createElement('button')
                    teamImage.src= pokemon.image
                    teamImage.classList.add('pokemon-team-image')
                    removeFromTeamButton.textContent= 'Remove from team'
                    removeFromTeamButton.classList.add('remove-from-team-button')
                    pokemonTeamContainer.append(teamImage,removeFromTeamButton)
                    addPokemonObtained.remove()
                    addtoTeamAndRemoveContainer.remove()
                removeFromTeamButton.addEventListener('click', (event) => {
                    teamImage.remove()
                    removeFromTeamButton.remove()
                    featuredPokemonContainer.textContent=''
                    pokemonObtainedList.append(addPokemonObtained)
                    pokemonObtainedList.append(addtoTeamAndRemoveContainer)
                })
                teamImage.addEventListener('click',(event) => {
                    featuredPokemonContainer.textContent= ''
                    createPokemonProfile(pokemon,featuredPokemonContainer,true)    
                })
                }
                })
                removeButton.addEventListener('click', (event) => {
                    featuredPokemonContainer.textContent=''
                    addPokemonObtained.remove()
                    addtoTeamAndRemoveContainer.remove()
                })
    })
}

clearTeamButton.addEventListener('click', () => { 
    pokemonTeamContainer.querySelectorAll('img').forEach(img => img.remove())
    pokemonTeamContainer.querySelectorAll('.remove-from-team-button').forEach(button => button.remove())
    pokemonTeamContainer.querySelectorAll('h3').forEach(h3 => h3.remove())
    const originalPokemonTeamName= document.createElement('h3')
    pokemonTeamContainer.append(originalPokemonTeamName)
    originalPokemonTeamName.textContent= 'Pokémon Team'
    currentTeam.length=0
})
    
saveTeamForm.addEventListener('submit', (event)=> {
    pokemonTeamContainer.querySelectorAll('img').forEach(img => currentTeam.push(img.src))
    
    event.preventDefault()
    fetch('http://localhost:3000/pokemonTeam', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name : teamNameBlank.value,
            fullTeam: currentTeam
        }),    
    })
    .then(response => response.json())
    .then(pokemonTeam => addToTeamList(pokemonTeam))
})

const addToTeamList= (pokemonTeam) => {
    showTeamListPokemon(pokemonTeam)
    currentTeam.length=0
    saveTeamForm.reset()
    pokemonTeamContainer.textContent=''

}

fetch('http://localhost:3000/pokemonTeam')
.then(response => response.json())
    .then(pokemonTeam => addToTeamList2(pokemonTeam))

const addToTeamList2= (pokemonTeam) => {
    pokemonTeam.forEach (pokemonTeam => {
    showTeamListPokemon(pokemonTeam)
    })
}

const showTeamListPokemon = (pokemonTeam) => {
    const pokemonTeamListItem= document.createElement('li')
    pokemonTeamList.append(pokemonTeamListItem)
    pokemonTeamListItem.textContent= pokemonTeam.name
    pokemonTeamListItem.classList.add('team-list-text')
    pokemonTeamListItem.addEventListener('click', () => {
        pokemonTeamContainer.textContent= ''
        const pokemonTeamListTitle= document.createElement('h3')
        pokemonTeamListTitle.textContent= pokemonTeam.name
        pokemonTeamContainer.append(pokemonTeamListTitle)
        pokemonTeam.fullTeam.forEach (pokemon => { 
        createPokemonTeamImage= document.createElement('img')
        pokemonTeamContainer.append(createPokemonTeamImage)
        createPokemonTeamImage.src= pokemon
        createPokemonTeamImage.classList.add("show-pokemon-team-image")
        })
    })
}
