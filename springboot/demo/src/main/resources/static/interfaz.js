document.addEventListener("DOMContentLoaded", async () => {
  const tabla = document.querySelector("#tabla-actividades tbody");

  try {
    const res = await fetch("http://localhost:8080/api/actividades");
    const actividades_todas = await res.json();
    const ahora = new Date();
    const actividades = actividades_todas.filter(act => {
        if (!act.diaHoraTermino) return false;
        return new Date(act.diaHoraTermino) < ahora;
    });


    for (const actividad of actividades) {
      const fila = document.createElement("tr");

      // Fecha de inicio
      const inicioRaw = actividad.diaHoraInicio;
      let inicio = "-";
      if (inicioRaw) {
        const fecha = new Date(inicioRaw);
        inicio = fecha.toLocaleDateString("es-CL");
      }

      // Temas como lista de strings
      let temas = "-";
      if (actividad.temas && Array.isArray(actividad.temas)) {
        temas = actividad.temas.map(t => t.tema).join(", ");
      }

      const notas = actividad.notas || [];
      const promedio = notas.length > 0
        ? (notas.reduce((suma, n) => suma + n.nota, 0) / notas.length).toFixed(1)
        : "-";
      fila.innerHTML = `
        <td>${actividad.id}</td>
        <td>${inicio}</td>
        <td>${actividad.sector || "-"}</td>
        <td>${actividad.nombre || "-"}</td>
        <td>${temas}</td>
        <td>${promedio}</td>
        <td>
          <a href="#" class="evaluar-link">Evaluar</a>
          <form class="nota-form" data-id="${actividad.id}" style="display:none; margin-top: 5px;">
            <input type="number" name="puntaje" min="1" max="7" step="1" required>
            <button type="submit">Enviar</button>
          </form>
        </td>
      `;

      tabla.appendChild(fila);

      const evaluarLink = fila.querySelector(".evaluar-link");
      const form = fila.querySelector(".nota-form");

      evaluarLink.addEventListener("click", e => {
        e.preventDefault();
        form.style.display = "inline";
        evaluarLink.style.display = "none";
      });

      form.addEventListener("submit", async e => {
        e.preventDefault();
        const id = form.dataset.id;
        const puntaje = form.puntaje.value;

        const resp = await fetch("http://localhost:8080/api/notas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ actividadId: id, puntaje })
        });

        if (resp.ok) {
          location.reload();
        } else {
          alert("Error al enviar la nota.");
        }
      });
    }
  } catch (error) {
    console.error("Error cargando actividades:", error);
  }
});
