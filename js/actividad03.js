
//Metodo para ver el codigo de inventario privado.
this.privilegiado = function() {
    return `El código privado del inventario es: ${codigoInventario}`;
}


//Creación de 3 Instancias
const Eqp1 = new EquipoSoporte("Proyector", "Xiaomi", "Operativo");
const Eqp2 = new EquipoSoporte("Router", "Huawei", "Malogrado");
const Eqp3 = new EquipoSoporte("Monitor", "Asus", "Operativo");

//Instancias almacenadas dentro del array "equipos"
const equipos = [Eqp1, Eqp2, Eqp3];