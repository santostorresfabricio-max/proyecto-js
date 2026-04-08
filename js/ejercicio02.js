//1. Paso #1: Declarar un Array con 5 lenguajes de Programación
const lenguajes = ['Python', 'PHP','Java','JavaScript', 'C#'];

// Paso #2: Capturamos los elementos del DOM
const lista = document.getElementById("lista");

let elementos = "";

// Paso #3: Usamos el bucle FOR para recorrer un Array

for (let i = 0; i < lenguajes.length; i++) {
    if (lenguajes[i] === "JavaScript"){
        alert("JavaScript sirve para el Frontend y Backend.");
    }
    // Paso #4: Acumulamos cada lenguaje dentro de las etiquetas (li).
    elementos += "<li>" + lenguajes[i] + "</li>";

}
// Paso #5: Capturamos y mostramos toda la lista en pantalla.s
lista.innerHTML = elementos;
