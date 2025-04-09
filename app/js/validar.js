function validarTema() {
    let temaSelect = document.getElementById("tema");
    if (temaSelect.value === "") {
        alert("Por favor, seleccione el tema de la actividad.");
        return false;
    }
    return true;
}

function validarSector() {
    let sector = document.getElementById("sector");
    if (sector.value.trim() !== "" && sector.value.trim().length === 0) {
        alert("Por favor, ingrese el nombre del lugar donde se realizará la actividad.");
        return false;
    }
    return true;
}

function validarRegion() {
    let regionSelect = document.getElementById("region");
    if (regionSelect.value === "") {
        alert("Por favor, seleccione la región.");
        return false;
    }
    return true;
}

function validarComuna() {
    let comunaSelect = document.getElementById("comuna");
    if (comunaSelect.value === "") {
        alert("Por favor, seleccione la comuna.");
        return false;
    }
    return true;
}

function validarNombreOrganizador() {
    let nombre = document.getElementById("nombre");
    if (nombre.value.trim() === "") {
        alert("Por favor, ingrese el nombre del organizador.");
        return false;
    }
    return true;
}

function validarEmailOrganizador() {
    let email = document.getElementById("email");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }
    return true;
}

function validarCelularOrganizador() {
    let celular = document.getElementById("celular");
    let celularRegex = /^\+\d{3}\.\d{8,}$/; // Ajustado según el patrón del HTML
    // Solo validar si se ha ingresado un número
    if (celular.value.trim() !== "" && !celularRegex.test(celular.value)) {
        alert("Por favor, ingrese un número de celular válido con el formato: +[código de país].[número de celular].");
        return false;
    }
    return true;
}

function validarDescripcionActividad() {
    let descripcion = document.getElementById("descripcion");
    if (descripcion.value.trim() !== "" && descripcion.value.trim().length === 0) {
        alert("Por favor, ingrese una descripción de la actividad.");
        return false;
    }
    return true;
}

function validarFotos() {
    let fotos = document.getElementById("fotosContainer").getElementsByTagName("input");
    if (fotos.length === 0) {
        alert("Por favor, suba al menos una foto de referencia.");
        return false;
    }
    return true;
}

function validarContacto() {
    let contactoSelect = document.getElementById("contacto");
    // No es necesario hacer validación si no se selecciona nada
    return true; // Ya no es necesario alertar si el usuario no ha elegido un contacto
}

function validarTermino() {
    let termino = document.getElementById("termino");
    // Solo validamos si se ha ingresado una fecha de término
    if (termino.value.trim() !== "" && new Date(termino.value) <= new Date(document.getElementById("inicio").value)) {
        alert("La hora de término debe ser posterior a la hora de inicio.");
        return false;
    }
    return true;
}

function validarFormularioActividad() {
    return (
        validarTema() &&
        validarSector() &&
        validarRegion() &&
        validarComuna() &&
        validarNombreOrganizador() &&
        validarEmailOrganizador() &&
        validarCelularOrganizador() &&
        validarDescripcionActividad() &&
        validarFotos() &&
        validarContacto() &&
        validarTermino()
    );
}

document.addEventListener("DOMContentLoaded", function () {
    let botonEnviar = document.getElementById("botonEnviarActividad");
    if (botonEnviar) {
        botonEnviar.addEventListener("click", function (event) {
            event.preventDefault();
            if (validarFormularioActividad()) {
                if (confirm("¿Desea registrar esta actividad?")) {
                    alert("La actividad ha sido registrada exitosamente. ¡Gracias!");
                    window.location.href = "../html/index.html";
                } else {
                    alert("Registro cancelado. Puede continuar completando el formulario.");
                }
            }
        });
    }

    let botonVolver = document.getElementById("volverIndex");
    if (botonVolver) {
        botonVolver.addEventListener("click", function () {
            window.location.href = "../html/index.html";
        });
    }
});
