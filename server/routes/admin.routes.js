const { Router } = require('express');
const adminRoutes = Router();
const {adminHTML, adminJS, obtenerPubli} = require('../controllers/admin.controllers');
const {editarPublicacionHTML, editarPublicacionJS, actualizarPubli} = require('../controllers/editar_publicacion.controllers')

//GET de Archivos Estaticos

adminRoutes.get('/admin', adminHTML);
adminRoutes.get('/js/admin.js', adminJS);
adminRoutes.get('/admin/editar/:id', editarPublicacionHTML);
adminRoutes.get('/admin/js/editar_publicacion.js', editarPublicacionJS);


// GET DE PUBLIS

adminRoutes.get('/productos/:id', obtenerPubli);

// UPDATE Publis

adminRoutes.put('/productos/:id', actualizarPubli)

module.exports = {

    adminRoutes

};
