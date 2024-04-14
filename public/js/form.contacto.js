function enviarFormulario(){

    const data = {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    mail: document.getElementById('email').value,
    telefono: document.getElementById('telefono').value,
    check1: document.getElementById('check1'),
    check2: document.getElementById('check2'),
    radio1: document.getElementById('radio1'),
    radio2: document.getElementById('radio2'),
    radio3: document.getElementById('radio3'),
    provincia: document.getElementById('provincia').value,
    areaTexto: document.getElementById('areaTexto').value

    }

    for(dato in data){

        if(data[dato] == ''){

            return alert(`Por favor completa todos los campos`)

        }

    }

    if(!data.check1.checked && !data.check2.checked){

        return alert('Debe seleccionar al menos un interes')

    }

    if(!data.radio1.checked && !data.radio2.checked && !data.radio3.checked){

        return alert('Debe seleccionar al menos un horario de contacto')

    }

    console.log(data)

}

document.addEventListener('DOMContentLoaded', (e)=>{

    const boton = document.getElementById('enviar')

    boton.addEventListener('click', enviarFormulario)

})