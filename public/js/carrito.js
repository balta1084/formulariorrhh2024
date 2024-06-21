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
        menuDiv.classList.add('elementoCarrito');
        
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'x';
        menuDiv.appendChild(botonEliminar);

        botonEliminar.addEventListener('click', (e) => {

          const respuesta = confirm(`Desea eliminar ${carrito.nombre}`)

          if(respuesta){

            alert('Eliminado');

            menuDiv.remove();

            let storageString = localStorage.getItem('carrito');
            let carritoStorage = JSON.parse(storageString);
            let carritoNuevo = []

            carritoStorage.forEach(elemento => {

              if(elemento.id !== carrito.id){

                carritoNuevo.push(elemento)

              }

              })

            let jsonCarrito = JSON.stringify(carritoNuevo);

            localStorage.setItem('carrito', jsonCarrito);

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
            if(carrito.cantidad === 1){

              restar.disabled = true;

            }
            unidades.appendChild(restar)

            const unidad = document.createElement('h3');
            unidad.textContent = `${carrito.cantidad} unidades`;
            unidades.appendChild(unidad);

            sumar.addEventListener('click', e=> {

              carrito.cantidad++;
              unidad.textContent = `${carrito.cantidad} unidades`;
              precio.textContent = `$${carrito.precio * carrito.cantidad}`;

              let storageString = localStorage.getItem('carrito');
              let carritoStorage = JSON.parse(storageString);

              carritoStorage.forEach(elemento => {

                if(elemento.id === carrito.id){

                  elemento.cantidad = carrito.cantidad;

                  let jsonCarrito = JSON.stringify(carritoStorage);

                  localStorage.setItem('carrito', jsonCarrito);

                }

              })

              actualizarTotal();

              if (carrito.cantidad > 1) {
                restar.disabled = false;
            }

            })

            restar.addEventListener('click', e => {
              if (carrito.cantidad > 1) {
                  carrito.cantidad--;
                  unidad.textContent = `${carrito.cantidad} unidades`;
                  precio.textContent = `$${carrito.precio * carrito.cantidad}`;

                  let storageString = localStorage.getItem('carrito');
                  let carritoStorage = JSON.parse(storageString);
    
                  carritoStorage.forEach(elemento => {
    
                    if(elemento.id === carrito.id){
    
                      elemento.cantidad = carrito.cantidad;
    
                      let jsonCarrito = JSON.stringify(carritoStorage);
    
                      localStorage.setItem('carrito', jsonCarrito);

                    }
    
                    })

                    actualizarTotal();
              

              }else if(carrito.cantidad === 1){

                restar.disabled = true;

              }
          });

          menuDiv.appendChild(divElemento)
          menuDiv.appendChild(unidades)

        acumulador += parseFloat(carrito.precio * carrito.cantidad)
    
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

      confirmarPedido.addEventListener('click', async e=>{

        let storageString = localStorage.getItem('carrito');

        let carrito = JSON.parse(storageString);

        try{

          const response = await fetch('/pedidos', {

            method: 'POST',
            headers: {

              'Content-Type': 'application/json'

            },

            body: JSON.stringify(carrito)

          });

          if(response.ok){

            const respuesta = await response.json();

            alert(respuesta.message);

            localStorage.removeItem('carrito');
    
            return location.reload();

          }else{

            const respuesta = await response.json();

            alert(respuesta.message);

            return window.location.href = respuesta.href;

          }


        }catch(error){

          return console.error('Error al procesar consulta: ', error);

        };


      });

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