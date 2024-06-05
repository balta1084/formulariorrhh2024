document.addEventListener('DOMContentLoaded', (e)=>{

    const login = document.getElementById('login');
    const registro = document.getElementById('registrarse');

    login.addEventListener('click', async (e)=>{

        e.preventDefault()
    
        const datos = {

            email: document.getElementById('email').value,
            pass: document.getElementById('pass').value
    
        };

        if(datos.email == ''){

            return alert('Por favor complete su email para ingresar')
    
        }
    
        if(datos.pass == ''){
    
            return alert('Por favor ingrese su contraseña para ingresar')
    
        }

        try{

            const response = await fetch('/login_user', {

                method: 'POST',
                headers: {

                    'Content-Type': 'application/json'

                },

                body: JSON.stringify(datos)

            });

            if(response.ok){

                const respuesta = await response.json();

                const mensaje = respuesta.respuesta

                return alert(mensaje)

            }


        }catch(error){

            return console.error('Error: ', error)

        }

    })

    registro.addEventListener('click', (e) => {

        window.location.href = '/registrarse'

    })

})