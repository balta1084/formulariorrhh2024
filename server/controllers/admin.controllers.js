const path = require('path');

function adminHTML(req,res){

    const ruta = path.join(__dirname, '../../public/html/admin.html');

    res.sendFile(ruta);

};

function adminJS(req,res){

    const ruta = path.join(__dirname, '../../public/js/admin.js');

    res.sendFile(ruta);

};

async function publicaciones(req,res){

    

}

module.exports = {

    adminHTML, adminJS, publicaciones

}