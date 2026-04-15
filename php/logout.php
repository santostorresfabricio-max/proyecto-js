<?php
//Cerrar la sesión y redirigir al login
session_start();

//Destruye toda la sesión
session_destroy();

//Redirige al login
header("Location: ../login2.html");
exit();

?>