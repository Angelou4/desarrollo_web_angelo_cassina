// Mover la función mostrarContacto fuera de DOMContentLoaded para que esté disponible globalmente
function mostrarContacto() {
    const select = document.getElementById("contacto");
    const input = document.getElementById("contactoInfoContainer");
    input.style.display = select.value ? "block" : "none";
}

// Mover la función mostrarOtroTema fuera de DOMContentLoaded para que esté disponible globalmente
function mostrarOtroTema() {
    const select = document.getElementById("tema");
    const input = document.getElementById("otroTemaContainer");
    input.style.display = select.value === "otro" ? "block" : "none";
}

function agregarFoto() {
    let fotosContainer = document.getElementById("fotosContainer");
    let totalInputs = fotosContainer.querySelectorAll("input[type='file']").length;

    if (totalInputs >= 5) {
        alert("Solo se pueden agregar hasta 5 fotos.");
        return;
    }

    let nuevoInput = document.createElement("input");
    nuevoInput.type = "file";
    nuevoInput.name = "foto";
    nuevoInput.accept = "image/*";
    fotosContainer.appendChild(nuevoInput);
}

document.addEventListener("DOMContentLoaded", function () {
    // Establecer la fecha y hora actual como valor predeterminado para el campo de inicio
    const now = new Date();
    const iso = now.toISOString().slice(0,16);
    document.getElementById("inicio").value = iso;

    // Establecer la fecha y hora tres horas después de la actual como valor predeterminado para el campo de término
    const fin = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    const finIso = fin.toISOString().slice(0,16);
    document.getElementById("termino").value = finIso;

    // Botón principal "Agregar esta actividad"
    const botonEnviar = document.getElementById("botonEnviarActividad");
    if (botonEnviar) {
        botonEnviar.addEventListener("click", function (event) {
            event.preventDefault(); // Evita que se envíe automáticamente
            confirmarActividad();   // Llama a la función que valida y muestra el mensaje
        });
    }

    // Función que valida y muestra mensaje de confirmación si todo está ok
    window.confirmarActividad = function () {
        if (validarFormularioActividad()) {
            document.getElementById("formularioProducto").style.display = "none";
            document.getElementById("mensajeConfirmacion").style.display = "block";
        }
    };

    // Si el usuario confirma
    window.enviarFormulario = function () {
        document.getElementById("mensajeConfirmacion").style.display = "none";
        document.getElementById("mensajeFinal").style.display = "block";
        // Aquí puedes agregar lógica para enviar el formulario si es necesario
        // Por ejemplo:
        // document.getElementById("formularioActividad").submit();
    };

    // Si el usuario cancela
    window.cancelarEnvio = function () {
        document.getElementById("mensajeConfirmacion").style.display = "none";
        document.getElementById("formularioProducto").style.display = "block";
    };
});
