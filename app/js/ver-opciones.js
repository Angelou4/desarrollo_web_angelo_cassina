const productos = [
    {
        tipo: "Fruta",
        producto: "Manzana",
        region: "Región Metropolitana",
        comuna: "Santiago",
        imagen: "../manzana120.jpg",
        imagen1: "../manzana640.jpg",
        imagen2: "../manzana1280.jpg"
    },
    {
        tipo: "Verdura",
        producto: "Lechuga",
        region: "Región de Valparaíso",
        comuna: "Viña del Mar",
        imagen: "../lechuga120.jpg",
        imagen1: "../lechuga640.jpg",
        imagen2: "../lechuga1280.jpg"
    },
    {
        tipo: "Fruta",
        producto: "Platano",
        region: "Región Metropolitana",
        comuna: "Providencia",
        imagen: "../platano120.jpg",
        imagen1: "../platano640.jpg",
        imagen2: "../platano1280.jpg"
    },
    {
        tipo: "Fruta",
        producto: "Mango",
        region: "Región del Biobío",
        comuna: "Concepción",
        imagen: "../mango120.jpg",
        imagen1: "../mango640.jpg",
        imagen2: "../mango1280.jpg"
    },
    {
        tipo: "Verdura",
        producto: "Apio",
        region: "Región del Biobío",
        comuna: "Talcahuano",
        imagen: "../apio120.jpg",
        imagen1: "../apio640.jpg",
        imagen2: "../apio1280.jpg"
    }
    ]
const pedidos = [
    {
        tipo: "Fruta",
        producto: "Manzana",
        region: "Región Metropolitana",
        comuna: "Santiago",
        comprador: "Angelo"
    },
    {
        tipo: "Verdura",
        producto: "Lechuga",
        region: "Región de Valparaíso",
        comuna: "Viña del Mar",
        comprador: "Joaquin"
    },
    {
        tipo: "Fruta",
        producto: "Platano",
        region: "Región Metropolitana",
        comuna: "Providencia",
        comprador: "Vicente"
    },
    {
        tipo: "Fruta",
        producto: "Mango",
        region: "Región del Biobío",
        comuna: "Concepción",
        comprador: "Javier"
    },
    {
        tipo: "Verdura",
        producto: "Apio",
        region: "Región del Biobío",
        comuna: "Talcahuano",
        comprador: "Stephani"
    }
    ]
document.addEventListener("DOMContentLoaded", function() {

    function crearFilasDeProductos() {
        const tbody = document.querySelector("#tablaProductos tbody");

        productos.forEach(producto => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${producto.tipo}</td>
                <td>${producto.producto}</td>
                <td>${producto.region}</td>
                <td>${producto.comuna}</td>
                <td><img src="${producto.imagen}" alt="${producto.producto}" width="100"></td>
            `;
            tbody.appendChild(tr);
            tr.addEventListener("click", function() {
                sessionStorage.setItem("productoSeleccionado", JSON.stringify(producto));
                window.location.href = "informacion-producto.html";
            });
        });
    }
    crearFilasDeProductos();
});

document.addEventListener("DOMContentLoaded", function() {

    function crearFilasDePedidos() {
        const tbody = document.querySelector("#tablaPedidos tbody");

        pedidos.forEach(pedido => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${pedido.tipo}</td>
                <td>${pedido.producto}</td>
                <td>${pedido.region}</td>
                <td>${pedido.comuna}</td>
                <td>${pedido.comprador}</td>
            `;
            tbody.appendChild(tr);
            tr.addEventListener("click", function() {
                sessionStorage.setItem("pedidoSeleccionado", JSON.stringify(pedido));
                window.location.href = "informacion-pedido.html";
            });
        });
    }

    crearFilasDePedidos();
});

document.addEventListener("DOMContentLoaded", function() {
    let botonVolverIndex = document.getElementById("volverIndex");
    botonVolverIndex.addEventListener("click", function() {
        window.location.href = "../html/index.html";
    });
});