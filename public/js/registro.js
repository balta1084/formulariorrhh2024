document.addEventListener('DOMContentLoaded', e=>{

    const registrarse = document.getElementById('registro');
    const login = document.getElementById('login');

    login.addEventListener('click', e=> {

        window.location.href = '/login'

    })
   
    registrarse.addEventListener('click', async (e)=>{

        e.preventDefault()

        const datos = {

            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            dni: validarDNI(document.getElementById('dni').value),
            email: document.getElementById('email').value,
            pass: document.getElementById('pass').value,
            confirmarPass: document.getElementById('passConfirm').value
    
        };

        // Validando que esten todos los datos completos

        for(const dato in datos){

            if(datos[dato] == ''){
    
                return alert(`Por favor completa todos los datos para registrarte`)
    
            }

        }

        // Validando la cantidad de digitos del DNI

        if(datos.dni.length < 7){

            return alert('El numero es demasiado corto para un DNI')
    
        }else if (datos.dni.length > 8){
    
            return alert('El numero es demasiado Largo para un DNI')
    
        }

        if(datos.pass !== datos.confirmarPass){

            return alert('Las contraseñas no coinciden')

        // Comunicacion con el server 
        }

        try{
            const response = await fetch('/registrar_user', {

                method: 'POST',
                headers: {

                    'Content-Type': 'application/json'

                },

                body: JSON.stringify(datos)

            });

            // Respuesta del server
            if(response.ok){

                const respuesta = await response.json();

                console.log(respuesta)

                if(response.status === 200){

                    return alert(respuesta.message)

                }

            }else{

                const respuesta = await response.json();

                if(response.status == 400){

                    return alert(respuesta.message)

                }else if(response.status === 500){

                    return alert(respuesta.message)

                }

            }

        }catch(error){

            return console.error('Error: ', error)

        }

    })


})

//Funcion para validar el DNI
function validarDNI(dni){

    let numero = '';

    for(let i=0;i<dni.length;i++){

        if(dni[i] == '.' || dni[i] == ',' || dni[i] == '-' || dni[i] == '_'){

            continue

        }else{

            numero+= dni[i]

        }

    }

    return numero

}