$(document).ready(function () {
    $("#loginForm").submit(function (evento) {
    evento.preventDefault(); //Evita que la pagina se recargue

    let usuario = $("#txtUsuario").val();
    let password = $("#txtPassword").val();

    $.ajax({
        url: "php/login.php",
        type: "POST",
        dataType: "json",
        data: {
        user: usuario,
        pass: password,
        },
        beforeSend: function () {
        // 1. Mensaje de carga mientras PHP consulta la Base de Datos
        Swal.fire({
            title: "Validando credenciales...",
            html: "Por favor, espere un momento.",
            allowOutsideClick: false,
            didOpen: () => {
            Swal.showLoading();
            },
        });
        },
        success: function (respuesta) {
        if (respuesta.exito) {
          // 2. CASO DE ÉXITO: Animación verde
            Swal.fire({
            
            icon: "success",
            title: "¡Acceso Concedido!",
            text: "Redirigiendo al sistema...",
            showConfirmButton: false,
            timer: 2000, // El popup se cierra solo en 2 segundos
            }).then(() => {
            // Esta redirección se ejecuta cuando el timer termina
            window.location.href = "dashboard.html";
            });
        } else {
          // 3. CASO DE ERROR: Animación roja (Credenciales inválidas)
            Swal.fire({
            icon: "error",
            title: "Acceso Denegado",
            text: "El usuario o la contraseña son incorrectos.",
            confirmButtonColor: "#d33", // Color rojo para el botón
            });
        }
        },
        error: function () {
        // 4. CASO DE ERROR CRÍTICO: Falla en el servidor o ruta
        Swal.fire({
            icon: "error",
            title: "¡Error de conexión!",
            text: "No se pudo conectar con el servidor.",
            confirmButtonColor: "#3085d6",
        });
        },
    });
    });
});

function cerrarSesion() {
    localStorage.removeItem("token"); // Elimina el token del almacenamiento local
    window.location.replace("login2.html"); // Manda al usuario a la página de inicio de sesión
}
