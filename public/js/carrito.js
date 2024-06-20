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

    console.log(carritos)

    if(carritos == null){
        return
    }

    // Se obtiene el div vacio del carrito para completarlo con la data guardada en el localstorage

    const contenido = document.getElementById('contenido')

    let acumulador = 0

    // Se recorre toda la data del localstorage para que vaya cargando los datos y sumando el total

    carritos.forEach(function (carrito){

        const menuDiv = document.createElement('div');
        menuDiv.classList.add('elementoCarrito');
        
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'x';
        menuDiv.appendChild(botonEliminar);

        botonEliminar.addEventListener('click', (e) => {

          const respuesta = confirm(`Desea eliminar ${carrito.nombre}`)

          if(respuesta){

            alert('Eliminado');

            menuDiv.remove();
            actualizarTotal();

          }else{

            return

          }

        })

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

          const unidades = document.createElement('div');

            const sumar = document.createElement('button');
            sumar.textContent = '+';
            unidades.appendChild(sumar);

            const restar = document.createElement('button');
            restar.textContent = '-';
            restar.disabled = true;
            unidades.appendChild(restar)

            let i = 1

            const unidad = document.createElement('h3');
            unidad.textContent = `${i} unidades`;
            unidades.appendChild(unidad);

            sumar.addEventListener('click', e=> {

              i++;
              unidad.textContent = `${i} unidades`;
              precio.textContent = `$${carrito.precio * i}`;

              actualizarTotal();

              if (i > 1) {
                restar.disabled = false;
            }

            })

            restar.addEventListener('click', e => {
              if (i > 1) {
                  i--;
                  unidad.textContent = `${i} unidades`;
                  precio.textContent = `$${carrito.precio * i}`;

                  actualizarTotal();

              }else if(i === 1){

                restar.disabled = true;

              }
          });

          menuDiv.appendChild(divElemento)
          menuDiv.appendChild(unidades)

        acumulador += parseFloat(carrito.precio * i)
    
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

// Funcion para actualizar el total cada vez que se agregan, restan unidades o se eliminan elementos del carrito

function actualizarTotal() {
  acumulador = 0;
  const elementosCarrito = document.querySelectorAll('.elementoCarrito');
  elementosCarrito.forEach(elemento => {
      const unidades = parseInt(elemento.querySelector('h3').textContent);
      const precioUnitario = parseFloat(elemento.querySelector('.nombrePrecio p:nth-child(2)').textContent.slice(1)) / unidades;
      acumulador += unidades * precioUnitario;
  });
  total.textContent = `Total: $${acumulador.toFixed(2)}`;
}