function validarTipoProducto() {
    let tipoProductoSelect = document.getElementById("tipoProducto");
    if (tipoProductoSelect.value === "") {
        alert("Por favor, seleccione el tipo de producto.");
        return false;
    }
    return true;
}

function validarProducto() {
    let productoSelect = document.getElementById("producto");
    if (productoSelect.value === "") {
        alert("Por favor, seleccione al menos un producto.");
        return false;
    }
    return true;
}

function validarDescripcion() {
    let descripcionInput = document.getElementById("descripcion");
    if (descripcionInput.value.trim() === "") {
        alert("Por favor, ingrese una descripción.");
        return false;
    }
    return true;
}

function validarFotos() {
    let fotosInput = document.getElementById("fotos");
    if (fotosInput.files.length === 0) {
        alert("Por favor, seleccione al menos una foto.");
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

function validarNombreProductor() {
    let nombreProductorInput = document.getElementById("nombreProductor");
    if (nombreProductorInput.value.trim() === "") {
        alert("Por favor, ingrese el nombre del productor.");
        return false;
    }
    return true;
}

function validarEmailProductor() {
    let emailProductorInput = document.getElementById("emailProductor");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailProductorInput.value)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }
    return true;
}

function validarCelularProductor() {
    let celularProductorInput = document.getElementById("celularProductor");
    let celularRegex = /^[0-9]{9,15}$/;
    if (celularProductorInput.value !== "" && !celularRegex.test(celularProductorInput.value)) {
        alert("Por favor, ingrese un número de celular válido (entre 9 y 15 dígitos).");
        return false;
    }
    return true;
}

function validarNombreComprador() {
    let nombreCompradorInput = document.getElementById("nombreComprador");
    if (nombreCompradorInput.value.trim() === "") {
        alert("Por favor, ingrese el nombre del Comprador.");
        return false;
    }
    return true;
}

function validarEmailComprador() {
    let emailCompradorInput = document.getElementById("emailComprador");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailCompradorInput.value)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }
    return true;
}

function validarCelularComprador() {
    let celularCompradorInput = document.getElementById("celularComprador");
    let celularRegex = /^[0-9]{9,15}$/;
    if (celularCompradorInput.value !== "" && !celularRegex.test(celularCompradorInput.value)) {
        alert("Por favor, ingrese un número de celular válido (entre 9 y 15 dígitos).");
        return false;
    }
    return true;
}

function validarFormularioProducto() {
    return (
        validarTipoProducto() &&
        validarProducto() &&
        validarDescripcion() &&
        validarFotos() &&
        validarRegion() &&
        validarComuna() &&
        validarNombreProductor() &&
        validarEmailProductor() &&
        validarCelularProductor()
    );
}

function validarFormularioPedido() {
    return (
        validarTipoProducto() &&
        validarProducto() &&
        validarDescripcion() &&
        validarFotos() &&
        validarRegion() &&
        validarComuna() &&
        validarNombreComprador() &&
        validarEmailComprador() &&
        validarCelularComprador()
    );
}

document.addEventListener("DOMContentLoaded", function() {
    let botonEnviarFormularioProducto = document.getElementById("botonEnviarFormularioProducto");
    botonEnviarFormularioProducto.addEventListener("click", function(event) {
        event.preventDefault();
        if (validarFormularioProducto()) {
           
            if (confirm("¿Confirma el registro de este producto?")) {
                
                alert("Hemos recibido el registro de producto. Muchas gracias.");
                window.location.href = "../html/index.html";
            } else {
                alert("No se ha registrado el producto. Puede seguir completando el formulario.");
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {

    let botonEnviarFormularioPedido = document.getElementById("botonEnviarFormularioPedido");
    botonEnviarFormularioPedido.addEventListener("click", function(event) {
        event.preventDefault();
        if (validarFormularioPedido()) {
            if (confirm("¿Confirma el registro de este producto?")) {
                alert("Hemos recibido el registro de producto. Muchas gracias.");
                window.location.href = "../html/index.html";
            } else {
                alert("No se ha registrado el producto. Puede seguir completando el formulario.");
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    let botonVolverIndex = document.getElementById("volverIndex");
    botonVolverIndex.addEventListener("click", function() {
        window.location.href = "../html/index.html";
    });
});