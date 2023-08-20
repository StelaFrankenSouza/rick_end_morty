let pagina = 1;
const api = 'https://rickandmortyapi.com/api'


function listarPersonagens(personagem){
    const buscarPersonagem = document.querySelector(".personagem")

    buscarPersonagem.innerHTML = "";

    personagem.forEach(personagens => {
        
        const caracteristicas = `
        <div class="char">
            <img src="${personagens.image}" alt="">
            <div class="char-info">
            <h3>${personagens.name}</h3>
            <h3>${personagens.status}</h3>
            <span>${personagens.species}</span>
            </div>
        </div> 
    
        `
        buscarPersonagem.innerHTML += caracteristicas
    });
}

function url(url){
    axios.get(url)
    .then(function (response){
        const personagens = response.data.results;
        listarPersonagens(personagens);

        const proximaPage = response.data.info.next;
        const anteriorPage = response.data.info.prev;

        const btnProxima = document.getElementById("#btn-proximo");
        const btnAnterior = document.getElementById("#btn-anterior");

        btnProxima.addEventListener('click', function(){
            if(proximaPage){
                url(proximaPage)

                let btnAnterior = document.getElementById("#btn-anterior");
                btnAnterior.style.display = "block"
            }
        })

        btnAnterior.addEventListener("click", function(){
            if(anteriorPage){
                url(anteriorPage)
            }
        })
        console.log(response.data);

        const footer =document.getElementById("#footer")
        footer.innerHTML = `<p class= "PerRick">Personagens: ${response.data.info.count}</p>`;

    })
    .catch(function(error){
        console.log(error.message);
    })
}

url("https://rickandmortyapi.com/api/character?page=" + pagina);