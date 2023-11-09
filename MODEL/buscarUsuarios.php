<?php 
    include "conexion.php";

    $endpoint = $_POST["endpoint"];
    switch ($endpoint) {
        case "buscarPersonas":
            $query = "SELECT * FROM persona";

            $result = mysqli_query($conexion, $query);
            if(!$result){
                die("Hubo un error en la consulta". mysqli_error($conexion));
            }   
            while($row = mysqli_fetch_array($result)){
                echo "<tr>
                    <td>".$row["id"]."</td>
                    <td>".$row["nombre"]." ".$row["apellido"]."</td>
                    <td>".$row["telefono"]."</td>
                    <td>".$row["fechaNacimiento"]."</td>
                    <td>
                        <span><button class='btn btn-danger btnEliminar' 
                            data-id='".$row["id"]."'
                            data-nombre='".$row["nombre"]."'
                            data-apellido='".$row["apellido"]."'
                            data-telefono='".$row["telefono"]."'
                            data-fecha='".$row["fechaNacimiento"]."'
                        ><box-icon name='trash' ></box-icon></button></span>
                        <span><button class='btn btn-warning btnActualizar' 
                            data-id='".$row["id"]."'
                            data-nombre='".$row["nombre"]."'
                            data-apellido='".$row["apellido"]."'
                            data-telefono='".$row["telefono"]."'
                            data-fecha='".$row["fechaNacimiento"]."'
                        ><box-icon name='edit' ></box-icon></button></span>
                    </td>
                </tr>";
            }
            break;
        case "actualizar":
            $id = $_POST["id"];
            $nombre = $_POST["nombre"];
            $apellido = $_POST["apellido"];
            $telefono = $_POST["telefono"];
            $fecha = $_POST["fecha"];

            $query = "UPDATE persona SET nombre = '$nombre', apellido = '$apellido', telefono = '$telefono', fechaNacimiento = '$fecha'
            WHERE id = '$id'";

            $result = mysqli_query($conexion,$query) or die(mysqli_error($conexion));
            echo "Los datos de ".$nombre." han sido actualizados correctamente.";
            break;
        case "eliminar":
            $id = $_POST["id"];

            $query = "DELETE FROM persona WHERE id = '$id'";

            $result = mysqli_query($conexion,$query) or die(mysqli_error($conexion));
            echo "Los datos del usuario han sido eliminados correctamente.";
            break;
    }
?>