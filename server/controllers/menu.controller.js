const path = require('path');
const {conectar} = require('../config/db')

// Funcion para enviar los archivos estaticos

function menuHTML(req,res){

    const ruta = path.join(__dirname, '../../public/html/menu.html');

    res.sendFile(ruta);

};

async function productos(req,res){

    const queryRead = `SELECT * FROM productos`

    try{

        const pool = await conectar();

        const productos = await pool.query(queryRead)

        await pool.end()

        return res.status(200).json({productos: productos[0]})

    }catch(error){

        return res.status(400).json({message:'Error al buscar en la base'})

    }

}

module.exports = {

    menuHTML,productos

};