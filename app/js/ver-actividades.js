const actividades = [
    {
        inicio: "2025-04-10T10:00",
        termino: "2025-04-10T12:00",
        comuna: "Santiago",
        sector: "Centro",
        tema: "Música",
        nombreOrganizador: "Angelo",
        totalFotos: 5
    },
    {
        inicio: "2025-04-11T14:00",
        termino: "2025-04-11T16:00",
        comuna: "Viña del Mar",
        sector: "Reñaca",
        tema: "Deporte",
        nombreOrganizador: "Joaquin",
        totalFotos: 3
    },
    {
        inicio: "2025-04-12T18:00",
        termino: "2025-04-12T20:00",
        comuna: "Valparaíso",
        sector: "Playa Ancha",
        tema: "Ciencias",
        nombreOrganizador: "Nadia",
        totalFotos: 4
    },
    {
        inicio: "2025-04-13T09:00",
        termino: "2025-04-13T11:00",
        comuna: "Concepción",
        sector: "Lenga",
        tema: "Tecnología",
        nombreOrganizador: "Vicente",
        totalFotos: 6
    },
    {
        inicio: "2025-04-14T15:00",
        termino: "2025-04-14T17:00",
        comuna: "Talcahuano",
        sector: "Centro",
        tema: "Comida",
        nombreOrganizador: "Sebastian",
        totalFotos: 2
    }
];

document.addEventListener("DOMContentLoaded", function() {

    function crearFilasDeActividades() {
        const tbody = document.querySelector("#tablaActividades tbody");

        actividades.forEach(actividad => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${actividad.inicio}</td>
                <td>${actividad.termino}</td>
                <td>${actividad.comuna}</td>
                <td>${actividad.sector}</td>
                <td>${actividad.tema}</td>
                <td>${actividad.nombreOrganizador}</td>
                <td>${actividad.totalFotos}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    crearFilasDeActividades();

    let botonVolverIndex = document.getElementById("volverIndex");
    botonVolverIndex.addEventListener("click", function() {
        window.location.href = "../html/index.html";
    });
});
