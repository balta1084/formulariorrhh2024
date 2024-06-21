document.addEventListener('DOMContentLoaded', async e=> {

    // Obteniendo el ID desde la ruta de la url
    const url = window.location.pathname;
    const url_separada = url.split("/");
    const id = url_separada[url_separada.length - 1]

    // Identificando los elementos a completar

    const imagen = document.getElementById('imagen');
    const nombre = document.getElementById('nombre');
    const descripcion = document.getElementById('descripcion');
    const tipo = document.getElementById('tipo');
    const precio = document.getElementById('precio');
    const actualizar = document.getElementById('botonActualizar');

    // Haciendo la llamada a la api para obtener informacion de un producto

    try{

        const response = await fetch(`/productos/${id}`, {

            method: 'GET',
            headers: {

                'Content-Type': 'application/json'

            },

        });

        if(response.ok){

            const respuesta = await response.json();

            const producto = respuesta.producto

            nombre.value = producto.nombre;
            descripcion.value = producto.descripcion;
            tipo.value = producto.tipo;
            precio.value = producto.precio;

        }

    }catch(error){

        return console.error('Error: ', error)

    }

    // Creando el evento para actualizar la informacion.

    actualizar.addEventListener('click', async e=>{

        const datos = {

            id: id,
            imagen: imagen.value,
            nombre: nombre.value,
            descripcion: descripcion.value,
            tipo: tipo.value,
            precio: precio.value,

        };

        try{

            const response = await fetch(`/productos/${id}`, {

                method: 'PUT',
                headers: {
                
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(datos)


            });

            if(response.ok){

                const respuesta = await response.json();

                alert(respuesta.message);

                return location.href = respuesta.href;

            }


        }catch(error){

            return console.error('Error: ', error)

        }

    })




})