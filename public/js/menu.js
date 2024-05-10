document.addEventListener('DOMContentLoaded', (e)=> {

    const boton1 = document.getElementById('boton1');
    const imagen1 = document.getElementById('menu1').src;
    const nombre1 = document.getElementById('nombre1').textContent;
    const descripcion1 = document.getElementById('descripcion1').textContent;
    const precio1 = convertirPrecio('precio1')
    const descuento1 = 30


    boton1.addEventListener('click', (e)=>{

        agregarComida(imagen1, nombre1, descripcion1, precio1, descuento1)

    })

    console.log(localStorage.getItem('carrito'))

})

function agregarComida(imagen, nombre, descripcion, precio, descuento){


    let storageString = localStorage.getItem('carrito');

    let carrito = storageString ? JSON.parse(storageString) : [];

    let objeto = {

        imagen: imagen,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        descuento: descuento

    }

    carrito.push(objeto)

    let jsonCarrito = JSON.stringify(carrito)

    localStorage.setItem('carrito', jsonCarrito)

    console.log('Menu en carrito')

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