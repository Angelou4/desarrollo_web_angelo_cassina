
function validarFormularioActividad() {
    const inicio = document.getElementById("fecha_inicio").value;
    const termino = document.getElementById("fecha_termino").value;
    const temas = document.querySelector("select[name='temas']").selectedOptions;
    const glosa = document.querySelector("input[name='glosa_otro']");
    const fotos = document.getElementById("fotos");
    const correo = document.querySelector("input[name='correo']");
    const organizador = document.querySelector("input[name='organizador']");
    const sector = document.querySelector("input[name='sector']");
    const comuna = document.querySelector("select[name='comuna']");
    const region = document.querySelector("select[name='region']");
    const telefono = document.querySelector("input[name='telefono']");
    const metodos = document.querySelectorAll("select[name='metodo_nombre']");
    const identificadores = document.querySelectorAll("input[name='identificador']");

    if (!region.value || !comuna.value || !inicio || !correo.value || !organizador.value) {
        alert("Por favor, completa todos los campos obligatorios.");
        return false;
    }

    if (sector.value.length > 100) {
        alert("El sector no puede tener más de 100 caracteres.");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo.value)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return false;
    }

    if (telefono.value && !/^\+\d{1,3}\.\d{7,15}$/.test(telefono.value)) {
        alert("El teléfono debe tener el formato +569.12345678");
        return false;
    }

    if(termino){
        if (new Date(termino) <= new Date(inicio)) {
            alert("La hora de término debe ser posterior a la de inicio.");
            return false;
    
        }
    }

    const temaValues = Array.from(temas).map(t => t.value);
    if (!temaValues.length) {
        alert("Debes seleccionar al menos un tema.");
        return false;
    }
    if (temaValues.includes("otro") && (!glosa || glosa.value.trim().length < 3 || glosa.value.length > 15)) {
        alert("Si seleccionas 'otro' como tema, escribe una glosa válida (entre 3 y 15 caracteres).");
        return false;
    }

    if (!fotos.files.length) {
        alert("Debes subir al menos una foto.");
        return false;
    }
    if (fotos.files.length > 5) {
        alert("No puedes subir más de 5 fotos.");
        return false;
    }

    if (metodos.length > 5) {
        alert("Solo puedes ingresar hasta 5 métodos de contacto.");
        return false;
    }

    for (let i = 0; i < identificadores.length; i++) {
        const idVal = identificadores[i].value.trim();
        if (idVal.length < 4 || idVal.length > 50) {
            alert("Cada identificador debe tener entre 4 y 50 caracteres.");
            return false;
        }
    }

    return confirm("¿Está seguro que desea agregar esta actividad?");
}
