// Función para obtener la elección del usuario
function eleccionUsuario() {
    let eleccion = prompt("Elige: Piedra, Papel o Tijera").toLowerCase();
    while (eleccion !== 'piedra' && eleccion !== 'papel' && eleccion !== 'tijera') {
        alert("Elección no válida. Elige nuevamente: Piedra, Papel o Tijera.");
        eleccion = prompt("Elige: Piedra, Papel o Tijera").toLowerCase();
    }
    return eleccion;
}

// Función para obtener una elección aleatoria de la IA
function eleccionIA() {
    const opciones = ['piedra', 'papel', 'tijera'];
    const indiceAleatorio = Math.floor(Math.random() * opciones.length); 
    return opciones[indiceAleatorio];
}

// Función para determinar el ganador
function Ganador(eleccionUsuario, eleccionIA) {
    if (eleccionUsuario === eleccionIA) {
        return "Empate!";
    } else if (
        (eleccionUsuario === 'piedra' && eleccionIA === 'tijera') ||
        (eleccionUsuario === 'papel' && eleccionIA === 'piedra') ||
        (eleccionUsuario === 'tijera' && eleccionIA === 'papel')
    ) {
        return "¡Ganaste!";
    } else {
        return "Perdiste!";
    }
}

// Función principal para jugar
function jugar() {
    let jugarDeNuevo = true;

    while (jugarDeNuevo) {
        let eleccionUsuarioActual = eleccionUsuario();
        let eleccionIAActual = eleccionIA();
        
        console.log(`Elección del usuario: ${eleccionUsuarioActual}`);
        console.log(`Elección de la computadora: ${eleccionIAActual}`);

        let resultado = Ganador(eleccionUsuarioActual, eleccionIAActual);
        alert(resultado);

        jugarDeNuevo = confirm("¿Quieres jugar de nuevo?");
    }

    alert("Gracias por jugar!");
}

// Llamar a la función principal para empezar el juego
jugar();
