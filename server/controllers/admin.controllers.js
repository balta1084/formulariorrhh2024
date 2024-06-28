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

        const queryRead = `SELECT imagen, nombre, descripcion, tipo, precio, estado FROM productos WHERE id = ?`

        const pool = await conectar();

        const respuesta = await pool.query(queryRead, id);

        await pool.end()

        return res.status(200).json({producto: respuesta[0][0]})

    }catch(error){

        return res.status(400).json({message: 'Error al obtener datos'})

    }

}

async function agregarPubli(req,res){

    const datos = req.body;

    const imagen = req.file;

    if(!imagen){

        return res.status(400).json({message: 'Por favor carga la imagen'})

    }

    try{

        const rutaDesarmada = imagen.path.split('\\').reverse();
        const rutaImagen = `/${rutaDesarmada[1]}/${rutaDesarmada[0]}`

        const pool = await conectar();

        const queryAdd = `INSERT INTO productos (imagen, nombre, descripcion, tipo, precio, estado) VALUES (?, ?, ?, ?, ?, ?)`
        const values = [rutaImagen, datos.nombre, datos.descripcion, datos.tipo, datos.precio, 1]

        await pool.query(queryAdd, values);

        await pool.end();

        return res.status(201).json({message: `${datos.nombre} guardado correctamente`, href: '/admin'})

    }catch(error){

        return console.error('Error: ', error)

    }

}

async function cambiarEstadoPubli(req,res){

    const {id} = req.body;

    try{

        const queryRead = `SELECT estado FROM productos WHERE id = ?`
        const valuesRead = [id]

        const queryUpdate = `UPDATE productos SET estado = ? WHERE id = ?`;
        
        const pool = await conectar();

        const busqueda = await pool.query(queryRead, valuesRead);

        const estado = busqueda[0][0].estado;

        if(estado === 1){

            const valuesUpdate = [0, id];

            await pool.query(queryUpdate, valuesUpdate);

            await pool.end();
    
            return res.status(200).json({message: 'El producto fue deshabilitado con exito'})

        }else{
            
            const valuesUpdate = [1, id];

            await pool.query(queryUpdate, valuesUpdate);

            await pool.end();
    
            return res.status(200).json({message: 'El producto fue habilitado con exito'})

        }




    }catch(error){

        return res.status(400).json({message: 'Error al eliminar el producto'})

    }

}

module.exports = {

    adminHTML, adminJS, obtenerPubli, agregarPubli, cambiarEstadoPubli

}