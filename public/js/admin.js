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
            const encabezados = ['ID','Imagen', 'Nombre', 'Descripcion', 'Precio','Categoria','Acciones'];
        
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
                const tdAcciones = document.createElement('td');

                console.log(imagen)

                const botonActualizar = document.createElement('button');
                const botonEliminar = document.createElement('button');

                tdImagen.appendChild(imagen);
                tdAcciones.appendChild(botonActualizar);
                tdAcciones.appendChild(botonEliminar);

                tdID.textContent = producto.id;
                imagen.src = producto.imagen;
                tdNombre.textContent = producto.nombre;
                tdDescripcion.textContent = producto.descripcion;
                tdPrecio.textContent = `$${producto.precio}`;
                tdCategoria.textContent = producto.tipo;
                botonActualizar.textContent = 'Editar';
                botonEliminar.textContent = 'Eliminar';

                botonActualizar.addEventListener('click', e=> {

                    window.location.href =`/admin/editar/${producto.id}`

                })

                botonEliminar.addEventListener('click', e=> {

                    alert('En construccion')

                })

                fila.appendChild(tdID);
                fila.appendChild(tdImagen);
                fila.appendChild(tdNombre);
                fila.appendChild(tdDescripcion);
                fila.appendChild(tdPrecio);
                fila.appendChild(tdCategoria);
                fila.appendChild(tdAcciones);

                tbody.appendChild(fila);

            });

            tabla.appendChild(tbody);

            // Se limpia la tabla y se añaden los elementos de la base de datos

            divTabla.innerHTML = '';
            divTabla.appendChild(tabla)

}