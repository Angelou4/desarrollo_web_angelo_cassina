document.addEventListener("DOMContentLoaded", function() {
    const productoSeleccionado = JSON.parse(sessionStorage.getItem("productoSeleccionado"));

    if (productoSeleccionado) {
        mostrarInformacionProducto(productoSeleccionado);
    } 

    function mostrarInformacionProducto(producto) {
        const imagenProducto = document.getElementById("imagenProducto");
        const tipoProducto = document.getElementById("tipoProducto");
        const nombreProducto = document.getElementById("nombreProducto");
        const regionProducto = document.getElementById("regionProducto");
        const comunaProducto = document.getElementById("comunaProducto");

        imagenProducto.src = producto.imagen1;
        tipoProducto.textContent = producto.tipo;
        nombreProducto.textContent = producto.producto;
        regionProducto.textContent = producto.region;
        comunaProducto.textContent = producto.comuna;

        imagenProducto.addEventListener("click", function() {
            imagenProducto.src = producto.imagen2;
        });

    }

    const botonVolverAtras = document.getElementById("volverAtras");
    botonVolverAtras.addEventListener("click", function() {
        window.history.back();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const pedidoSeleccionado = JSON.parse(sessionStorage.getItem("pedidoSeleccionado"));

    if (pedidoSeleccionado) {
        mostrarInformacionPedido(pedidoSeleccionado);
    } 

    function mostrarInformacionPedido(pedido) {
        const tipoPedido = document.getElementById("tipoPedido");
        const nombrePedido = document.getElementById("nombrePedido");
        const regionPedido = document.getElementById("regionPedido");
        const comunaPedido = document.getElementById("comunaPedido");
        const compradorPedido = document.getElementById("compradorPedido");

        tipoPedido.textContent = pedido.tipo;
        nombrePedido.textContent = pedido.producto;
        regionPedido.textContent = pedido.region;
        comunaPedido.textContent = pedido.comuna;
        compradorPedido.textContent = pedido.comprador;
    }

    const botonVolverAtras = document.getElementById("volverAtras");
    botonVolverAtras.addEventListener("click", function() {
        window.history.back();
    });
});
