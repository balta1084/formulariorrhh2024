function enviarFormulario(){

    const datos = {

        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        nacimiento: document.getElementById('nacimiento').value,
        ingreso: document.getElementById('ingreso').value,

    }

    for(let dato in datos){

        if(datos[dato] == ''){

            return alert('Completa todos los datos por favor')

        }

    }

    console.log(datos)

}

document.addEventListener('DOMContentLoaded', (e)=> {

    e.preventDefault()

    const boton = document.getElementById('enviar');

    boton.addEventListener('click', (e)=> {

        e.preventDefault()

        enviarFormulario()

    })

})