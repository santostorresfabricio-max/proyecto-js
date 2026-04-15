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

        // CONFIRMAR PAGO
        case '1':

            // Validar que no esté ya pagado
            $stmt = $pdo->prepare("SELECT ESTADO_PAGO FROM RESERVA WHERE ID_RESERVA=?");
            $stmt->execute([$_POST['id_reserva']]);
            $estado = $stmt->fetchColumn();

            if ($estado === 'PAGADO') {
                echo json_encode([
                    "exito" => false,
                    "mensaje" => "Este pago ya fue registrado."
                ]);
                exit;
            }

            $stmt = $pdo->prepare("UPDATE RESERVA 
                                SET ESTADO_PAGO='PAGADO'
                                WHERE ID_RESERVA=?");

            $stmt->execute([$_POST['id_reserva']]);

            echo json_encode([
                "exito" => true,
                "mensaje" => "Pago confirmado correctamente."
            ]);
        break;

        // LISTAR PAGOS
        case '2':

            $sql = "SELECT R.ID_RESERVA, R.CODIGO_PAGO, R.FECHA_RESERVA, R.ESTADO_PAGO,
                    A.NOMBRES, A.APELLIDOS,
                    AU.NIVEL, AU.GRADO, AU.SECCION
                    
                    FROM RESERVA R
                    JOIN ALUMNO A ON R.ID_ALUMNO = A.ID_ALUMNO
                    JOIN AULA AU ON R.ID_AULA = AU.ID_AULA
                    ORDER BY R.ID_RESERVA DESC";

            $stmt = $pdo->prepare($sql);
            $stmt->execute();

            $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($datos);
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