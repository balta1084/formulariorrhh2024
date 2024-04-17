function enviarFormulario(){

    const data = {

        busqueda: document.getElementById('buscar').value

    }

    if(data.busqueda == ''){

        console.log('busca todo')

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
            enviarFormulario()

        }

    })

})