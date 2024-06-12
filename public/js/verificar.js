document.addEventListener('DOMContentLoaded', async e=> {

    // Funcionalidad para ocultar el login y registro si es que el user está logeado

    const listaLogin = document.getElementById('listaLogin');
    const listaReg = document.getElementById('listaReg');
    const bienvenida = document.getElementById('bienvenida');
    const listaCerrarSesion = document.getElementById('listaCerrarSesion');
    const cerrarSesion = document.getElementById('cerrarSesion')

    try{

        const response = await fetch('verificar_user', {

            method: 'POST',
            headers: {

                'Content-Type': 'application/json'

            },

        })

        if(response.ok){

            const respuesta = await response.json()
            
            if(respuesta.auth){

                listaLogin.classList.add('invisible');
                listaReg.classList.add('invisible');
                bienvenida.classList.remove('invisible');
                bienvenida.textContent = `Bienvenido/a ${respuesta.nombre}`;
                listaCerrarSesion.classList.remove('invisible');

                cerrarSesion.addEventListener('click', e => {

                    document.cookie = "jwt=; path=/; expires = Thu, 01 Jan 1970 00:00:01 GMT"
                    window.location.href = "/login"

                })

            }

        }


    }catch(error){

        return console.error('Error: ', error)

    }

})