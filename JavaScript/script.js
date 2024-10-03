const palabras = ['pelota']; 
let palabraSeleccionada;
let letrasAdivinadas = [];
let intentosRestantes = 6;

function iniciarJuego() {
    palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    letrasAdivinadas = [];
    intentosRestantes = 6;
    
    document.getElementById('imagen-borrosa').classList.remove('oculto');
    document.getElementById('imagen-clara').classList.add('oculto'); 
    
    document.getElementById('intentos-restantes').innerText = intentosRestantes;
    document.getElementById('mensaje').innerText = '';
    
    actualizarpalabra();
    crearBotonesLetras();
    document.getElementById('boton-reiniciar').classList.add('oculto'); 
}

function crearBotonesLetras() {
    const contenedorLetras = document.getElementById('contenedor-letras');
    contenedorLetras.innerHTML = '';
    
    const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    abecedario.split('').forEach(letra => {
        const boton = document.createElement('button');
        boton.innerText = letra;
        boton.addEventListener('click', () => adivinanza(letra.toLowerCase()));
        contenedorLetras.appendChild(boton);
    });
}

function adivinanza(letra) {
    if (!letrasAdivinadas.includes(letra)) {
        letrasAdivinadas.push(letra);
        
        if (!palabraSeleccionada.includes(letra)) {
            intentosRestantes--;
        }

        actualizarpalabra();
        document.getElementById('intentos-restantes').innerText = intentosRestantes;

        if (intentosRestantes === 0) {
            document.getElementById('mensaje').innerText = `Perdiste maestro, la proxima sera "${palabraSeleccionada}".`;
            document.getElementById('boton-reiniciar').classList.remove('oculto'); 
        } else if (palabraSeleccionada.split('').every(letra => letrasAdivinadas.includes(letra))) {
            document.getElementById('mensaje').innerText = 'Ganaste rey';
            
            document.getElementById('imagen-borrosa').classList.add('oculto');
            document.getElementById('imagen-clara').classList.remove('oculto'); 
            
            document.getElementById('boton-reiniciar').classList.remove('oculto'); 
        }
    }
}

function actualizarpalabra() {
    const contenedorPalabra = document.getElementById('contenedor-palabra');
    contenedorPalabra.innerHTML = palabraSeleccionada.split('').map(letra => 
        letrasAdivinadas.includes(letra) ? letra : '_'
    ).join(' ');
}


document.getElementById('boton-reiniciar').addEventListener('click', iniciarJuego);


iniciarJuego();
