    <?php
//VALIDACIÓN DE SESIÓN 
session_start();

//Si no existe sesión redirigir al login
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login2.html");
    exit();
}

//Evitamos volver atras con el navegador despues de cerrar la sesion
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

?>
    
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-
    scale=1.0">
    <title>Panel ABC - Matrícula OnLine</title>

    <!-- FRAMEWORK BOOTSTRAP -->
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min
    .css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!-- LIBRERÍA DE ICONOS -->
    <script src="https://kit.fontawesome.com/812c8ee19a.js"
    crossorigin="anonymous"></script>

    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">

    <!-- FUENTES DE GOOGLE FONTS -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0, 200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,5 00;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <!-- LIBRERÍA AJAX -->
    <link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- HOJA DE ESTILOS -->
    <link rel="stylesheet" href="../proyecto-js/css/styles-dashboard.css">

    <!-- LIBRERÍA JQUERY -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    </head>

    <body>

        <div class="containers">
        <aside class="sidebar">
        <div class="sidebar-header">
        <i class="fa-solid fa-graduation-cap"></i>
        <h2>SISTEMA DE MATRÍCULA</h2>
        </div>

        <nav class="sidebar-nav">
            <ul>
                <li><a href="#"><i class="fa-solid fa-house"></i> Dashboard</a></li>
                <li class="active"><a href="#"><i class="fa-solid fa-user-graduate"></i> Estudiantes</a></li>
                <li><a href="#"><i class="fa-solid fa-chalkboard-user"></i></i> Aulas</a></li>
                <li><a href="#"><i class="fa-solid fa-book"></i> Cursos/Grados</a></li>
                <li><a href="#"><i class="fa-solid fa-file-contract"></i> Matrículas</a></li>
                <li><a href="#"><i class="fa-solid fa-money-bill-wave"></i> Pagos</a></li>
                <li><a href="#"><i class="fa-solid fa-gear"></i> Configuración</a></li>
                <li><a href="#"><i class="fa-solid fa-sign-out-alt"></i> Cerrar Sesión</a></li>
            </ul>
        </nav>
        <div class="sidebar-footer">
            <div class="user-profile">
                <img src="" alt="Avatar">
                <div class="user-info">
                    <h3>Administrador</h3>
                    <a href="#">Ver perfil</a>
                </div>
            </div>
        </div>
        </aside>

        <main class="main-content">

        <header class="top-header">
            <div class="header-left">
            <h2>Panel de Administración</h2>
                </div>
                <div class="header-right">
                <i class="fa-solid fa-bell"></i>
                <div class="search-bar">
                <input type="text" placeholder="Buscar...">
                <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <div class="user-dropdown">
                <img src="" alt="Giancarlos">
                <h3>Giancarlos <i class="fa-solid fa-chevron-down"></i></h3>
                </div>
            </div>
        </header>
        <div class="content-body">
        <div class="card table-card">


        <!-- MODULO DE CONFIGURACIÓN DE USUARIO -->
        <div id="moduloConfiguracion" class="ocultar-modulo">
        <div  class="config-wrapper">
    <div class="config-container">
        <div class="card">
            <div class="card-header">
                <h2>Configuración de Usuario</h2>
            </div>
            <div class="card-body">
                <form id="formConfig">
                    <div class="form-grid-config">
                        <div class="campo">
                            <label for="usernameConfig">Usuario</label>
                            <div class="formulario__modal">
                                <input class="formulario__modal_input" type="text" id="usernameConfig" name="username" required>
                                <i class="fa-solid fa-user formulario__icono"></i>
                            </div>
                        </div>
                        <div class="campo">
                            <label for="passwordConfig">Nueva Contraseña</label>
                            <div class="formulario__modal">
                                <input class="formulario__modal_input" type="password" id="passwordConfig" name="password">
                                <i class="fa-solid fa-lock formulario__icono"></i>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>

            <!-- MODULO DE ESTUDIANTES -->
    <div class="moduloEstudiantes" id="moduloEstudiantes">
        <div class="card-header">
        <h2>Estudiantes Recientes</h2>
        <button id="btnAbrirModal" class="btn btn-primary">
        <i class="fa-solid fa-plus"></i> Registrar Nuevo
        </button>
        </div>
        <table class="data-table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Fecha de Nacimiento</th>
                <th>Celular</th>
                <th>Correo</th>
                <th>Estado</th>
                <th>Acciones</th>
                </tr>
            </thead>
        <tbody id="tablaAlumnos"></tbody>
        </table>
        <div class="card-footer">
            <p>Mostrando 2 de 50 registros</p>
        </div>

    </div>

    <!-- MODULO DE AULAS -->

    <div id="moduloAulas" class="ocultar-modulo">
    <div class="card-header">
        <h2>Gestión de Aulas</h2>
        <button id="btnAbrirModalAula" class="btn btn-primary">
            <i class="fa-solid fa-plus"></i> Nueva Aula
        </button>
    </div>
    <table class="data-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nivel</th>
                <th>Grado</th>
                <th>Sección</th>
                <th>Vacantes</th>
                <th>Disponibles</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaAulas"></tbody>
    </table>
    <div class="card-footer">
        <p>Listado de aulas registradas</p>
    </div>
</div>

        <!-- MODULO DE MATRÍCULAS -->

<div id="moduloMatricula" class="ocultar-modulo">
    <div class="card-header">
        <h2>Matrículas</h2>
        <button id="btnAbrirModalMatricula" class="btn btn-primary">
            <i class="fa-solid fa-plus"></i> Nueva Matrícula
        </button>
    </div>
    <table class="data-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Alumno</th>
                <th>Aula</th>
                <th>Código Pago</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody id="tablaMatriculas"></tbody>
    </table>
</div>


        <!-- MODULO DE PAGOS -->
    <div id="moduloPagos" class="ocultar-modulo">
    <div class="card-header">
        <h2>Pagos</h2>
    </div>
    <table class="data-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Alumno</th>
                <th>Aula</th>
                <th>Código Pago</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody id="tablaPagos"></tbody>
    </table>
</div>

        <!-- MODULO DEL DASHBOARD -->

        <div id="moduloDashboard" class="ocultar-modulo">
    <div class="kpi-grid">
        <div class="kpi-card">
            <div class="kpi-icon kpi-azul">
                <i class="fa-solid fa-users"></i>
            </div>
            <div class="kpi-info">
                <h3>Total Alumnos</h3>
                <h2 id="kpiTotalAlumnos">0</h2>
            </div>
        </div>
        <div class="kpi-card">
            <div class="kpi-icon kpi-verde">
                <i class="fa-solid fa-school"></i>
            </div>
            <div class="kpi-info">
                <h3>Aulas Activas</h3>
                <h2 id="kpiTotalAulas">0</h2>
            </div>
        </div>
        <div class="kpi-card">
            <div class="kpi-icon kpi-naranja">
                <i class="fa-solid fa-ticket"></i>
            </div>
            <div class="kpi-info">
            <h3>Vacantes Disp.</h3>
            <h2 id="kpiVacantesDisp">0</h2>
            </div>
            </div>
            </div>
            <div class="charts-grid">
            <div class="card chart-card">
            <div class="card-header">
            <h2>Alumnos por Género</h2>
            </div>
            <div class="card-body">
            <canvas id="graficoGenero"></canvas>
            </div>
            </div>
            <div class="card chart-card">
            <div class="card-header">
            <h2>Vacantes por Nivel Educativo</h2>
            </div>
            <div class="card-body">
            <canvas id="graficoNiveles"></canvas>
            </div>
            </div>
            </div>
            </div>
        </div>
        </div>
        </main>
        </div>

        <!-- MODAL ALUMNOS -->
        <div id="modalAlumno" class="modal-overlay" style="display: none;">
        <div class="modal-content">

        <div class="modal-header">
        <h2 id="modalTitulo">Registrar Nuevo Alumno</h2>
        <i class="fa-solid fa-xmark btn-cerrar-modal"></i>
        </div>
        <form id="formAlumno">

        <input type="hidden" id="id_alumno" name="id_alumno">
        <input type="hidden" id="opcion" name="opcion" value="1">

        <div class="form-grid">

    <div class="campo">
        <label for="dni">DNI</label>
        <div class="formulario__modal">
            <input class="formulario__modal_input" type="text" id="dni" name="dni" maxlength="8" required>
            <i class="fa-solid fa-address-card formulario__icono"></i>
        </div>
    </div>

    <div class="campo">
        <label for="nombres">Nombres</label>
        <div class="formulario__modal">
            <input class="formulario__modal_input" type="text" id="nombres" name="nombres" required>
            <i class="fa-solid fa-user formulario__icono"></i>
        </div>
    </div>

    <div class="campo">
        <label for="apellidos">Apellidos</label>
        <div class="formulario__modal">
            <input class="formulario__modal_input" type="text" id="apellidos" name="apellidos" required>
            <i class="fa-solid fa-user formulario__icono"></i>
        </div>
    </div>

    <div class="campo">
        <label for="fecha_nac">Fecha de Nacimiento</label>
        <div class="formulario__modal">
            <input class="formulario__modal_input" type="date" id="fecha_nac" name="fecha_nac" required>
        </div>
    </div>

    <div class="campo">
        <label for="edad">Edad</label>
        <div class="formulario__modal">
            <input class="formulario__modal_input" type="number" id="edad" name="edad" required>
            <i class="fa-solid fa-hashtag formulario__icono"></i>
        </div>
    </div>

    <div class="campo">
        <label for="genero">Género *</label>
        <div class="formulario__modal">
            <select class="formulario__modal_input" id="genero" name="genero" required>
                <option value="">Seleccione...</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
            </select>
            <i class="fa-solid fa-venus-mars formulario__icono"></i>
        </div>
    </div>

    <div class="campo">
        <label for="direccion">Dirección</label>
        <div class="formulario__modal">
            <input class="formulario__modal_input" type="text" id="direccion" name="direccion" required>
            <i class="fa-solid fa-location-dot formulario__icono"></i>
        </div>
    </div>

    <div class="campo">
        <label for="celular">Celular</label>
        <div class="formulario__modal">
            <input class="formulario__modal_input" type="text" id="celular" name="celular" maxlength="9" required>
            <i class="fa-solid fa-phone formulario__icono"></i>
        </div>
    </div>

    <div class="campo">
        <label for="correo">Correo</label>
        <div class="formulario__modal">
            <input class="formulario__modal_input" type="email" id="correo" name="correo" required>
            <i class="fa-solid fa-envelope formulario__icono"></i>
        </div>
    </div>

    <div class="campo">
        <label for="apoderado">Apoderado</label>
        <div class="formulario__modal">
            <input class="formulario__modal_input" type="text" id="apoderado" name="apoderado" required>
            <i class="fa-solid fa-user-tie formulario__icono"></i>
        </div>
    </div>

    <div class="campo">
        <label for="cel_apoderado">Celular Apoderado</label>
        <div class="formulario__modal">
            <input class="formulario__modal_input" type="text" id="cel_apoderado" name="cel_apoderado" maxlength="9" required>
            <i class="fa-solid fa-phone formulario__icono"></i>
        </div>
    </div>

    <div class="campo">
        <label for="username">Usuario</label>
        <div class="formulario__modal">
            <input class="formulario__modal_input" type="text" id="username" name="username" required>
            <i class="fa-solid fa-user formulario__icono"></i>
        </div>
    </div>

    <div class="campo">
        <label for="password">Contraseña</label>
        <div class="formulario__modal">
            <input class="formulario__modal_input" type="password" id="password" name="password">
            <i class="fa-solid fa-lock formulario__icono"></i>
        </div>
    </div>

    <div class="campo">
        <label for="estado">Estado</label>
        <div class="formulario__modal">
            <select class="formulario__modal_input" name="estado" id="estado" required>
                <option value="">Seleccione...</option>
                <option value="A">Activo</option>
                <option value="I">Inactivo</option>
                <option value="E">En proceso</option>
            </select>
            <i class="fa-solid fa-toggle-on formulario__icono"></i>
        </div>
    </div>

    <div class="modal-footer">
        
    </div>

        <div class="modal-footer"> 
            <button type="button" class="btn btn-secondary btn-cancelar-datos">Cancelar</button> 
            <button type="submit" class="btn btn-primary btn-guardar-datos">Guardar Datos</button> 
        </div>
</div>
        </form>
        </div>
        </div>

        
<!-- MODAL AULA -->
<div id="modalAula" class="modal-overlay" style="display: none;">
    <div class="modal-content">
        <div class="modal-header">
            <h2 id="modalTituloAula">Registrar Nueva Aula</h2>
            <i class="fa-solid fa-xmark btn-cerrar-modal-aula"></i>
        </div>
        <form id="formAula">
            <input type="hidden" id="id_aula" name="id_aula">
            <input type="hidden" id="opcionAula" name="opcion" value="1">
            <div class="form-grid">
                <div class="campo">
                    <label for="nivel">Nivel</label>
                    <div class="formulario__modal">
                        <select class="formulario__modal_input" id="nivel" name="nivel" required>
                            <option value="">Seleccione...</option>
                            <option value="Primaria">Primaria</option>
                            <option value="Secundaria">Secundaria</option>
                        </select>
                        <i class="fa-solid fa-layer-group formulario__icono"></i>
                    </div>
                </div>
                <div class="campo">
                    <label for="grado">Grado</label>
                    <div class="formulario__modal">
                        <input class="formulario__modal_input" type="number" id="grado" name="grado" required>
                        <i class="fa-solid fa-hashtag formulario__icono"></i>
                    </div>
                </div>
                <div class="campo">
                    <label for="seccion">Sección</label>
                    <div class="formulario__modal">
                        <input class="formulario__modal_input" type="text" id="seccion" name="seccion" maxlength="1" required>
                        <i class="fa-solid fa-font formulario__icono"></i>
                    </div>
                </div>
                <div class="campo">
                    <label for="vacantes_totales">Vacantes Totales</label>
                    <div class="formulario__modal">
                        <input class="formulario__modal_input" type="number" id="vacantes_totales" name="vacantes_totales" required>
                        <i class="fa-solid fa-users formulario__icono"></i>
                    </div>
                </div>
                <div class="campo">
                    <label for="vacantes_disponibles">Vacantes Disponibles</label>
                    <div class="formulario__modal">
                        <input class="formulario__modal_input" type="number" id="vacantes_disponibles" name="vacantes_disponibles" required>
                        <i class="fa-solid fa-ticket formulario__icono"></i>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-cerrar-modal-aula">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar Datos</button>
            </div>
        </form>
    </div>
</div>

        <!-- MODAL MATRÍCULA -->
<div id="modalMatricula" class="modal-overlay" style="display: none;">
    <div class="modal-content">
        <div class="modal-header">
            <h2 id="modalTituloMatricula">Nueva Matrícula</h2>
            <i class="fa-solid fa-xmark btn-cerrar-modal-matricula"></i>
        </div>
        <form id="formMatricula">
            <input type="hidden" name="opcion" value="1">
            <div class="form-grid">
                <div class="campo">
                    <label for="selectAlumno">Alumno</label>
                    <div class="formulario__modal">
                        <select class="formulario__modal_input" id="selectAlumno" name="id_alumno" required></select>
                        <i class="fa-solid fa-user-graduate formulario__icono"></i>
                    </div>
                </div>
                <div class="campo">
                    <label for="selectAula">Aula</label>
                    <div class="formulario__modal">
                        <select class="formulario__modal_input" id="selectAula" name="id_aula" required></select>
                        <i class="fa-solid fa-school formulario__icono"></i>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-cerrar-modal-matricula">Cancelar</button>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
    </div>
</div>



        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <!-- LIBRERÍA AJAX -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

        <!-- Dashboard JS -->
        <script src="../proyecto-js/js/dashboard.js"></script> 

        <!-- LIBRERÍA DE ALERTAS -->
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> 

        <!-- Librería JS de bootstrap --> 
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </body>
    </html>
