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
    
    // 3. ENVIAR FORMULARIO
    $('#formAlumno').submit(function (e) {
    e.preventDefault();
    
    $.ajax({
    url: "php/crud-alumnos.php",
    type: "POST",
    dataType: "json",
    data: $(this).serialize(),
    
    success: function (respuesta) {
    if (respuesta.exito) {
    $('#modalAlumno').fadeOut();
    Swal.fire('¡Éxito!', respuesta.mensaje, 'success').then(() => {
    location.reload();
    });
    } else {
    Swal.fire('Error', respuesta.mensaje, 'error');
    }
    }
    });
    });
    
    // 4. ELIMINAR
    $(document).on('click', '.fa-trash', function () {
    
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
    url: "php/crud-alumnos.php",
    type: "POST",
    dataType: "json",
    data: { opcion: 3, id_alumno: idAlumno },
    
    success: function (respuesta) {
    if (respuesta.exito) {
    fila.fadeOut(400, function() {
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
    $(document).on('click', '.fa-pen-to-square', function () {
    
    let fila = $(this).closest('tr');
    let idAlumno = fila.find('td:eq(0)').text();
    let nombres = fila.find('td:eq(1)').text();
    let apellidos = fila.find('td:eq(2)').text();

    let estado = fila.find('td:eq(7)').text().trim();

    if (estado === "Activo") {
        $('#estado').val("A");
    } else if (estado === "Inactivo") {
        $('#estado').val("I");
    } else {
        $('#estado').val("E");
    }



    
    $('#id_alumno').val(idAlumno);
    $('#opcion').val('2');
    $('#modalTitulo').text('Editar Alumno');
    $('#password').removeAttr('required');
    
    $('#nombres').val(nombres);
    $('#apellidos').val(apellidos);
    
    $('#modalAlumno').fadeIn();
    });
    
    // CARGAR TABLA
    function cargarAlumnos() {
    
    $.ajax({
    url: "php/crud-alumnos.php",
    type: "POST",
    dataType: "json",
    data: { opcion: 4 },
    
    success: function (data) {
    
    let tbody = $('#tablaAlumnos');
    tbody.empty();
    
    $.each(data, function (index, alumno) {

        let claseEstado = "";
        let textoEstado = "";
    
        if (alumno.ESTADO === "A") {
            claseEstado = "status-activo";
            textoEstado = "Activo";
        } 
        else if (alumno.ESTADO === "I") {
            claseEstado = "status-inactivo";
            textoEstado = "Inactivo";
        } 
        else if (alumno.ESTADO === "E") {
            claseEstado = "status-proceso";
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
                <span class="status-badge ${claseEstado}">
                    ${textoEstado}
                </span>
            </td>
    
            <td class="action-icons">
                <i class="fa-solid fa-pen-to-square"></i>
                <i class="fa-solid fa-eye"></i>
                <i class="fa-solid fa-trash"></i>
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

    if(menuTexto === 'Dashboard') {
    $('#moduloEstudiantes').hide();
    $('#moduloDashboard').fadeIn();
    cargarDatosDashboard(); // Función que crearemos abajo
    }
    else if(menuTexto === 'Estudiantes') {
    $('#moduloDashboard').hide();
    $('#moduloEstudiantes').fadeIn();
    cargarAlumnos(); // Tu función existente que carga la tabla
}
    else {
    // Para menús aún no construidos (Cursos, Pagos, etc.)
    $('#moduloDashboard').hide();
    $('#moduloEstudiantes').hide();
    Swal.fire('Módulo en Desarrollo', 'Esta sección estará disponible pronto.', 'info');
    }
    });


    let chartGenero = null;
    let chartNiveles = null;

    function cargarDatosDashboard() {

        $.ajax({
            url: "php/dashboard_datos.php",
            type: "GET",
            dataType: "json",
            success: function (respuesta) {
    
                console.log(respuesta); // 👈 para depurar

                if (respuesta.exito) {
                    let kpis = respuesta.datos.kpis;
                    // KPIs
                    $('#kpiTotalAlumnos').text(kpis.totalAlumnos);
                    $('#kpiTotalAulas').text(kpis.totalAulas);
                    $('#kpiVacantesDisp').text(kpis.vacantesDisp);
    
                    // ===== GRÁFICO GÉNERO =====
                    let etiquetasGenero = [];
                    let datosGenero = [];
    
                    respuesta.datos.graficos.genero.forEach(g => {
                        etiquetasGenero.push(g.GENERO);
                        datosGenero.push(g.cantidad);
                    });
                    dibujarGraficoGenero(etiquetasGenero, datosGenero);
    
                    // ===== GRÁFICO NIVELES =====
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
    let ctx =
    document.getElementById('graficoGenero').getContext('2d');
    // Destruir gráfico anterior si existe (evita superposición al cambiar de pestaña)
    if (chartGenero) { chartGenero.destroy(); }
    chartGenero = new Chart(ctx, {
    url: "php/dashboard_datos.php",
    type: 'doughnut', // Gráfico circular tipo "Dona"
    data: {
    labels: etiquetas,
    datasets: [{
    data: datos,
    backgroundColor: ['#3498DB', '#E74C3C', '#F1C40F'],
    
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
let ctx =
document.getElementById('graficoNiveles').getContext('2d');
if (chartNiveles) { chartNiveles.destroy(); }
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

