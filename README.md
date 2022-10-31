# Pokémon Team Builder 
Welcome to our first JavaScript Project! Pokémon team builder is a fully functionining website where users can view and create their favorite pokémon teams based off of the first generation 151 pokémon. 

# Technologies
 Vanilla Javascript, HTML, CSS, PokeAPI
 
 # Features
* Website displays the first 151 pokémon over 4 pages with each page containing 40 pokémon using pagination. The number of pokémon displayed and the number of pokémon on each page can be adjusted easily through the code. 

<img width="500" alt="Screen Shot 2022-10-17 at 6 03 20 PM" src="https://user-images.githubusercontent.com/104730743/196293854-a3635144-4c8e-4311-993a-3e05475ce817.png">

* When users first visit the website, they will be greeted with the pokémon center theme song and audio controller 
* When a pokémon is clicked, it will showcase the pokémon's name, image, and type
* Pokémon obtained shows all the pokémon that the user adds to list, but not on a team for yet.
* Teams can be saved to JSON server and teams will persist even when refreshed
* There is a maximum of 6 pokémon that can be added per team

<img width="500" alt="Screen Shot 2022-10-17 at 6 06 15 PM" src="https://user-images.githubusercontent.com/104730743/196293919-c96dee3f-4a5b-4a0d-9044-6f369fe262d1.png">

* Users can get a random pokémon using the button or search for a specific pokémon through the seach bar 
* When a pokémon is selected to display, it will automatically scroll to the top of the page
* Pokémon sprites shake when they are hovered over

# Configuration:
Make sure to run db.json before using the website
“json-server --watch db.json"
