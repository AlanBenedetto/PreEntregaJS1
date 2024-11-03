
const entradaTweet = document.getElementById("textoTweet");
const botonPublicar = document.getElementById("publicarTweet");
const contenedorTweets = document.getElementById("contenedorTweets");

let tweets = JSON.parse(localStorage.getItem("tweets")) || [];


function renderizarTweets() {
    contenedorTweets.innerHTML = "";
    tweets.forEach((tweet, indice) => {
        const tweetDiv = document.createElement("div");
        tweetDiv.classList.add("tweet");
        tweetDiv.innerHTML = `
            <p>${tweet.contenido}</p>
            <div class="acciones">
                <span>Likes: ${tweet.likes}</span>
                <button onclick="darLike(${indice})">Like</button>
                <button onclick="eliminarTweet(${indice})">Eliminar</button>
            </div>
        `;
        contenedorTweets.appendChild(tweetDiv);
    });
}

function agregarTweet(contenido) {
    const nuevoTweet = {
        contenido,
        likes: 0,
        timestamp: new Date().toLocaleString(),
    };
    tweets.push(nuevoTweet);
    guardarTweets();
    renderizarTweets();
}

function darLike(indice) {
    tweets[indice].likes++;
    guardarTweets();
    renderizarTweets();
}

function eliminarTweet(indice) {
    tweets.splice(indice, 1);
    guardarTweets();
    renderizarTweets();
}

function guardarTweets() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}


botonPublicar.addEventListener("click", () => {
    const contenido = entradaTweet.value.trim();
    if (contenido) {
        agregarTweet(contenido);
        entradaTweet.value = "";
    } else {
        alert("Escribe algo para publicar");
    }
});


renderizarTweets();
