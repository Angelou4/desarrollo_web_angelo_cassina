
document.addEventListener("DOMContentLoaded", function () {
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");

    regionSelect.addEventListener("change", function () {
        const regionId = this.value;

        fetch(`/get_comunas/${regionId}`)
            .then(response => response.json())
            .then(data => {
                comunaSelect.innerHTML = "";
                data.forEach(comuna => {
                    const option = document.createElement("option");
                    option.value = comuna.id;
                    option.textContent = comuna.nombre;
                    comunaSelect.appendChild(option);
                });
            });
    });

    // Cargar automáticamente las comunas al cargar la página si hay una región seleccionada
    if (regionSelect.value) {
        regionSelect.dispatchEvent(new Event("change"));
    }
});
