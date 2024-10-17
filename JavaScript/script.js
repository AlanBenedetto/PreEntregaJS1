let palabras = [
    { palabra: 'twingo', pista: 'Lo que a Shakira no le gusta' },
    { palabra: 'tesla', pista: 'Empresa de autos eléctricos' },
    { palabra: 'javascript', pista: 'Lenguaje de programación web' },
    { palabra: 'ahorcado', pista: 'El nombre del juego en español' },
    { palabra: 'pizza', pista: 'Comida favorita en Italia' },
    { palabra: 'leon', pista: 'El rey de la selva' },
    { palabra: 'apple', pista: 'Compañía de la manzana' },
    { palabra: 'banana', pista: 'Fruta amarilla' },
    { palabra: 'futbol', pista: 'Deporte más popular del mundo' },
    { palabra: 'hacker', pista: 'Experto en ciberseguridad o piratería' }
];

let maxIntentos = 6;
let palabraElegida, intentos, letrasAdivinadas, letrasUsadas, nombreJugador, puntaje;

const inputNombreJugador = document.getElementById('nombre-jugador');
const botonIniciarJuego = document.getElementById('iniciar-juego');
const seccionJuego = document.getElementById('seccion-juego');
const contenedorPalabra = document.getElementById('contenedor-palabra');
const textoPista = document.getElementById('texto-pista');
const intentosRestantes = document.getElementById('intentos-restantes');
const listaLetrasUsadas = document.getElementById('lista-letras-usadas');
const tablaPuntajes = document.getElementById('tabla-puntajes');
const contenedorLetras = document.getElementById('contenedor-letras'); 


botonIniciarJuego.addEventListener('click', () => {
    nombreJugador = inputNombreJugador.value.trim();
    if (!nombreJugador) {
        alert('Por favor ingresa tu nombre.');
        return;
    }
    iniciarJuego();
});

function iniciarJuego() {
    seccionJuego.classList.remove('oculto');
    reiniciarJuego();
    mostrarPuntajes();
    crearBotonesLetras(); 
}

function reiniciarJuego() {
    const indiceAleatorio = Math.floor(Math.random() * palabras.length);
    palabraElegida = palabras[indiceAleatorio].palabra.toLowerCase();
    letrasAdivinadas = Array(palabraElegida.length).fill('_');
    letrasUsadas = [];
    intentos = maxIntentos;

    contenedorPalabra.textContent = letrasAdivinadas.join(' ');
    textoPista.textContent = palabras[indiceAleatorio].pista;
    intentosRestantes.textContent = intentos;
    listaLetrasUsadas.textContent = '';
}

function manejarLetra(letraAdivinada) {
    if (!letraAdivinada || letrasUsadas.includes(letraAdivinada)) {
        return;
    }

    letrasUsadas.push(letraAdivinada);
    listaLetrasUsadas.textContent = letrasUsadas.join(', ');

    if (palabraElegida.includes(letraAdivinada)) {
        palabraElegida.split('').forEach((letra, indice) => {
            if (letra === letraAdivinada) {
                letrasAdivinadas[indice] = letra;
            }
        });
        contenedorPalabra.textContent = letrasAdivinadas.join(' ');
    } else {
        intentos--;
        intentosRestantes.textContent = intentos;
    }

    verificarFinDelJuego();
}

function verificarFinDelJuego() {
    if (!letrasAdivinadas.includes('_')) {
        alert(`Te felicito ${nombreJugador}, ganaste!`);
        guardarPuntaje();
        reiniciarJuego();
    } else if (intentos === 0) {
        alert(`La proxima sera ${nombreJugador}, perdiste. La palabra era "${palabraElegida}".`);
        reiniciarJuego();
    }
}

function guardarPuntaje() {
    const puntajes = JSON.parse(localStorage.getItem('tablaPuntajes')) || [];
    puntajes.push({ nombreJugador, puntaje: intentos });
    localStorage.setItem('tablaPuntajes', JSON.stringify(puntajes));
    mostrarPuntajes();
}

function mostrarPuntajes() {
    const puntajes = JSON.parse(localStorage.getItem('tablaPuntajes')) || [];
    tablaPuntajes.innerHTML = puntajes.map(p => `<li>${p.nombreJugador}: ${p.puntaje}</li>`).join('');
}

function crearBotonesLetras() {
    contenedorLetras.innerHTML = '';
    
    const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    abecedario.split('').forEach(letra => {
        const boton = document.createElement('button');
        boton.innerText = letra;
        boton.addEventListener('click', () => manejarLetra(letra.toLowerCase()));
        contenedorLetras.appendChild(boton);
    });
}
