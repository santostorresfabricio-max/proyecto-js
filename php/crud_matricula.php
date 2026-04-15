<?php
header('Content-Type: application/json');

$pdo = new PDO("mysql:host=localhost;dbname=MATRICULA;charset=utf8","root","");

$opcion = $_POST['opcion'] ?? '';

switch ($opcion) {

    // REGISTRAR MATRÍCULA
    case '1':
        // Validar vacantes
        $stmt = $pdo->prepare("SELECT VACANTES_DISPONIBLES FROM AULA WHERE ID_AULA=?");
        $stmt->execute([$_POST['id_aula']]);
        $vacantes = $stmt->fetchColumn();
        if ($vacantes <= 0) {
            echo json_encode(["exito"=>false,"mensaje"=>"No hay vacantes disponibles"]);
            exit;
        }
        // se genera un código de pago único para la matrícula
        $codigo = "MAT-" . rand(10000,99999);

        $stmt = $pdo->prepare("INSERT INTO RESERVA (ID_ALUMNO, ID_AULA, CODIGO_PAGO)
        VALUES (?, ?, ?)");

        $stmt->execute([
            $_POST['id_alumno'],
            $_POST['id_aula'],
            $codigo
        ]);
        //Restar la vacante
        $pdo->prepare("UPDATE AULA SET VACANTES_DISPONIBLES = VACANTES_DISPONIBLES - 1 WHERE ID_AULA=?")
            ->execute([$_POST['id_aula']]);

        echo json_encode(["exito"=>true,"mensaje"=>"Matrícula registrada"]);
    break;

    //listar alumnos para el select
    case '2':
        echo json_encode($pdo->query("SELECT ID_ALUMNO,NOMBRES,APELLIDOS FROM ALUMNO")->fetchAll(PDO::FETCH_ASSOC));
    break;

    //listar aulas para el select
    case '3':
        echo json_encode($pdo->query("SELECT * FROM AULA WHERE VACANTES_DISPONIBLES > 0")->fetchAll(PDO::FETCH_ASSOC));
    break;

    //listar matrículas
    case '4':
        $sql = "SELECT R.*, A.NOMBRES, A.APELLIDOS, AU.NIVEL, AU.GRADO, AU.SECCION
                FROM RESERVA R
                JOIN ALUMNO A ON R.ID_ALUMNO = A.ID_ALUMNO
                JOIN AULA AU ON R.ID_AULA = AU.ID_AULA
                ORDER BY R.ID_RESERVA DESC";

        echo json_encode($pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC));
    break;

    //eliminar matrícula
    case '5':
        $pdo->prepare("DELETE FROM RESERVA WHERE ID_RESERVA=?")
            ->execute([$_POST['id_reserva']]);

        echo json_encode(["exito"=>true,"mensaje"=>"Matrícula eliminada"]);
    break;
}