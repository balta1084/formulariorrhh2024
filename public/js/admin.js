document.addEventListener('DOMContentLoaded', async e => {

    // Buscando Elementos del HTML

    const buscar = document.getElementById('botonBuscar');
    const agregarPublis = document.getElementById('botonAgregar');
    const seccionBuscar = document.getElementById('menuBuscar');
    const seccionAgregar = document.getElementById('menuAgregar');

    // Dandole la funcionalidad a los botones para buscar o agregar

    buscar.addEventListener('click', async e=> {

        seccionBuscar.classList.remove('invisible');

        if(!seccionAgregar.classList.contains('invisible')){

            seccionAgregar.classList.add('invisible')

        }

        try{

            // Fetch para busqueda
    
            const response = await fetch ('/productos', {
    
                method: 'GET',
                headers: {
    
                    'Content-Type': 'application/json'
    
                }
    
    
            })
    
            if(response.ok){
    
                const respuesta = await response.json()
    
                mostrarTabla(respuesta.productos)
    
            }
    
        }catch(error){
    
            return console.error('Error: ', error)
    
        }

    })

    agregarPublis.addEventListener('click',async e=>{

        e.preventDefault()

        seccionAgregar.classList.remove('invisible');

        if(!seccionBuscar.classList.contains('invisible')){

            seccionBuscar.classList.add('invisible')

        }

        const guardar = document.getElementById('botonGuardar');

        guardar.addEventListener('click', async e=> {

            try{

                e.preventDefault()

                const form = document.getElementById('formGuardar');
    
                const formData = new FormData(form)
    
                const response = await fetch('/producto', {
    
                    method: 'POST',
                    body: formData
    
                });
    
                if(response.ok){
    
                    const respuesta = await response.json()
                    
                    alert(respuesta.message);

                    window.location.href = respuesta.href
    
                }
    
    
    
            }catch(error){
    
                return console.error('Error: ', error)
    
            }


        })


    })



})

function mostrarTabla(productos){

    const divTabla = document.getElementById('tabla');

        // Se genera el elemento tabla
    
        const tabla = document.createElement('table');

            // Se generan los encabezados
        
            const thead = document.createElement('thead');
            const encabezados = ['ID','Imagen', 'Nombre', 'Descripcion', 'Precio','Categoria','Estado' ,'Acciones'];
        
            const encabezadosRow = document.createElement('tr');
        
            // Se recorren los encabezados y se van insertando al elemento encabezadosRow

            encabezados.forEach(encabezado => {
        
                const th = document.createElement('th');
                th.textContent = encabezado;
                encabezadosRow.appendChild(th)
        
            });
    
            thead.appendChild(encabezadosRow);
            tabla.appendChild(thead);
    
            const tbody = document.createElement('tbody');

            // Se recorre cada producto para generar las filas

            productos.forEach(producto => {
                
                const fila = document.createElement('tr');
                const tdID = document.createElement('td');
                const tdImagen = document.createElement('td');
                const imagen = document.createElement('img');
                const tdNombre = document.createElement('td');
                const tdDescripcion = document.createElement('td');
                const tdPrecio = document.createElement('td');
                const tdCategoria = document.createElement('td');
                const tdEstado = document.createElement('td');
                const tdAcciones = document.createElement('td');

                const botonActualizar = document.createElement('button');
                const botonCambiarEstado = document.createElement('button');
                const botonEliminar = document.createElement('button');

                tdImagen.appendChild(imagen);
                tdAcciones.appendChild(botonActualizar);
                tdAcciones.appendChild(botonCambiarEstado);
                tdAcciones.appendChild(botonEliminar);

                tdID.textContent = producto.id;
                imagen.src = producto.imagen;
                tdNombre.textContent = producto.nombre;
                tdDescripcion.textContent = producto.descripcion;
                tdPrecio.textContent = `$${producto.precio}`;
                tdCategoria.textContent = producto.tipo;
                if(producto.estado === 1){

                    tdEstado.textContent = 'Activo';
                
                }else{

                    tdEstado.textContent = 'Inactivo';

                };

                botonActualizar.textContent = 'Editar';
                if(producto.estado === 1){

                    botonCambiarEstado.textContent = 'Deshabilitar';

                }else{

                    botonCambiarEstado.textContent = 'Habilitar';

                };

                botonEliminar.textContent = 'Eliminar';


                botonActualizar.addEventListener('click', e=> {

                    window.location.href =`/admin/editar/${producto.id}`;

                });

                botonCambiarEstado.addEventListener('click', async e=> {

                    const confirmar = confirm(`Desea habilitar/deshabilitar la publicacion ${producto.nombre} con ID: ${producto.id}?`);

                    if(confirmar){

                        const datos = {

                            id: producto.id

                        };

                        try{

                            const response = await fetch(`/producto/cambiarEstado`, {

                                method: 'PUT',

                                headers: {

                                    'Content-Type': 'application/json'

                                },

                                body: JSON.stringify(datos)

                            });

                            if(response.ok){

                                const respuesta = await response.json();

                                alert(respuesta.message);

                                return window.location.reload();

                            }else{

                                const respuesta = await response.json();

                                console.log(respuesta);

                            }

                        }catch(error){
    
                            return console.error('Error al cambiarEstado ', error);
    
                        }

                    }else{

                        return;

                    }

                });

                botonEliminar.addEventListener('click', async e=> {

                    const confirmar = confirm(`Desea eliminar la publicacion ${producto.nombre} con ID: ${producto.id}?`);

                    if(confirmar){

                        const datos = {

                            id: producto.id

                        };

                        try{

                            const response = await fetch(`/producto/eliminar`, {

                                method: 'DELETE',

                                headers: {

                                    'Content-Type': 'application/json'

                                },

                                body: JSON.stringify(datos)

                            });

                            if(response.ok){

                                const respuesta = await response.json();

                                alert(respuesta.message);

                                return window.location.reload();

                            }else{

                                const respuesta = await response.json();

                                console.log(respuesta);

                            }

                        }catch(error){
    
                            return console.error('Error al cambiarEstado ', error);
    ;
                        }

                    }else{

                        return;

                    }


                })

                fila.appendChild(tdID);
                fila.appendChild(tdImagen);
                fila.appendChild(tdNombre);
                fila.appendChild(tdDescripcion);
                fila.appendChild(tdPrecio);
                fila.appendChild(tdCategoria);
                fila.appendChild(tdEstado);
                fila.appendChild(tdAcciones);

                tbody.appendChild(fila);

            });

            tabla.appendChild(tbody);

            // Se limpia la tabla y se añaden los elementos de la base de datos

            divTabla.innerHTML = '';
            divTabla.appendChild(tabla);

}