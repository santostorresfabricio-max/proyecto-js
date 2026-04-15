<?php
session_start();

header('Content-Type: application/json');

$host = 'localhost';
$db   = 'matricula';
$user = 'root';
$pass = '';

try {

    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //Recibir los datos enviados por AJAX
    $usuarioIngresado = $_POST['user'] ?? '';
    $passwordIngresada = $_POST['pass'] ?? '';

    //Consulta para buscar usuario
    $sql = "SELECT id, username, password_hash 
            FROM usuario 
            WHERE username = :usuario 
            LIMIT 1";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':usuario', $usuarioIngresado);
    $stmt->execute();

    $usuarioFila = $stmt->fetch(PDO::FETCH_ASSOC);

    // Validar usuario y contraseña
    if ($usuarioFila && password_verify($passwordIngresada, $usuarioFila['password_hash'])) {

        //Crear variables de sesión
        $_SESSION['usuario_id'] = $usuarioFila['id'];
        $_SESSION['username']   = $usuarioFila['username'];

        echo json_encode([
            "exito" => true,
            "mensaje" => "Login correcto"
        ], JSON_UNESCAPED_UNICODE);

    } else {

        //Credenciales incorrectas
        echo json_encode([
            "exito" => false,
            "mensaje" => "Usuario o contraseña incorrectos."
        ], JSON_UNESCAPED_UNICODE);
    }

} catch (PDOException $e) {

    //Error de conexión a la BD
    echo json_encode([
        "exito" => false,
        "mensaje" => "Error de conexión a la BD."
    ], JSON_UNESCAPED_UNICODE);
}
?>