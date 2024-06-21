const { Router } = require('express');
const adminRoutes = Router();
const {adminHTML, adminJS} = require('../controllers/admin.controllers')

//GET de Archivos Estaticos

adminRoutes.get('/admin', adminHTML);
adminRoutes.get('/js/admin.js', adminJS)

module.exports = {

    adminRoutes

};
