$(document).ready(function () {

    // 1. ABRIR MODAL
    $('#btnAbrirModal').on('click', function () {
        $('#formAlumno')[0].reset();
        $('#opcion').val('1');
        $('#modalTitulo').text('Registrar Nuevo Alumno');
        $('#password').attr('required', true);
        $('#modalAlumno').fadeIn();
    });

    // 2. CERRAR MODAL
    $('.btn-cerrar-modal').on('click', function () {
        $('#modalAlumno').fadeOut();
    });

    // 3. ENVIAR FORMULARIO (Crear o Editar)
    $('#formAlumno').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "php/crud_alumnos.php",
            type: "POST",
            dataType: "json",
            data: $(this).serialize(),

            success: function (respuesta) {
                if (respuesta.exito) {
                    $('#modalAlumno').fadeOut();
                    Swal.fire('¡Éxito!', respuesta.mensaje, 'success')
                        .then(() => {
                            location.reload();
                        });
                } else {
                    Swal.fire('Error', respuesta.mensaje, 'error');
                }
            }
        });
    });

    // 4. ELIMINAR
    $(document).on('click', '.btn-eliminar-alumno', function () {
        // Obtenemos la fila y buscamos el ID del alumno (que está en la
        //primera columna <td>)
        let fila = $(this).closest('tr');
        let idAlumno = fila.find('td:eq(0)').text();

        Swal.fire({
            title: '¿Eliminar Alumno?',
            text: "Se borrará permanentemente de la Base de Datos.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {

            if (result.isConfirmed) {

                $.ajax({
                    url: "php/crud_alumnos.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                        opcion: 3,
                        id_alumno: idAlumno
                    },

                    success: function (respuesta) {
                        if (respuesta.exito) {
                            fila.fadeOut(400, function () {
                                $(this).remove();
                            });

                            Swal.fire('Eliminado', respuesta.mensaje, 'success');
                        }
                    }
                });
            }
        });
    });

    // 5. EDITAR
    $(document).on('click', '.btn-editar-alumno', function () {

        let fila = $(this).closest('tr');
        let idAlumno = fila.find('td:eq(0)').text();
        let nombres = fila.find('td:eq(1)').text();
        let apellidos = fila.find('td:eq(2)').text();

        
        let estado = fila.find('td:eq(7)').text().trim();
        if(estado === "Activo") {
            $('#estado').val('A');
        }
        else if(estado === "Inactivo") {
            $('#estado').val('I');
        }
        else if(estado === "En Proceso") {
            $('#estado').val('E');
        }

        $('#id_alumno').val(idAlumno);
        $('#opcion').val('2');
        $('#modalTitulo').text('Editar Alumno');
        $('#password').removeAttr('required');

        $('#campo').val();
        $('#nombres').val(nombres);
        $('#apellidos').val(apellidos);
        

        $('#modalAlumno').fadeIn();
    });

    /* ========================================================
        FUNCIÓN PARA CARGAR LA TABLA DESDE MYSQL
    ======================================================== */
    function cargarAlumnos() {

        $.ajax({
            url: "php/crud_alumnos.php",
            type: "POST",
            dataType: "json",
            data: { opcion: 4 }, // Le pedimos a PHP que ejecute el case 4

            success: function (data) {

                let tbody = $('#tablaAlumnos');
                tbody.empty();
                // Limpiamos la tabla por si había algo
                $.each(data, function (index, alumno) {

                    let claseEstado = "";
                    let textoEstado = "";
                
                    if (alumno.ESTADO === "A") {
                        claseEstado = "estado-activo";
                        textoEstado = "Activo";
                    } 
                    else if (alumno.ESTADO === "I") {
                        claseEstado = "estado-inactivo";
                        textoEstado = "Inactivo";
                    } 
                    else if (alumno.ESTADO === "E") {
                        claseEstado = "estado-proceso";
                        textoEstado = "En Proceso";
                    }
                
                    let fila = `
                    <tr>
                        <td>${alumno.ID_ALUMNO}</td>
                        <td>${alumno.NOMBRES}</td>
                        <td>${alumno.APELLIDOS}</td>
                        <td>${alumno.DNI_ALUMNO}</td>
                        <td>${alumno.FECHA_NACIMIENTO}</td>
                        <td>${alumno.CELULAR}</td>
                        <td>${alumno.CORREO}</td>
                        <td>
                            <span class="estado-badge ${claseEstado}">
                                ${textoEstado}
                            </span>
                        </td>
                        <td class="action-icons">
                            <i class="fa-solid fa-pen-to-square btn-editar-alumno"></i>
                            <i class="fa-solid fa-eye btn-ver-alumno"></i>
                            <i class="fa-solid fa-trash btn-eliminar-alumno"></i>
                        </td>
                    </tr>
                    `;
                
                    tbody.append(fila);
                });
            },

            error: function () {
                console.log("Error al cargar los datos de la tabla.");
            }
        });
    }
    // ¡MUY IMPORTANTE! Ejecutar la función apenas cargue la página
    cargarAlumnos();
});


/* ========================================================
3. 1. NAVEGACIÓN DEL MENÚ LATERAL (SPA)
4. ======================================================== */

$('.sidebar-nav li').on('click', function (e) {
    e.preventDefault();

    // Quitar 'active' de todos y ponérselo al actual
    $('.sidebar-nav li').removeClass('active');
    $(this).addClass('active');

    // Lógica para mostrar/ocultar módulos basada en el texto
    // del menú
    let menuTexto = $(this).text().trim(); // Ej: "Dashboard" o"Estudiantes"

    if (menuTexto === 'Dashboard') {
        $('#moduloEstudiantes').hide();
        $('#moduloAulas').hide();
        $('#moduloMatricula').hide();
        $('#moduloPagos').hide();
        $('#moduloConfiguracion').hide();
        $('#moduloDashboard').fadeIn();
        cargarDatosDashboard(); // Función que crearemos abajo
    }
    else if (menuTexto === 'Estudiantes') {
        $('#moduloDashboard').hide();
        $('#moduloAulas').hide();
        $('#moduloMatricula').hide();
        $('#moduloPagos').hide();
        $('#moduloConfiguracion').hide();
        $('#moduloEstudiantes').fadeIn();
        cargarAlumnos(); // Tu función existente que carga la tabla
    }
    else if(menuTexto === 'Aulas') {
        $('#moduloEstudiantes').hide();
        $('#moduloDashboard').hide();
        $('#moduloMatricula').hide();
        $('#moduloPagos').hide();
        $('#moduloConfiguracion').hide();
        $('#moduloAulas').fadeIn();
        cargarAulas();
    }   
    else if (menuTexto === 'Matrículas') {
        $('#moduloDashboard').hide();
        $('#moduloEstudiantes').hide();
        $('#moduloAulas').hide();
        $('#moduloPagos').hide();
        $('#moduloConfiguracion').hide();
        $('#moduloMatricula').fadeIn();
        cargarMatriculas();
}
    else if (menuTexto === 'Pagos') {
    $('#moduloDashboard').hide();
    $('#moduloEstudiantes').hide();
    $('#moduloMatricula').hide();
    $('#moduloAulas').hide();
    $('#moduloConfiguracion').hide();
    $('#moduloPagos').fadeIn();
    cargarPagos();
}
    else if (menuTexto === 'Configuración') {
    $('#moduloDashboard').hide();
    $('#moduloEstudiantes').hide();
    $('#moduloMatricula').hide();
    $('#moduloPagos').hide();
    $('#moduloAulas').hide();
    $('#moduloConfiguracion').fadeIn();
    cargarUsuario();
}
    else if (menuTexto === 'Cerrar Sesión') {

    Swal.fire({
        title: '¿Cerrar sesión?',
        text: "Tu sesión actual se finalizará.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {

        if (result.isConfirmed) {

            // 🔐 Redirige al logout real
            window.location.href = "php/logout.php";
        }
    });
}
    else {
        // Para menús aún no construidos (Cursos, Pagos, etc.)
        $('#moduloDashboard').hide();
        $('#moduloEstudiantes').hide();
        Swal.fire('Módulo en Desarrollo', 'Esta sección estará disponible pronto.', 'info');
    }
});

// Variables globales para almacenar las instancias de los gráficos y poder destruirlos antes de crear uno nuevo
let chartGenero = null;
let chartNiveles = null;
// Función para cargar los datos del dashboard desde MySQL y actualizar los KPIs y graficos
function cargarDatosDashboard() {

    $.ajax({
        url: "php/dashboard_datos.php",
        type: "GET",
        dataType: "json",
        success: function (respuesta) {

            console.log(respuesta);
            if (respuesta.exito) {
                let kpis = respuesta.datos.kpis;

                // KPIs
                $('#kpiTotalAlumnos').text(kpis.totalAlumnos);
                $('#kpiTotalAulas').text(kpis.totalAulas);
                $('#kpiVacantesDisp').text(kpis.vacantesDisp);

                // GRAFICO GENERO
                let etiquetasGenero = [];
                let datosGenero = [];

                respuesta.datos.graficos.genero.forEach(g => {
                    etiquetasGenero.push(g.GENERO);
                    datosGenero.push(g.cantidad);
                });

                dibujarGraficoGenero(etiquetasGenero, datosGenero);

                // GRAFICO NIVELES 
                let etiquetasNivel = [];
                let totales = [];
                let disponibles = [];

                respuesta.datos.graficos.niveles.forEach(n => {
                    etiquetasNivel.push(n.NIVEL);
                    totales.push(n.totales);
                    disponibles.push(n.disponibles);
                });

                dibujarGraficoNiveles(etiquetasNivel, totales, disponibles);

            } else {
                console.log("Error:", respuesta.mensaje);
            }
        },
        error: function (xhr) {
            console.log("Error AJAX:", xhr.responseText);
        }
    });
}

// --- FUNCIONES AUXILIARES PARA DIBUJAR ---
function dibujarGraficoGenero(etiquetas, datos) {
    let ctx = document.getElementById('graficoGenero').getContext('2d');

    // Destruir gráfico anterior si existe (evita superposición al cambiar de pestaña)
    if (chartGenero) {
        chartGenero.destroy();
    }

    chartGenero = new Chart(ctx, {
        url: "php/dashboard_datos.php",
        type: 'doughnut', // Gráfico circular tipo "Dona"
        data: {
            labels: etiquetas,
            datasets: [{
                data: datos,
                backgroundColor: ['#fda29a','#3498DB', '#F1C40F'],

                // Colores corporativos

                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Permite que se adapte a nuestro CSS
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function dibujarGraficoNiveles(etiquetas, totales, disponibles) {
    let ctx = document.getElementById('graficoNiveles').getContext('2d');

    if (chartNiveles) {
        chartNiveles.destroy();
    }

    chartNiveles = new Chart(ctx, {
        type: 'bar', // Gráfico de barras
        data: {
            labels: etiquetas,
            datasets: [
                {
                    label: 'Vacantes Totales',
                    data: totales,
                    backgroundColor: '#95A5A6', // Gris
                    borderRadius: 4
                },
                {
                    label: 'Vacantes Disponibles',
                    data: disponibles,
                    backgroundColor: '#2ECC71', // Verde
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}


    // -- MODAL DE MANEJO DE AULAS --

// 1. ABRIR MODAL
$('#btnAbrirModalAula').on('click', function () {
    $('#formAula')[0].reset();
    $('#opcionAula').val('1');
    $('#modalTituloAula').text('Registrar Nueva Aula');
    $('#modalAula').fadeIn();
});

// 2. CERRAR MODAL
$('.btn-cerrar-modal-aula').on('click', function () {
    $('#modalAula').fadeOut();
});

// 3. ENVIAR FORMULARIO (Crear o Editar)
$('#formAula').submit(function (e) {
    e.preventDefault();

    $.ajax({
        url: "php/crud_aulas.php",
        type: "POST",
        dataType: "json",
        data: $(this).serialize(),

        success: function (respuesta) {
            if (respuesta.exito) {
                $('#modalAula').fadeOut();

                Swal.fire('¡Éxito!', respuesta.mensaje, 'success')
                    .then(() => {
                        cargarAulas();
                    });
            } else {
                Swal.fire('Error', respuesta.mensaje, 'error');
            }
        }
    });
});

//4. EDITAR AULAS
$(document).on('click', '.btn-editar-aula', function () {

    let fila = $(this).closest('tr');

    let id = fila.find('td:eq(0)').text();
    let nivel = fila.find('td:eq(1)').text();
    let grado = fila.find('td:eq(2)').text();
    let seccion = fila.find('td:eq(3)').text();
    let totales = fila.find('td:eq(4)').text();
    let disponibles = fila.find('td:eq(5)').text();

    $('#id_aula').val(id);
    $('#nivel').val(nivel);
    $('#grado').val(grado);
    $('#seccion').val(seccion);
    $('#vacantes_totales').val(totales);
    $('#vacantes_disponibles').val(disponibles);

    $('#opcionAula').val('2');
    $('#modalTituloAula').text('Editar Aula');

    $('#modalAula').fadeIn();
});

// 5. ELIMINAR AULAS
$(document).on('click', '.btn-eliminar-aula', function () {

    let fila = $(this).closest('tr');
    let id = fila.find('td:eq(0)').text();

    Swal.fire({
        title: '¿Eliminar Aula?',
        text: "Se eliminará permanentemente.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                url: "php/crud_aulas.php",
                type: "POST",
                dataType: "json",
                data: {
                    opcion: 3,
                    id_aula: id
                },
                success: function (respuesta) {
                    if (respuesta.exito) {
                        fila.fadeOut(400, function () {
                            $(this).remove();
                        });

                        Swal.fire('Eliminado', respuesta.mensaje, 'success');
                    }
                }
            });
        }
    });
});


//función para cargar las aulas en la tabla desde MySQL
function cargarAulas() {
    $.ajax({
        url: "php/crud_aulas.php",
        type: "POST",
        dataType: "json",
        data: { opcion: 4 },

        success: function (data) {
            let tbody = $('#tablaAulas');
            tbody.empty();

            $.each(data, function (i, aula) {

                let fila = `
                <tr>
                    <td>${aula.ID_AULA}</td>
                    <td>${aula.NIVEL}</td>
                    <td>${aula.GRADO}</td>
                    <td>${aula.SECCION}</td>
                    <td>${aula.VACANTES_TOTALES}</td>
                    <td>${aula.VACANTES_DISPONIBLES}</td>
                    <td class="action-icons">
                        <i class="fa-solid fa-pen-to-square btn-editar-aula"></i>
                        <i class="fa-solid fa-trash btn-eliminar-aula"></i>
                    </td>
                </tr>
                `;

                tbody.append(fila);
            });
        }
    });
}

        // -- MODAL DE MANEJO DE MATRÍCULAS --

    $('#btnAbrirModalMatricula').on('click', function () {
    $('#formMatricula')[0].reset();
    cargarAlumnosSelect();
    cargarAulasSelect();
    $('#modalMatricula').fadeIn();
    });

    $('.btn-cerrar-modal-matricula').on('click', function () {
    $('#modalMatricula').fadeOut();
});

function cargarAlumnosSelect() {
    $.ajax({
        url: "php/crud_matricula.php",
        type: "POST",
        data: { opcion: 2 },
        dataType: "json",
        success: function (data) {
            let select = $('#selectAlumno');
            select.empty();
            select.append('<option value="">Seleccione Alumno...</option>');

            data.forEach(a => {
                select.append(`<option value="${a.ID_ALUMNO}">
                    ${a.NOMBRES} ${a.APELLIDOS}
                </option>`);
            });
        }
    });
}

function cargarAulasSelect() {
    $.ajax({
        url: "php/crud_matricula.php",
        type: "POST",
        data: { opcion: 3 },
        dataType: "json",
        success: function (data) {
            let select = $('#selectAula');
            select.empty();
            select.append('<option value="">Seleccione Aula...</option>');

            data.forEach(a => {
                select.append(`<option value="${a.ID_AULA}">
                    ${a.NIVEL} ${a.GRADO}° ${a.SECCION} (Disp: ${a.VACANTES_DISPONIBLES})
                </option>`);
            });
        }
    });
}

$('#formMatricula').submit(function (e) {
    e.preventDefault();

    $.ajax({
        url: "php/crud_matricula.php",
        type: "POST",
        dataType: "json",
        data: $(this).serialize(),

        success: function (respuesta) {
            if (respuesta.exito) {
                $('#modalMatricula').fadeOut();

                Swal.fire('Éxito', respuesta.mensaje, 'success')
                    .then(() => {
                        cargarMatriculas();
                    });
            } else {
                Swal.fire('Error', respuesta.mensaje, 'error');
            }
        }
    });
});



function cargarMatriculas() {
    $.ajax({
        url: "php/crud_matricula.php",
        type: "POST",
        data: { opcion: 4 },
        dataType: "json",
        success: function (data) {

            let tbody = $('#tablaMatriculas');
            tbody.empty();

            data.forEach(m => {

                let estadoClase = m.ESTADO_PAGO === 'PAGADO'
                    ? 'estado-activo'
                    : m.ESTADO_PAGO === 'PENDIENTE'
                    ? 'estado-proceso'
                    : 'estado-inactivo'
                    ;

                let fila = `
                <tr>
                    <td>${m.ID_RESERVA}</td>
                    <td>${m.NOMBRES} ${m.APELLIDOS}</td>
                    <td>${m.NIVEL} ${m.GRADO}° ${m.SECCION}</td>
                    <td>${m.CODIGO_PAGO}</td>
                    <td>${m.FECHA_RESERVA}</td>
                    <td>
                        <span class="estado-badge ${estadoClase}">
                            ${m.ESTADO_PAGO}
                        </span>
                    </td>
                    <td class="action-icons">
                        <i class="fa-solid fa-trash" id="btn-eliminar-matricula"></i>
                    </td>
                </tr>
                `;

                tbody.append(fila);
            });
        }
    });
}

$(document).on('click', '#btn-eliminar-matricula', function () {

    let fila = $(this).closest('tr');
    let id = fila.find('td:eq(0)').text();

    Swal.fire({
        title: '¿Eliminar matrícula?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí'
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                url: "php/crud_matricula.php",
                type: "POST",
                data: { opcion: 5, id_reserva: id },
                dataType: "json",

                success: function (resp) {
                    if (resp.exito) {
                        fila.remove();
                        Swal.fire('Eliminado', resp.mensaje, 'success');
                    }
                }
            });
        }
    });
});


        //-- MODULO DE PAGOS ---

    function cargarPagos() {

    $.ajax({
        url: "php/crud_pagos.php",
        type: "POST",
        data: { opcion: 2 },
        dataType: "json",

        success: function (data) {

            let tbody = $('#tablaPagos');
            tbody.empty();

            data.forEach(p => {

                let estadoClase = p.ESTADO_PAGO === 'PAGADO'
                    ? 'estado-activo'
                    : p.ESTADO_PAGO === 'PENDIENTE'
                    ? 'estado-proceso'
                    : 'estado-inactivo';

                let boton = '';

                if (p.ESTADO_PAGO === 'PENDIENTE') {
                    boton = `<button class="btn btn-primary btn-pagar">Pagar</button>`;
                } else {
                    boton = `<span class="text-success"><i class="fa-solid fa-check"></i></span>`;
                }

                let fila = `
                <tr>
                    <td>${p.ID_RESERVA}</td>
                    <td>${p.NOMBRES} ${p.APELLIDOS}</td>
                    <td>${p.NIVEL} ${p.GRADO}° ${p.SECCION}</td>
                    <td>${p.CODIGO_PAGO}</td>
                    <td>${p.FECHA_RESERVA}</td>
                    <td>
                        <span class="estado-badge ${estadoClase}">
                            ${p.ESTADO_PAGO}
                        </span>
                    </td>
                    <td>${boton}</td>
                </tr>
                `;

                tbody.append(fila);
            });
        }
    });
}

$(document).on('click', '.btn-pagar', function () {

    let fila = $(this).closest('tr');
    let id = fila.find('td:eq(0)').text();

    Swal.fire({
        title: '¿Confirmar pago?',
        text: 'Esta acción no se puede revertir',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, pagar'
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                url: "php/crud_pagos.php",
                type: "POST",
                data: {
                    opcion: 1,
                    id_reserva: id
                },
                dataType: "json",

                success: function (resp) {

                    if (resp.exito) {

                        Swal.fire('Pagado', resp.mensaje, 'success');

                        fila.find('.estado-badge')
                            .removeClass('estado-proceso')
                            .addClass('estado-activo')
                            .text('PAGADO');

                        fila.find('.btn-pagar')
                            .replaceWith('<span class="text-success"><i class="fa-solid fa-check"></i></span>');
                    }
                }
            });
        }
    });
});



// MODULO DE CONFIGURACIÓN DE USUARIOS
function cargarUsuario() {

    $.ajax({
        url: "php/config_usuario.php",
        type: "POST",
        data: { opcion: 1 },
        dataType: "json",

        success: function (resp) {

            if (resp.exito) {
                $('#usernameConfig').val(resp.usuario.USERNAME);
            }
        }
    });
}
$('#formConfig').submit(function (e) {

    e.preventDefault();

    $.ajax({
        url: "php/config_usuario.php",
        type: "POST",
        data: {
            opcion: 2,
            username: $('#usernameConfig').val(),
            password: $('#passwordConfig').val()
        },
        dataType: "json",

        success: function (resp) {

            if (resp.exito) {
                Swal.fire('Éxito', resp.mensaje, 'success');
                $('#passwordConfig').val('');
            } else {
                Swal.fire('Error', resp.mensaje, 'error');
            }
        }
    });
});


