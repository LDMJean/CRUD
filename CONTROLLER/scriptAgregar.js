$(document).ready(function(){
    //capturamos el evento click del botón enviar
    $("#btnEnviar").click(e=>{
        //Hacemos que no se recargue la página tras persionar dicho boton
        e.preventDefault();
        //pasamos a la función que valide los campos del form
        validarForm();
    });
    function validarForm(){
        //Validarmos que los datos que se ingresen en los campos sean mayor a cierta longitud
        if($("#inputId").val().length < 6 || $("#inputNombre").val().length < 3 || $("#inputApellido").val().length < 4 || $("#inputTelefono").val().length < 9 || $("#inputFecha").val().length == 0){
            //Agregamos una alerta en el caso de que haya un error
            crearAlertas("Campos incompletos", "error", "Opps.. parece que no haz completado los campos del formulario de forma correcta.");
        }else{
            agregarDatos();
        }
    }
    function agregarDatos(){
        let formData = new FormData();

        formData.append("id", $("#inputId").val());
        formData.append("nombre", $("#inputNombre").val());
        formData.append("apellido", $("#inputApellido").val());
        formData.append("telefono", $("#inputTelefono").val());
        formData.append("fecha", $("#inputFecha").val());

        fetch("../MODEL/agregarPersona.php", {
            method: "POST",
            body: formData
        }).then(response => response.text())
        .then(response => {
            crearAlertas(response, "success", `Usuaruio ${$("#inputNombre").val()} registrado correctamente.`);
            vaciarCampos();
        }).catch(error => crearAlertas("Error", "error", error))
    }
    function vaciarCampos(){
        $("#inputId").val("");
        $("#inputNombre").val("");
        $("#inputApellido").val("");
        $("#inputTelefono").val("");
        $("#inputFecha").val("");
    }
    function crearAlertas(title, icon, text){
        Swal.fire({
            title,
            icon,
            text
        });
    }
})