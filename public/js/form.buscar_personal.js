//Funcion para devolver la fecha actual

function fecha_hoy(){

    const fecha_hoy = new Date()

    const fechaISO = fecha_hoy.toISOString();

    const fechaFormateada = fechaISO.slice(0, 19).replace('T', ' ');

    const fecha_separada = fechaFormateada.split(' ')

    const fecha_sin_convertir = fecha_separada[0].split('-')

    const fecha = `${fecha_sin_convertir[2]}/${fecha_sin_convertir[1]}/${fecha_sin_convertir[0]}`

    return fecha

}

//Funcion para convertir una fecha
function convertirFecha(fecha){

    const fecha_separada = fecha.split('-')
    const dia = fecha_separada[2]
    const mes = fecha_separada[1]
    const anio = fecha_separada[0]

    const fecha_nueva = `${dia}/${mes}/${anio}`

    return fecha_nueva

}

// Funcion para capitalizar el texto
function capitalizar(texto){

    if(!texto) {

        return texto;

    }

    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}
// Funcion para crear la tabla con los elementos mostrados
function tabla_busqueda(json){

    // Tablas
    
    const tabla = document.createElement('table');

    // Creando los encabezados de la tabla

    const thead = document.createElement('thead');
    const encabezados = ['Nombre', 'Apellido', 'DNI', 'Edad', 'Fecha de ingreso', 'Dias de vacaciones', 'Estado', 'Fecha de Baja', 'Acciones'];

    // Creando la fila del encabezado
    const encabezadosRow = document.createElement('tr');

    // Recorriendo los encabezados para crearlos
    encabezados.forEach(encabezado => {

        const th = document.createElement('th');
        th.textContent = encabezado;
        encabezadosRow.appendChild(th)

    });

    thead.appendChild(encabezadosRow);
    tabla.appendChild(thead);

    const tbody = document.createElement('tbody');

    //Recorriendo las filas

    json.forEach(dato => {
    
        const fila = document.createElement('tr');
        const tdNombre = document.createElement('td');
        const tdApellido = document.createElement('td');
        const tdDNI = document.createElement('td');
        const tdEdad = document.createElement('td');
        const tdFechaIngreso = document.createElement('td');
        const tdVacaciones = document.createElement('td');
        const tdEstado = document.createElement('td');
        const tdFecha_baja = document.createElement('td');
        const tdultimaFila = document.createElement('td')
        const tdDeshabilitar = document.createElement('button');

        // Se calcula la edad de la persona
        const diferenciaFechasEdad = new Date() - new Date (dato.nacimiento);
        const convertirSegAnios = 1000 * 60 * 60 * 24 * 365.25;
        const edad = Math.floor(diferenciaFechasEdad/convertirSegAnios);

        // Se calcula las vacaciones segun la fecha de ingreso

        const diferenciaFechasIngreso = new Date() - new Date(dato.ingreso);
        const convertirSegDias = 1000 * 60 * 60 * 24;
        const diasActualIngreso = Math.floor(diferenciaFechasIngreso/convertirSegDias)

        const tresMesesPromDias = 30*3
        const seisMesesPromDias = 30*6
        const cincoAnios = 365.25*5
        const diezAnios = 365.25*10
        const veinteAnios = 365.25*20

        let vacaciones;

        if(diasActualIngreso < tresMesesPromDias){

            vacaciones = Math.floor(diasActualIngreso/20) + ' dias'

        }else if(diasActualIngreso >= tresMesesPromDias && diasActualIngreso < seisMesesPromDias ){

            vacaciones = 7 + ' dias'

        }else if(diasActualIngreso >= seisMesesPromDias && diasActualIngreso < cincoAnios){

            vacaciones = 14 + ' dias'

        }else if(diasActualIngreso >= cincoAnios && diasActualIngreso < diezAnios){

            vacaciones = 21 + ' dias'

        }else if(diasActualIngreso >= diezAnios && diasActualIngreso < veinteAnios){

            vacaciones = 28 + ' dias'

        }else{

            vacaciones = 35 + ' dias'

        }

        // Se cargan los datos en cada fila

        tdNombre.textContent = dato.nombre;
        tdApellido.textContent = dato.apellido;
        tdDNI.textContent = dato.dni;
        tdEdad.textContent = `${edad} años`;
        tdFechaIngreso.textContent = convertirFecha(dato.ingreso);
        tdEstado.textContent = dato.estado
        tdFecha_baja.textContent = dato.fecha_baja;

        // Si es estado guardado, es OK, muestra las vacaciones y el boton será "Deshabilitar", sino lo contrario

        if(dato.estado == 'Ok'){

            tdVacaciones.textContent = vacaciones;
            tdDeshabilitar.textContent = 'Deshabilitar';

        }else{

            tdVacaciones.textContent = '-'
            tdDeshabilitar.textContent = 'Habilitar';

        }


        tdDeshabilitar.addEventListener('click', async (e)=> {

            // Creo la confirmacion para realizar la operacion 

            let confirmacion = confirm(`Deseas ${tdDeshabilitar.textContent} a ${dato.nombre} ${dato.apellido}?`)

            if(confirmacion){

                const personal = JSON.parse(localStorage.getItem('Personal'))

                if(tdDeshabilitar.textContent == 'Deshabilitar'){

                    tdVacaciones.textContent = '-'
                    tdEstado.textContent = 'Baja'
                    tdFecha_baja.textContent = fecha_hoy()
                    tdDeshabilitar.textContent = 'Habilitar'

                    for(let i = 0; i<personal.length;i++){

                        if(personal[i].dni == dato.dni){

                            personal[i].estado = 'Baja'
                            personal[i].fecha_baja = fecha_hoy()

                        }

                    }

                    localStorage.setItem('Personal', JSON.stringify(personal))

                }else{

                    tdVacaciones.textContent = vacaciones
                    tdEstado.textContent = 'Ok'
                    tdFecha_baja.textContent = '-'
                    tdDeshabilitar.textContent = 'Deshabilitar'

                    for(let i = 0; i<personal.length;i++){

                        if(personal[i].dni == dato.dni){

                            personal[i].estado = 'Ok'
                            personal[i].fecha_baja = '-'

                        }

                    }

                    localStorage.setItem('Personal', JSON.stringify(personal))

                }
            }

        })

        tdultimaFila.appendChild(tdDeshabilitar)

        fila.appendChild(tdNombre);
        fila.appendChild(tdApellido);
        fila.appendChild(tdDNI);
        fila.appendChild(tdEdad);
        fila.appendChild(tdFechaIngreso);
        fila.appendChild(tdVacaciones);
        fila.appendChild(tdEstado);
        fila.appendChild(tdFecha_baja);
        fila.appendChild(tdultimaFila)

        tbody.appendChild(fila);

});

    tabla.appendChild(tbody);

    // Añadir tabla al contenedor del html

    const contenedorTabla = document.getElementById('tabla_busqueda');
    contenedorTabla.innerHTML = ''; //Limpiar contenido de busqueda anterior
    contenedorTabla.appendChild(tabla);

}

// Funcion para buscar los datos guardados en el local storage
function leerDatos(){

    //Capturo los datos del formulario

    const data = {

        busqueda: capitalizar(document.getElementById('buscar').value)

    }

    // Si no se escribe nada en el campo, por defecto buscará todo, sino, buscará la palabra en el almacenamiento local

    if(data.busqueda == ''){

        let storedData = JSON.parse(localStorage.getItem('Personal'));

        tabla_busqueda(storedData);

    }else{

        console.log(data.busqueda);

        document.getElementById('buscar').value = '';

    }

}

document.addEventListener('DOMContentLoaded', (e)=>{

    const formulario = document.getElementById('form')

    formulario.addEventListener('keypress', (e)=> {

        if(e.key === 'Enter'){

            e.preventDefault()
            leerDatos()

        }

    })

})