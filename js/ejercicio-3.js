//Creación de un OBJETO.
const estudiante = {
    //Un mapa está compuesto de clave/atributo: valor
    nombre: "Pepito",
    carrera: "Informatica y Desarrollo de Aplicaciones",
    ciclo: 3,
    //Vamos a crear METODOS (Son las acciones - verbos)
    estudiar: function(){
        console.log("Estoy aprendiendo JavaScript.");
    }
}

//Acceder al OBJETO 
console.log(estudiante.nombre);
estudiante.estudiar();



//Creación de un CONSTRUCTOR(SIEMPRE DEBE EMPEZAR CON MAYUSCULA)

/*Si la función contiene atributos/argumentos
pasa a ser una función de tipo constructor*/ 
function Computadora(marca, procesador, ram){
    //Usamos atributos públicos usando "THIS"
    this.marca = marca;
    this.procesador = procesador;
    this.ram = ram;

    //Creamos el Método
    this.encender = function(){
        console.log("Iniciamos el sistema." + this.marca);
    }

    this.aumentar = function(){
        return ram + "GB";
    }
}
//Creación de Instancias.
//El operador NEW crea una instancia o copia a partir del modelo.
const PCLab1 = new Computadora("HP", "Intel Core i7", 32);
const PCLab2 = new Computadora("ASUS", "Intel Core i9", 16);

//Acceder a las instancias.
console.log(PCLab1.marca);
console.log(PCLab1.procesador);
console.log(PCLab1.ram);

console.log(PCLab2.marca, 
            PCLab2.procesador, 
            PCLab2.ram);

const mensaje = "Tipo de datos JavaSript: ";

//Funciones de JS
//console.log(mensaje.length()); //Devuelve el número/cantidad de caracteres que tiene la cadena
console.log(mensaje.trim()); //Elimina los espacios
console.log(mensaje.toUpperCase()); //Convierte a mayusculas
console.log(mensaje.includes("es")); //Busca si existe una palabra que contenga el temrino "es".

const lenguajes = ["HTML", "CSS", "JAVASCRIPT"];

lenguajes.push("PYTHON"); //Agrega un nuevo elemento al final del arreglo
lenguajes.pop(); //Elimina el último elemento del arreglo
lenguajes.unshift("PHP"); //Agrega un nuevo elemento al inicio del arreglo
lenguajes.shift(); //Elimina el primer elemento del arreglo
lenguajes.join(", "); //Une los elementos del arreglo y los convierte en una cadena de texto,
//separando cada elemento por el caracter que se le indique (en este caso, una coma y un espacio)
console.log(lenguajes.join(", "));  
