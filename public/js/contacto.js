document.addEventListener('DOMContentLoaded', (e)=>{

    //Se identifica el boton
    
    const boton = document.getElementById('enviar')

    boton.addEventListener('click', (e)=> {

        //Se identifican los inputs

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const radius = {

            consulta: document.getElementById('consulta'),
            sugerencia: document.getElementById('sugerencia'),
            queja: document.getElementById('queja'),
            otro: document.getElementById('otro')

        }
        const select = document.getElementById('zona').value;
        const mensaje = document.getElementById('mensaje').value

        // Se hacen las validaciones de los campos de nombre y telefono

        if(nombre.length < 3){

            return alert('Ingrese un nombre valido')
           

        }else if(!parseInt(telefono)){

            return alert('El numero de telefono debe ser un numero')

        }else if(telefono.length < 8){

            return alert('El numero de telefono debe ser un numero valido')

        }

        // Se recorren los radius y se verifica que este alguno elegido

        let radiusSelected = false

        for(let check in radius){

            if(radius[check].checked){

                radiusSelected = true
                break

            }

        }

        if(!radiusSelected){

            return alert('Debes seleccionar al menos una opcion de motivo de contacto')

        }

        // Se hace la valiacion del select, si bien esta validado desde el html, se hace desde el JS por si acaso

        if(select == '--Selecciona--'){

            return alert('Por favor selecciona una sucursal')

        }

        // Se valida el textArea

        if(mensaje.length < 10){

            return alert('Por favor, indicanos brevemente el motivo de tu contacto.')

        }

        alert(`Formulario enviado, te contactaremos al email: ${email} o a tu telefono, muchas gracias!`)

        // Se limpia el formulario

        document.getElementById('nombre').value = ''
        document.getElementById('email').value = ''
        document.getElementById('telefono').value = ''
        document.getElementById('consulta').checked = false
        document.getElementById('sugerencia').checked = false
        document.getElementById('queja').checked = false
        document.getElementById('otro').checked = false
        document.getElementById('zona').value = ''
        document.getElementById('mensaje').value = ''

        return

    })
})