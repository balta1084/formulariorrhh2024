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

                if(response.status == 200){

                    console.log(respuesta)

                    alert(respuesta.message)
    
                    return window.location.href = respuesta.href

                }

            }else{

                const respuesta = await response.json();

                if(response.status == 400){

                    return alert(respuesta.message)

                }

            }


        }catch(error){

            return console.error('Error: ', error)

        }

    })

    registro.addEventListener('click', (e) => {

        window.location.href = '/registrarse'

    })

})