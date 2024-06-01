const path = require('path');

// Funcion para enviar los archivos estaticos

function menuHTML(req,res){

    const ruta = path.join(__dirname, '../../public/html/menu.html');

    res.sendFile(ruta);

};


module.exports = {

    menuHTML

};