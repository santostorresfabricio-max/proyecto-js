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
        //crear matrícula
        case '1':
            $sql = "INSERT INTO AULA (NIVEL, GRADO, SECCION, VACANTES_TOTALES, VACANTES_DISPONIBLES)
                    VALUES (?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $_POST['nivel'],
                $_POST['grado'],
                $_POST['seccion'],
                $_POST['vacantes_totales'],
                $_POST['vacantes_disponibles']
            ]);
            echo json_encode(["exito" => true, "mensaje" => "Aula registrada"]);
        break;

        //editar matrícula
        case '2':
            $sql = "UPDATE AULA SET 
                    NIVEL=?, GRADO=?, SECCION=?, 
                    VACANTES_TOTALES=?, VACANTES_DISPONIBLES=?
                    WHERE ID_AULA=?";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $_POST['nivel'],
                $_POST['grado'],
                $_POST['seccion'],
                $_POST['vacantes_totales'],
                $_POST['vacantes_disponibles'],
                $_POST['id_aula']
            ]);
            echo json_encode(["exito" => true, "mensaje" => "Aula actualizada"]);
        break;

        //eliminar aula
        case '3':
            $stmt = $pdo->prepare("DELETE FROM AULA WHERE ID_AULA=?");
            $stmt->execute([$_POST['id_aula']]);
            echo json_encode(["exito" => true, "mensaje" => "Aula eliminada"]);
        break;

        //listar aulas
        case '4':
            $stmt = $pdo->query("SELECT * FROM AULA ORDER BY ID_AULA DESC");
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data);
        break;

        default:
            echo json_encode(["exito" => false]);
    }

} catch (PDOException $e) {
    echo json_encode(["exito" => false, "mensaje" => $e->getMessage()]);
}
?>