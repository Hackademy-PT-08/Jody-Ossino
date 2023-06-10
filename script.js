// **Esercizio 2**

// Crea il tuo pokedex

// https://pokeapi.co/

// Mostrare i pokemon in delle card con img, nome, e tipologia (types: grass, poison, etc…)

// ```jsx
// // usare il parametro ?limit=150 altrimenti ci sono troppi risultati
// ```

// Permettere la ricerca di un pokemon tramite un input di testo

// ```jsx
// // esempio: l'url da chiamare sarà cosi composto https://pokeapi.co/api/v2/pokemon/pikachu
// ```






//COSTANTE
let pokedex = document.getElementById("pokedex");
const button = document.getElementById("button")
const input = document.getElementById("search");
const row = document.createElement("div");
row.classList.add("row");


//DICHIARAZIONE
function getPokemon(){
fetch("https://pokeapi.co/api/v2/pokemon?offset=151&limit=151")
.then((res) => res.json())
.then((response) =>{
    // console.log(response.results)
    createPokemonCard(response.results)

})
}

function createPokemonCard(listaPokemon){

    const pokedex = document.getElementById("pokedex");
    
    listaPokemon.forEach(pokemon => {
        fetch(pokemon.url)
        .then((res) => res.json())
        .then((pokemonDetail) =>{
            
            const card = document.createElement("div");
            const col = document.createElement("div");

            card.classList.add("card","mt-3","rounded-5", "my-card", "my-bg-card" );
            col.classList.add("col-sm-6", "col-md-4", "col-lg-3", "px-5", "mt-3");
            
            const cardTemplate = `
            <img src="${pokemonDetail.sprites.front_default}" class="card-img-top" alt="...">
            <div class="card-body text-center fs-5 text-white rounded-bottom-4">
            <p class="my-card-text fs-2 text-black">${pokemonDetail.name}</p>
            <p class="my-card-text fs-5">TYPE =${createBadgeTypes(pokemonDetail.types)}</p>
            </div>
            `
            card.innerHTML = cardTemplate;
            pokedex.appendChild(row);
            row.appendChild(col);
            col.appendChild(card);

            // console.log(pokemonDetail.sprites)
        }) 
       
       
});
}

function createBadgeTypes(types){

    let template = ``

    types.forEach(typeObject => {
       let {type} = typeObject //destructoring (crea delle variabili che vengono balorizzate dalla proprietà di un oggetto)
        template += ` ${type.name}`
    });
    return template
    
}

function searchPokemon(){ 
    fetch(`https://pokeapi.co/api/v2/pokemon/${button.value}`)
    .then((res) => res.json())
    .then((data) =>{
    console.log(data.results)

    })
}

function createSingleCard(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`)
    .then((res) => res.json())
    .then((response) => {
        console.log(response, `${input.value}`)
        
        pokedex.innerHTML = `` //svuoltiamo dall'id pokedex 
        
        const container = document.createElement("div")
        const row = document.createElement("div");
        const colsx = document.createElement("div");
        const coldx = document.createElement("div");
        const cardsx = document.createElement("div");
        const carddx = document.createElement("div");
      
        container.classList.add("container")
     
        row.classList.add("row");      
        colsx.classList.add("col-6","p-5");
        coldx.classList.add("col-6","p-5",  );
        cardsx.classList.add("card", "border-black", "rounded-5","my-card", "my-bg-card");
        carddx.classList.add("card", "border-black", "border-5", "my-card", "my-bg-card", "py-5", "mt-2");
       

        const cardImg = `
            <img src="${response.sprites.front_default}" class="card-img-top" alt="..."">
            `

        const description = `
        <div class="card-body text-center fs-5 bg-black text-white">
        <p class="my-card-text fs-2">${response.name}</p>
        <p class="my-card-text fs-5"> TYPE =${createBadgeTypes(response.types)}</p>
        </div>`


            cardsx.innerHTML = cardImg;
            carddx.innerHTML = description;
            pokedex.appendChild(container);
            container.appendChild(row);
            row.appendChild(colsx);
            row.appendChild(coldx);
            colsx.appendChild(cardsx);
            coldx.appendChild(carddx);

        
    })
}

//INVOCAZIONE
getPokemon()
createSingleCard()

button.addEventListener("click", createSingleCard);


