<?php

header('Content-Type: application/json');

$host = 'localhost';
$db = 'MATRICULA';
$user = 'root';
$pass = '';

try {

    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $opcion = $_POST['opcion'] ?? '';

    switch ($opcion) {

        case '1':
            $stmt = $pdo->prepare("SELECT ID, USERNAME FROM USUARIO LIMIT 1");
            $stmt->execute();
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode([
                "exito" => true,
                "usuario" => $usuario
            ]);

        break;

        case '2':
            if (!empty($_POST['password'])) {
                $hash = password_hash($_POST['password'], PASSWORD_DEFAULT);
                $sql = "UPDATE USUARIO SET USERNAME=?, PASSWORD_HASH=? WHERE ID=1";
                $params = [$_POST['username'], $hash];
            } else {

                $sql = "UPDATE USUARIO SET USERNAME=? WHERE ID=1";
                $params = [$_POST['username']];
            }

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            echo json_encode([
                "exito" => true,
                "mensaje" => "Datos actualizados correctamente."
            ]);

        break;

        default:
            echo json_encode([
                "exito" => false,
                "mensaje" => "Opción no válida."
            ]);
    }

} catch (PDOException $e) {
    echo json_encode([
        "exito" => false,
        "mensaje" => "Error BD: " . $e->getMessage()
    ]);
}