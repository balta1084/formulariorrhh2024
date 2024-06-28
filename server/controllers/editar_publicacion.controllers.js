const path = require('path');
const {conectar} = require('../config/db');
const fs = require('fs');

function editarPublicacionHTML(req,res){

    const ruta = path.join(__dirname, '../../public/html/editar_publicacion.html');

    res.sendFile(ruta);

};

function editarPublicacionJS(req,res){

    const ruta = path.join(__dirname, '../../public/js/editar_publicacion.js');

    res.sendFile(ruta);

};

async function actualizarPubli(req,res){

    const datos = req.body;
    
    const imagen = req.file;

    const pool = await conectar();

    try{

        if(!imagen){

            const queryUpdate = `UPDATE productos SET nombre = ?, descripcion = ?, tipo = ?, precio = ? WHERE id = ?`
            const values = [datos.nombre, datos.descripcion, datos.tipo, datos.precio, datos.id]

            await pool.query(queryUpdate, values);

            await pool.end();

            return res.status(200).json({message: 'Producto actualizado con exito', href: '/admin'});

        }else{

            const rutaDesarmada = imagen.path.split('\\').reverse();

            const rutaImagen = `/${rutaDesarmada[1]}/${rutaDesarmada[0]}`

            const queryRead = `SELECT imagen FROM productos WHERE id = ?`

            const imagenEncontrada = await pool.query(queryRead, datos.id);

            const rutaImagenDB = imagenEncontrada[0][0].imagen;

            const rutaImagenGuardada = path.join(__dirname, '../../public/assets', rutaImagenDB);
        
            fs.unlink(rutaImagenGuardada, async (err) => {

                if(err){

                    await pool.end();
                    console.error('Error al eliminar la imagen', err);
                    return res.status(500).json({message: 'Error al eliminar la imagen anterior'})

                }

            })

            const queryUpdate = `UPDATE productos SET imagen = ?, nombre = ?, descripcion = ?, tipo = ?, precio = ? WHERE id = ?`;

            const values = [rutaImagen, datos.nombre, datos.descripcion, datos.tipo, datos.precio, datos.id];

            await pool.query(queryUpdate, values);

            await pool.end();

            return res.status(200).json({message: 'Producto actualizado con exito', href: '/admin'});

        }

    }catch(error){

        return res.status(400).json({message: 'No se pudo actualizar el producto'});

    }

};

module.exports = {

    editarPublicacionHTML, editarPublicacionJS, actualizarPubli

}