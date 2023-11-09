$(document).ready(function(){
    buscarPersonas();
    //Busca a todos los usuariuos que se encuentren en la tabla persona
    function buscarPersonas(){
        let formData = new FormData();

        formData.append("endpoint", "buscarPersonas");
        fetch("../MODEL/buscarUsuarios.php", {
            method: "POST",
            body: formData
        }).then(response => response.text())
        .then(response => {
            $("#cuerpoTablaPersonas").html(response);
            //CAPTURAR EVENTO EN EL BOTON DE ELIMINAR EN CUALQUIER FILA DE LA TABLA
            $(".btnEliminar").click(function(){
                let id = $(this).data('id');
                eliminar(id);
            });
            //CAPTURAR EVENTO EN EL BOTON DE ACTUALIZAR EN CUALQUIER FILA DE LA TABLA
            $(".btnActualizar").click(function(){
                $("#divFormulario").removeClass("hidden");
                //Extraemos los datos del boton y se los asignamos a los campos del formulario
                let id = $(this).data('id');
                let nombre = $(this).data('nombre');
                let apellido = $(this).data('apellido');
                let telefono = $(this).data('telefono');
                let fechaNacimiento = $(this).data('fecha');

                $("#inputId").val(id);
                $("#inputNombre").val(nombre);
                $("#inputApellido").val(apellido);
                $("#inputTelefono").val(telefono);
                $("#inputFecha").val(fechaNacimiento);
            });
            
        });
    }
    //Una vez hacemos click en guardar validamos los datos como el formulario pasado
    $("#btnGuardar").click(function(){
        validarForm();
    });
    function validarForm(){
        //Validarmos que los datos que se ingresen en los campos sean mayor a cierta longitud
        if($("#inputId").val().length < 6 || $("#inputNombre").val().length < 3 || $("#inputApellido").val().length < 4 || $("#inputTelefono").val().length < 9 || $("#inputFecha").val().length == 0){
            //Agregamos una alerta en el caso de que haya un error
            crearAlertas("Campos incompletos", "error", "Opps.. parece que no haz completado los campos del formulario de forma correcta.");
        }else{
            recibirDatos();
        }
    }
    //Recibimos los datos de los inputs y se los asignamos al formData para que en este caso haga el update
    function recibirDatos(){
        let formData = new FormData();
        formData.append("endpoint", "actualizar");
        formData.append("id", $("#inputId").val());
        formData.append("nombre", $("#inputNombre").val());
        formData.append("apellido", $("#inputApellido").val());
        formData.append("telefono", $("#inputTelefono").val());
        formData.append("fecha", $("#inputFecha").val());

        fetch("../MODEL/buscarUsuarios.php", {
            method: "POST",
            body: formData
        }).then(response => response.text())
        .then(response => {
            crearAlertas("Exito!", "success", response);
            $("#divFormulario").addClass("hidden");
            vaciarCampos();
            buscarPersonas();
        }).catch(error => crearAlertas("Error", "error", error))
    }
    //Recibimos el id que se encuentra en el boton, buscamos a ese usuario y procedemos a eliminarlo
    function eliminar(id){
        let formData = new FormData();
        formData.append("endpoint", "eliminar");
        formData.append("id", id);

        fetch("../MODEL/buscarUsuarios.php", {
            method: "POST",
            body: formData
        }).then(response => response.text())
        .then(response => {
            crearAlertas("Usuario eliminado", "success", response);
            buscarPersonas();
        })
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