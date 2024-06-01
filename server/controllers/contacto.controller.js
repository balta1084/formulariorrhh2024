const path = require('path');

// Funcion para enviar los archivos estaticos

function contactoHTML(req,res){

    const ruta = path.join(__dirname, '../../public/html/contacto.html');

    res.sendFile(ruta);

};


module.exports = {

    contactoHTML

};