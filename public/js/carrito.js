document.addEventListener('DOMContentLoaded', () => {
    const mostrarCarrito = document.getElementById('mostrarCarrito');
    const carritoContenedor = document.getElementById('carritoContenedor');
    const carrito = document.getElementById('carrito');
    const botonCerrar = document.getElementById('botonCerrar');

    mostrarCarrito.addEventListener('click', (e) => {
        e.preventDefault();

        if (carritoContenedor.classList.contains('invisible')) {
            carritoContenedor.classList.remove('invisible');
            carrito.classList.add('mostrar');
        } else {
            carritoContenedor.classList.add('invisible');
            carrito.classList.remove('mostrar');
        }
    });

    botonCerrar.addEventListener('click', (e) => {
        e.preventDefault();
        carritoContenedor.classList.add('invisible');
        carrito.classList.remove('mostrar');
    });

    let localStorageJson = localStorage.getItem('carrito')

    let carritos = JSON.parse(localStorageJson)

    const contenido = document.getElementById('contenido')

    let acumulador;

    carritos.forEach(function (carrito){

        const menuDiv = document.createElement('div');

        const img = document.createElement('img')
        img.src = carrito.imagen
        menuDiv.appendChild(img);

        const nombre = document.createElement('p');
        nombre.textContent = "Nombre: " + carrito.nombre;
        menuDiv.appendChild(nombre);
    
        const descripcion = document.createElement('p');
        descripcion.textContent = "Descripción: " + carrito.descripcion;
        menuDiv.appendChild(descripcion);
    
        const precio = document.createElement('p');
        precio.textContent = "Precio: $" + carrito.precio;
        menuDiv.appendChild(precio);
    
        const descuento = document.createElement('p');
        descuento.textContent = "Descuento: " + carrito.descuento + "%";
        menuDiv.appendChild(descuento);

        const precioDescuento = document.createElement('p')
        precioDescuento.textContent = `Subtotal: $${carrito.precio * (1 - parseFloat(carrito.descuento/100))}`

        menuDiv.appendChild(precioDescuento);

        acumulador += precioDescuento
    
        // Agregar el producto al div principal
        contenido.appendChild(menuDiv);

    })

});
