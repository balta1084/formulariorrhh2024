const { Router } = require('express');
const adminRoutes = Router();
const {adminHTML, adminJS, obtenerPubli} = require('../controllers/admin.controllers');
const {editarPublicacionHTML, editarPublicacionJS, actualizarPubli} = require('../controllers/editar_publicacion.controllers');
const {uploads} = require('../middlewares/uploads_images')

//GET de Archivos Estaticos

adminRoutes.get('/admin', adminHTML);
adminRoutes.get('/js/admin.js', adminJS);
adminRoutes.get('/admin/editar/:id', editarPublicacionHTML);
adminRoutes.get('/admin/js/editar_publicacion.js', editarPublicacionJS);


// GET DE PUBLIS

adminRoutes.get('/productos/:id', obtenerPubli);

// UPDATE Publis

adminRoutes.post('/productos/:id', uploads.single('imagen'), actualizarPubli)

module.exports = {

    adminRoutes

};
