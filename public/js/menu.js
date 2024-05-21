document.addEventListener('DOMContentLoaded', (e)=> {

    for(i = 1 ; i<10 ; i++){

        const boton = document.getElementById(`boton${i}`);
        const imagen = document.getElementById(`menu${i}`).src;
        const nombre = document.getElementById(`nombre${i}`).textContent;
        const precio = convertirPrecio(`precio${i}`)

        boton.addEventListener('click', (e)=>{

            agregarComida(imagen, nombre, precio)
    
        })

    }


    console.log(localStorage.getItem('carrito'))

})

function agregarComida(imagen, nombre, precio){


    let storageString = localStorage.getItem('carrito');

    let carrito = storageString ? JSON.parse(storageString) : [];

    let objeto = {

        imagen: imagen,
        nombre: nombre,
        precio: precio,

    }

    carrito.push(objeto)

    let jsonCarrito = JSON.stringify(carrito)

    localStorage.setItem('carrito', jsonCarrito)

    alert(`Agregaste ${nombre} correctamente`)

}

function convertirPrecio(id) {
    const precio = document.getElementById(id).textContent.trim();
    let precioConvertido = '';

    for(let i = 0; i < precio.length; i++) {
        let letra = precio[i];

        if(letra !== '.' && letra !== '$') {
            precioConvertido += letra;
        }
    }

    return precioConvertido;
}