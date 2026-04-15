<?php

session_start();

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

            
            $hash = password_hash($_POST['password'], PASSWORD_DEFAULT);
            // ---------------------------------------------------------
            // CREAR ALUMNO
            $sql = "INSERT INTO ALUMNO (
                DNI_ALUMNO, NOMBRES, APELLIDOS, FECHA_NACIMIENTO, EDAD,
                GENERO, DIRECCION, CELULAR, CORREO, NOMBRE_APODERADO,
                CELULAR_APODERADOR, USERNAME, PASSWORD_HASH, ESTADO
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            $stmt = $pdo->prepare($sql);

            $stmt->execute([
                $_POST['dni'],
                $_POST['nombres'],
                $_POST['apellidos'],
                $_POST['fecha_nac'],
                $_POST['edad'],
                $_POST['genero'],
                $_POST['direccion'],
                $_POST['celular'],
                $_POST['correo'],
                $_POST['apoderado'],
                $_POST['cel_apoderado'],
                $_POST['username'],
                $hash,
                $_POST['estado'],

            ]);

            echo json_encode([
                "exito" => true,
                "mensaje" => "Alumno registrado correctamente."
            ]);

        break;
            
        case '2':
            
            if (!empty($_POST['password'])) {

                $hash = password_hash($_POST['password'], PASSWORD_DEFAULT);

                $sql = "UPDATE ALUMNO SET
                    DNI_ALUMNO=?, NOMBRES=?, APELLIDOS=?, FECHA_NACIMIENTO=?,
                    EDAD=?, GENERO=?, DIRECCION=?, CELULAR=?, CORREO=?,
                    NOMBRE_APODERADO=?, CELULAR_APODERADOR=?, USERNAME=?,
                    PASSWORD_HASH=?, ESTADO=? WHERE ID_ALUMNO=?";

                $params = [
                    $_POST['dni'],
                    $_POST['nombres'],
                    $_POST['apellidos'],
                    $_POST['fecha_nac'],
                    $_POST['edad'],
                    $_POST['genero'],
                    $_POST['direccion'],
                    $_POST['celular'],
                    $_POST['correo'],
                    $_POST['apoderado'],
                    $_POST['cel_apoderado'],
                    $_POST['username'],
                    $hash,
                    $_POST['estado'],
                    $_POST['id_alumno']
                ];

            } else {
                // Actualizar sin cambiar contraseña
                $sql = "UPDATE ALUMNO SET
                    DNI_ALUMNO=?, NOMBRES=?, APELLIDOS=?, FECHA_NACIMIENTO=?,
                    EDAD=?, GENERO=?, DIRECCION=?, CELULAR=?, CORREO=?,
                    NOMBRE_APODERADO=?, CELULAR_APODERADOR=?, USERNAME=?, ESTADO=?
                    WHERE ID_ALUMNO=?";

                $params = [
                    $_POST['dni'],
                    $_POST['nombres'],
                    $_POST['apellidos'],
                    $_POST['fecha_nac'],
                    $_POST['edad'],
                    $_POST['genero'],
                    $_POST['direccion'],
                    $_POST['celular'],
                    $_POST['correo'],
                    $_POST['apoderado'],
                    $_POST['cel_apoderado'],
                    $_POST['username'],
                    $_POST['estado'],
                    $_POST['id_alumno']
                ];
            }

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            echo json_encode([
                "exito" => true,
                "mensaje" => "Datos actualizados correctamente."
            ]);

        break;

        case '3':
            // ELIMINAR ALUMNO
            $sql = "DELETE FROM ALUMNO WHERE ID_ALUMNO = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$_POST['id_alumno']]);
            echo json_encode([
                "exito" => true,
                "mensaje" => "Registro eliminado."
            ]);

        break;

        case '4':
            // LISTAR ALUMNOS
            $sql = "SELECT ID_ALUMNO, NOMBRES, APELLIDOS, DNI_ALUMNO, FECHA_NACIMIENTO, CELULAR, CORREO, ESTADO
                    FROM ALUMNO
                    ORDER BY ID_ALUMNO DESC";

            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $alumnos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($alumnos);

        break;

        default:
            echo json_encode([
                "exito" => false,
                "mensaje" => "Opción no válida."
            ]);
    }

} catch (PDOException $e) {
    // Error de conexión o consulta a la BD
    echo json_encode([
        "exito" => false,
        "mensaje" => "Error BD: " . $e->getMessage()
    ]);
}
?>