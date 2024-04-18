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
    const encabezados = ['Nombre', 'Apellido', 'DNI', 'Edad', 'Fecha de ingreso', 'Dias de vacaciones', 'Acciones'];

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
        const tdDeshabilitar = document.createElement('button')

        tdNombre.textContent = dato.nombre;
        tdApellido.textContent = dato.apellido;
        tdDNI.textContent = dato.dni;
        tdEdad.textContent = dato.nacimiento;
        tdFechaIngreso.textContent = dato.ingreso;
        tdVacaciones.textContent = 'A calcular'
        tdDeshabilitar.textContent = 'Deshabilitar'

        tdDeshabilitar.addEventListener('click', async (e)=> {

            console.log('Deshabilitado')

        })

        fila.appendChild(tdNombre);
        fila.appendChild(tdApellido)
        fila.appendChild(tdDNI)
        fila.appendChild(tdEdad)
        fila.appendChild(tdFechaIngreso)
        fila.appendChild(tdVacaciones)
        fila.appendChild(tdDeshabilitar)

        tbody.appendChild(fila);

});

    tabla.appendChild(tbody);

    // Añadir tabla al contenedor del html

    const contenedorTabla = document.getElementById('tabla_busqueda');
    contenedorTabla.innerHTML = '' //Limpiar contenido de busqueda anterior
    contenedorTabla.appendChild(tabla)

}
// Funcion para buscar los datos guardados en el local storage
function leerDatos(){

    //Capturo los datos del formulario

    const data = {

        busqueda: capitalizar(document.getElementById('buscar').value)

    }

    // Si no se escribe nada en el campo, por defecto buscará todo, sino, buscará la palabra en el almacenamiento local

    if(data.busqueda == ''){

        let storedData = JSON.parse(localStorage.getItem('Personal'))

        tabla_busqueda(storedData)

    }else{

        console.log(data.busqueda)

        document.getElementById('buscar').value = ''

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