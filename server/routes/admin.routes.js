const { Router } = require('express');
const adminRoutes = Router();
const {adminHTML, adminJS, publicaciones} = require('../controllers/admin.controllers')

//GET de Archivos Estaticos

adminRoutes.get('/admin', adminHTML);
adminRoutes.get('/js/admin.js', adminJS)

// GET de Consultas

adminRoutes.get('/publicaciones', publicaciones)

module.exports = {

    adminRoutes

};
