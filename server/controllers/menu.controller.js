const path = require('path');
const {conectar} = require('../config/db');
const { verificarUser, obtenerIDUser } = require('../modulos/funciones');

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

async function pedir(req,res){

    const solicitud = req.body;

    // Verificando si el user esta log
    const verificar = await verificarUser(req)

    //Si es verdadero procede, sino redirije a login
    if(verificar){

        // Verificando en la DB el userID
        const mailId = await obtenerIDUser(req);
        
        let total = 0

        // Sumando el ticket del carrito
        solicitud.forEach(element => {

            const subtotal = element.precio * element.cantidad

            total += subtotal
            
        });

        try{

            // Insertando pedido a la base de pedidos
            const queryAddPedidos = `INSERT INTO Pedidos (usuario_id, total) VALUES(?,?)`
            const valuesPedido = [mailId, total.toFixed(2)]

            const pool = await conectar();

            await pool.query(queryAddPedidos, valuesPedido);
            
            //Tomando el id del ultimo pedido insertado
            const queryLastInsert = await pool.query(`SELECT LAST_INSERT_ID() AS pedido_id`);

            const ultimoIDInserado = queryLastInsert[0][0].pedido_id;

            //Insertando cada producto del carrito a la base de pedido de productos
            const queryAddPediProd = `INSERT INTO pedidos_productos (pedido_id, producto_id, cantidad, precio_unitario, total) VALUES (?,?,?,?,?)`;

            solicitud.forEach(async element => {

                const subtotal = (element.cantidad * element.precio).toFixed(2)
                const valuesPediProd = [ultimoIDInserado, element.id, element.cantidad, element.precio, subtotal]

                await pool.query(queryAddPediProd, valuesPediProd)

            });

            await pool.end();

            return res.status(201).json({message:'Estamos procesando tu pedido, te avisaremos cuando este en camino', nroPedido: ultimoIDInserado})

    
        }catch(error){
    
            return res.status(400).json({message:`Error al procesar la solicitud: ${error}`})
    
        }

    }else{

        return res.status(403).json({message: 'Por favor logeate o registrate para continuar', href: '/login'})

    }

}

module.exports = {

    menuHTML,productos,pedir

};