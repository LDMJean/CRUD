<?php 
    $conexion = mysqli_connect("localhost", "root", "","prueba");
    if(!$conexion) {
        die("". mysqli_connect_error());
    }
?>