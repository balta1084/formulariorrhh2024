const path = require('path');

// Funcion para enviar los archivos estaticos

function loginHTML(req,res){

    const ruta = path.join(__dirname, '../../public/html/login.html');

    res.sendFile(ruta);

}

module.exports = {

    loginHTML

};