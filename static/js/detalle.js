function abrirModal(src) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modalImg.src = src;
  modal.style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function cargarComentarios() {
  const actividadId = document.getElementById("actividad_id").value;
  fetch(`/api/comentarios/${actividadId}`)
    .then(r => r.json())
    .then(data => {
      const contenedor = document.getElementById("comentarios");
      contenedor.innerHTML = '<h4>Comentarios anteriores</h4>' +
        data.map(c => `<p><strong>${c.nombre}</strong> (${c.fecha}):<br>${c.texto}</p>`).join('');
    });
}

document.getElementById("form-comentario").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const texto = document.getElementById("texto").value.trim();
  const actividadId = document.getElementById("actividad_id").value;
  const erroresDiv = document.getElementById("errores");

  erroresDiv.innerText = "";

  if (nombre.length < 3 || nombre.length > 80) {
    erroresDiv.innerText = "El nombre debe tener entre 3 y 80 caracteres.";
    return;
  }
  if (texto.length < 5) {
    erroresDiv.innerText = "El comentario debe tener al menos 5 caracteres.";
    return;
  }

  fetch("/api/comentarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, texto, actividad_id: actividadId })
  })
  .then(r => {
    if (!r.ok) return r.json().then(d => { throw d; });
    return r.json();
  })
  .then(() => {
    document.getElementById("nombre").value = "";
    document.getElementById("texto").value = "";
    cargarComentarios();
  })
  .catch(err => {
    erroresDiv.innerText = err.errores ? err.errores.join(". ") : "Error al enviar";
  });
});

// Al cargar la página
window.addEventListener("DOMContentLoaded", cargarComentarios);
