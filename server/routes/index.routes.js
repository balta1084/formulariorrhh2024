const { Router } = require('express');
const indexRoutes = Router();
const {indexHTML} = require('../controllers/index.cotroller');
const {cssGeneral, carritoJS} = require('../controllers/general.controller');
const {soloUser} = require('../middlewares/authentication')

//GET de Archivos Estaticos

indexRoutes.get('/', indexHTML);
indexRoutes.get('/css/index.css', cssGeneral);
indexRoutes.get('/js/carrito.js', carritoJS);

module.exports = {

    indexRoutes

};
