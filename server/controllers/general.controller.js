const path = require('path');

// Funcion para enviar los archivos estaticos

function cssGeneral(req,res){

    const ruta = path.join(__dirname, '../../public/css/index.css');

    res.sendFile(ruta);

};

function carritoJS(req,res){

    const ruta = path.join(__dirname, '../../public/js/carrito.js');

    res.sendFile(ruta);

};

function menuJS(req,res){

    const ruta = path.join(__dirname, '../../public/js/menu.js');
    
    res.sendFile(ruta);

};

module.exports = {

    cssGeneral, carritoJS, menuJS

};