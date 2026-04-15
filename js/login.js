$(document).ready(function () {

    // Evento submit del formulario de login
    $("#loginForm").submit(function (evento) {

        evento.preventDefault(); // Evita que la página se recargue

        // Capturamos los valores de los inputs
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

                // 1. Mensaje de carga mientras PHP valida en la BD
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

                    // 2. CASO DE ÉXITO: Login correcto
                    Swal.fire({
                        icon: "success",
                        title: "¡Acceso Concedido!",
                        text: "Redirigiendo al sistema...",
                        showConfirmButton: false,
                        timer: 2000,
                    }).then(() => {

                        // 🔐 IMPORTANTE:
                        // Redirigir a archivo PHP (NO HTML) para validar sesión
                        window.location.href = "dashboard02.php";
                    });

                } else {

                    // 3. CASO DE ERROR: Credenciales incorrectas
                    Swal.fire({
                        icon: "error",
                        title: "Acceso Denegado",
                        text: "El usuario o la contraseña son incorrectos.",
                        confirmButtonColor: "#d33",
                    });
                }
            },

            error: function () {

                // 4. ERROR CRÍTICO: Problema con servidor o ruta
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


// ========================================================
// FUNCIÓN PARA CERRAR SESIÓN (SEGURA CON PHP)
// ========================================================
function cerrarSesion() {

    // 🔐 Ya no usamos localStorage porque trabajamos con sesiones PHP

    // Redirige al archivo que destruye la sesión
    window.location.href = "php/logout.php";
}

// Detecta cuando el usuario regresa con botón "atrás"
window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        window.location.reload();
    }
});