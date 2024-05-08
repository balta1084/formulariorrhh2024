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
});
