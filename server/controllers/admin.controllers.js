const path = require('path');
const {conectar} = require('../config/db')

function adminHTML(req,res){

    const ruta = path.join(__dirname, '../../public/html/admin.html');

    res.sendFile(ruta);

};

function adminJS(req,res){

    const ruta = path.join(__dirname, '../../public/js/admin.js');

    res.sendFile(ruta);

};

async function obtenerPubli(req,res){

    const id = req.params.id

    try{

        const queryRead = `SELECT imagen, nombre, descripcion, tipo, precio FROM productos WHERE id = ?`

        const pool = await conectar();

        const respuesta = await pool.query(queryRead, id);

        await pool.end()

        return res.status(200).json({producto: respuesta[0][0]})

    }catch(error){

        return res.status(400).json({message: 'Error al obtener datos'})

    }

}


module.exports = {

    adminHTML, adminJS, obtenerPubli

}