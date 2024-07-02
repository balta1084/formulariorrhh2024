const { Router } = require('express');
const adminRoutes = Router();
const {adminHTML, adminJS, obtenerPubli, agregarPubli, cambiarEstadoPubli, eliminarProducto} = require('../controllers/admin.controllers');
const {editarPublicacionHTML, editarPublicacionJS, actualizarPubli} = require('../controllers/editar_publicacion.controllers');
const {uploads} = require('../middlewares/uploads_images');
const {adminPass} = require('../middlewares/authentication')

//GET de Archivos Estaticos

adminRoutes.get('/admin', adminPass, adminHTML);
adminRoutes.get('/js/admin.js', adminJS);
adminRoutes.get('/admin/editar/:id', adminPass, editarPublicacionHTML);
adminRoutes.get('/admin/js/editar_publicacion.js', editarPublicacionJS);


// GET DE PUBLIS

adminRoutes.get('/productos/:id', adminPass, obtenerPubli);

// POST Publis

adminRoutes.post('/producto', adminPass, uploads.single('imagen'), agregarPubli);

// UPDATE Publis

adminRoutes.put('/productos/:id', adminPass, uploads.single('imagen'), actualizarPubli);
adminRoutes.put('/producto/cambiarEstado', adminPass, cambiarEstadoPubli);

// Eliminar Publi

adminRoutes.delete('/producto/eliminar', adminPass, eliminarProducto)


module.exports = {

    adminRoutes

};
