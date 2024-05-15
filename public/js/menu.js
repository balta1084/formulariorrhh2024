document.addEventListener('DOMContentLoaded', (e)=> {

    for(i = 1 ; i<10 ; i++){

        const boton = document.getElementById(`boton${i}`);
        const imagen = document.getElementById(`menu${i}`).src;
        const nombre = document.getElementById(`nombre${i}`).textContent;
        const precio = convertirPrecio(`precio${i}`)
        let descuento = 0
        if(i <= 3){

            descuento = 30

        }else if(i > 3 && i <= 6){

            descuento = 45

        }else{

            descuento = 50

        }

        boton.addEventListener('click', (e)=>{

            agregarComida(imagen, nombre, precio, descuento)
    
        })

    }


    console.log(localStorage.getItem('carrito'))

})

function agregarComida(imagen, nombre, precio, descuento){


    let storageString = localStorage.getItem('carrito');

    let carrito = storageString ? JSON.parse(storageString) : [];

    let objeto = {

        imagen: imagen,
        nombre: nombre,
        precio: precio,
        descuento: descuento

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