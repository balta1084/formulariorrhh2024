document.addEventListener('DOMContentLoaded', () => {

    // Se detectan los elementos del DOM

    const mostrarCarrito = document.getElementById('mostrarCarrito');
    const carritoContenedor = document.getElementById('carritoContenedor');
    const carrito = document.getElementById('carrito');
    const botonCerrar = document.getElementById('botonCerrar');
    const totalDiv = document.getElementById('total');

    // Evento de click para mostrar el carrito con animacion

    mostrarCarrito.addEventListener('click', (e) => {
        e.preventDefault();

        if (carrito.classList.contains('mostrar')) {
            carrito.classList.remove('mostrar');
            setTimeout(() => {
              carritoContenedor.classList.add('invisible');
            }, 300);
          } else {
            carritoContenedor.classList.remove('invisible');
            setTimeout(() => {
              carrito.classList.add('mostrar');
            }, 10);
          }
    });

    // Evento de click para ocultar el carrito sin animacion

    botonCerrar.addEventListener('click', (e) => {
        e.preventDefault();
        carritoContenedor.classList.add('invisible');
        carrito.classList.remove('mostrar');
    });

    // Se obtiene la info del localstorage, si no hay info retorna

    let localStorageJson = localStorage.getItem('carrito')

    let carritos = JSON.parse(localStorageJson)

    if(carritos == null){
        return
    }

    // Se obtiene el div vacio del carrito para completarlo con la data guardada en el localstorage

    const contenido = document.getElementById('contenido')

    let acumulador = 0

    // Se recorre toda la data del localstorage para que vaya cargando los datos y sumando el total

    carritos.forEach(function (carrito){

        const menuDiv = document.createElement('div');
        menuDiv.classList.add('elementoCarrito')

        const img = document.createElement('img')
        img.src = carrito.imagen
        img.width = 100
        img.height = 100
        menuDiv.appendChild(img);

        const divElemento = document.createElement('div')
        divElemento.classList.add('nombrePrecio')

        const nombre = document.createElement('p');
        nombre.textContent = carrito.nombre;
        divElemento.appendChild(nombre);
    
        const precio = document.createElement('p');
        precio.textContent = "$" + carrito.precio;
        divElemento.appendChild(precio);

        menuDiv.appendChild(divElemento)

        acumulador += parseFloat(carrito.precio)
    
        contenido.appendChild(menuDiv);

    })

    const total = document.createElement('p')
    total.textContent = `Total: $${acumulador.toFixed(2)}`;
    totalDiv.appendChild(total);
    contenido.appendChild(totalDiv)

    const divConfirmar = document.createElement('div')
    divConfirmar.classList.add('centrarBoton')

    const confirmar = document.createElement('button')
    confirmar.textContent = 'Pedir'
    confirmar.classList.add('boton')
    confirmar.id = 'confirmarPedido'

    divConfirmar.appendChild(confirmar)
    contenido.appendChild(divConfirmar)

    const confirmarPedido = document.getElementById('confirmarPedido')

    if(confirmarPedido){

      confirmarPedido.addEventListener('click', e=>{

        alert('Tu pedido está en camino')

        localStorage.removeItem('carrito')

        return location.reload();

      })

    }
});
