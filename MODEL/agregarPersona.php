<?php 
    include "conexion.php";

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $telefono = $_POST["telefono"];
    $fecha = $_POST["fecha"];

    $query = "INSERT INTO persona (id, nombre, apellido, telefono, fechaNacimiento) VALUES
    ('$id', '$nombre', '$apellido', '$telefono', '$fecha')";

    $result = mysqli_query($conexion,$query) or die(mysqli_error($conexion));
    echo "Persona registrada correctamente"
?>