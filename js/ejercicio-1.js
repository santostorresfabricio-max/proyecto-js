//Fase #1: Fase de Entrada: Declaración de variables o constantes y preguntas al Sistema

//Paso #1: Capturamos elementos del DOM
// DOM: Document Object Model
const nombreUsuario = document.getElementById('nombreUsuario');
const btnSaludar = document.getElementById('btnSaludar');
const mensaje = document.getElementById('mensaje');

//Fase #2: Fase de Proceso: Se plantea la lógica, las operacione, uso de funciones(While, Do While, For, For each, etc..)

//Paso #2: Creamos la función
function registrar(){
    //Registrando o capturando el dato desde el DOM
    let nombre = nombreUsuario.value;
    //Mostramos en consola
    console.log("El nombre registrado en consola es: " + nombre);
    
//Fase #3: Fase de Salida: Es donde se muestra en pantalla(O consola) el resultado de todas las fases previas. Ejemplo:¡Hola, Bienvenido a mi página!

//3.Mostrar todo en el DOM
    mensaje.textContent = "¡Hola, " + nombre + " Bienvenido al curso!";
}
