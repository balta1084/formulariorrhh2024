// Funcion para capitalizar el texto
function capitalizar(texto){

    if(!texto) {

        return texto;

    }

    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();


}
//Funcion para valiadar el formulario
function validarForm(){

    // Se capturan los datos ingresados en el formulario

    const datos = {

        nombre: capitalizar(document.getElementById('nombre').value),
        apellido: capitalizar(document.getElementById('apellido').value),
        dni: document.getElementById('dni').value,
        nacimiento: document.getElementById('nacimiento').value,
        ingreso: document.getElementById('ingreso').value,

    };

    // Se recorren esos datos para verificar que esten todos completos, si no estan completos tira un alert

    for(let dato in datos){

        if(datos[dato] == ''){

            return alert('Completa todos los datos por favor');

        }

    }

    // Se retorna ese objeto para usarlo

    return datos

}
//Funcion para guardar los datos del formulario en el local storage
function guardarForm(json){

    // Obtengo el almacenamiento local o inicio un array vacio

    let storedData = JSON.parse(localStorage.getItem('Personal')) || [];

    // Se hace la validacion para ver si el dni ingresado, existe o no, si existe tira un alert, sino sigue de largo

    if(storedData != []){

        for(let i = 0; i<storedData.length;i++){

            if(storedData[i].dni == json.dni){

                return alert('Este dni ya existe, por favor ingrese otro')

            }

        }

    }

    // Se pushea la informacion obtenida el formulario

    storedData.push(json)

    //Guarda el array actualizado en el local storage

    localStorage.setItem('Personal', JSON.stringify(storedData))

    // Retorna un alert indicando que se guardó correctamente

    return alert(`Se agregó a ${json.nombre} correctamente.`)

}
//Evento que carga el contenido de la pagina
document.addEventListener('DOMContentLoaded', (e)=> {

    e.preventDefault()

    const boton = document.getElementById('enviar');
    //Evento de click que ejecuta la funcion para guardar la info del form
    boton.addEventListener('click', (e)=> {

        e.preventDefault()

        const data = validarForm()

        guardarForm(data)

    })

})