document.addEventListener('DOMContentLoaded', () => {
    const mostrarCarrito = document.getElementById('mostrarCarrito');
    const carritoContenedor = document.getElementById('carritoContenedor');
    const carrito = document.getElementById('carrito');
    const botonCerrar = document.getElementById('botonCerrar');
    const totalDiv = document.getElementById('total')

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

    if(carritos == null){
        return
    }

    const contenido = document.getElementById('contenido')

    let acumulador = 0

    carritos.forEach(function (carrito){

        console.log(carrito.precio)

        const menuDiv = document.createElement('div');

        const img = document.createElement('img')
        img.src = carrito.imagen
        img.width = 100
        img.height = 100
        menuDiv.appendChild(img);

        const nombre = document.createElement('p');
        nombre.textContent = "Nombre: " + carrito.nombre;
        menuDiv.appendChild(nombre);
    
        const precio = document.createElement('p');
        precio.textContent = "Precio: $" + carrito.precio;
        menuDiv.appendChild(precio);

        acumulador += parseFloat(carrito.precio)
    
        contenido.appendChild(menuDiv);

    })

    const total = document.createElement('p')
    total.textContent = `Total: $${acumulador.toFixed(2)}`;
    totalDiv.appendChild(total);
    contenido.appendChild(totalDiv)
});
