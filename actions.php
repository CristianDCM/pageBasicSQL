<?php
include 'db.php';

$action = $_GET['action'];

if ($action == 'read') {
    $sql = "SELECT * FROM clientes";
    $result = $conn->query($sql);
    $clientes = array();
    while ($row = $result->fetch_assoc()) {
        $clientes[] = $row;
    }
    echo json_encode($clientes);
} elseif ($action == 'create') {
    $data = json_decode(file_get_contents("php://input"), true);
    $nombre = $data['nombre'];
    $direccion = $data['direccion'];
    $telefono = $data['telefono'];
    $email = $data['email'];
    $sql = "INSERT INTO clientes (nombre, direccion, telefono, email) VALUES ('$nombre', '$direccion', '$telefono', '$email')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false));
    }
} elseif ($action == 'delete') {
    $cliente_id = $_GET['cliente_id'];
    $sql = "DELETE FROM clientes WHERE cliente_id = $cliente_id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false));
    }
}

$conn->close();
?>
