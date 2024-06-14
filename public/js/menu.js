document.addEventListener('DOMContentLoaded', async (e)=> {

    //Definiendo elementos para crear las tarjetas

    const postres = document.getElementById('postres');
    const contenido_postres = document.getElementById('contenido_postres');

    const platosPrincipales = document.getElementById('platoPrincipal');
    const contenidoPlatosPrincipales = document.getElementById('contenido_platos_principales');

    let contador = 0

    const productos = await obtenerPoductos();

    if(productos){

        productos.forEach(producto => {
            
            //Definiendo el div contenedor de la tarjeta
            const carta = document.createElement('div');
            carta.classList.add('card');

                //Definiendo la imagen y atributos de la misma
                const imgProducto = document.createElement('img');
                imgProducto.id = `menu_${contador}`;
                imgProducto.src = producto.imagen;
                imgProducto.alt = `postre ${producto.nombre}`;

                //Definiento el cuerpo y clase de la tarjeta
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                    //Definiendo el contenedor del nombre
                    const nombre = document.createElement('h3');
                    nombre.id = `nombre_${contador}`;
                    nombre.classList.add('card-title');
                    nombre.textContent = producto.nombre;

                    //Definiendo el contenedor flex

                    const contFlex = document.createElement('div');
                    contFlex.classList.add('cont-flex')

                        //Definiento el contenedor de la descripcion

                        const contCardDescription = document.createElement('div');
                        contCardDescription.classList.add('cont-card-description');

                            //Definiendo el contenedor la descripion del producto

                            const descriptionFood = document.createElement('div');
                            descriptionFood.classList.add('description-food');

                                //Definiento la descripcion

                                const descripcion = document.createElement('div');
                                const spanDescripcion = document.createElement('span');
                                spanDescripcion.textContent = producto.descripcion;

                                // Definiento el precio

                                const precio = document.createElement('div');
                                const spanPrecio = document.createElement('span');
                                spanPrecio.id = `precio_${contador}`
                                spanPrecio.textContent = `$${producto.precio}`;

                    //Boton para agregar al carrito

                    const boton = document.createElement('button');
                    boton.id = `boton_${contador}`;
                    boton.classList.add('price');
                    boton.classList.add('buttonPrice');
                    boton.textContent = 'Agregar al carrito'

            //Anidando elementos creados

            cardBody.appendChild(nombre);
            cardBody.appendChild(contFlex);
            cardBody.appendChild(boton)

            descripcion.appendChild(spanDescripcion);
            precio.appendChild(spanPrecio);

            descriptionFood.appendChild(descripcion);
            descriptionFood.appendChild(precio)
            contCardDescription.appendChild(descriptionFood);
            contFlex.appendChild(contCardDescription);

            carta.appendChild(imgProducto);
            carta.appendChild(cardBody)

            if(producto.tipo === 'Postre'){

                contenido_postres.appendChild(carta);
                postres.appendChild(contenido_postres);

            }else{

                contenidoPlatosPrincipales.appendChild(carta);
                platosPrincipales.appendChild(contenidoPlatosPrincipales)

            }

            contador ++;
        });

    }

    // Se recorren todos los elementos de los platos el menu para guardarlos en el localstorage cuando se presiona click en "pedilo ya"

    for(i = 0 ; i<10 ; i++){

        const boton = document.getElementById(`boton${i}`);
        const imagen = document.getElementById(`menu${i}`).src;
        const nombre = document.getElementById(`nombre${i}`).textContent;
        const precio = convertirPrecio(`precio${i}`)

        boton.addEventListener('click', (e)=>{
            alert()

            agregarComida(imagen, nombre, precio)
    
        })

    }

    console.log(localStorage.getItem('carrito'))
})

async function obtenerPoductos(){

    try{

        const response = await fetch('/productos', {

            method: 'GET',
            headers:{

                'Content-Type': 'application/json'

            }

        })

        if(response.ok){

            const respuesta = await response.json()

            return respuesta.productos

        }

    }catch(error){

        return console.error('Errro: ', error)

    }

}

function agregarComida(imagen, nombre, precio){


    let storageString = localStorage.getItem('carrito');

    let carrito = storageString ? JSON.parse(storageString) : [];

    let objeto = {

        imagen: imagen,
        nombre: nombre,
        precio: precio,

    }

    carrito.push(objeto)

    let jsonCarrito = JSON.stringify(carrito)

    localStorage.setItem('carrito', jsonCarrito)

    alert(`Agregaste ${nombre} correctamente`)

    location.reload()

}

// Funcion para convertir el precio en un formato apto para tabajarlo

function convertirPrecio(id) {
    const precio = document.getElementById(id).textContent.trim();
    let precioConvertido = '';

    for(let i = 0; i < precio.length; i++) {
        let letra = precio[i];

        if(letra !== '.' && letra !== '$') {
            precioConvertido += letra;
        }
    }

  return precioConvertido;
}