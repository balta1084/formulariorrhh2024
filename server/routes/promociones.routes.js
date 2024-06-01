const { Router } = require('express');
const promocionesRoutes = Router();
const {promocionesHTML} = require('../controllers/promociones.contoller');
const {cssGeneral, carritoJS, menuJS} = require('../controllers/general.controller');

//GET de Archivos Estaticos

promocionesRoutes.get('/promociones', promocionesHTML);
promocionesRoutes.get('/css/index.css', cssGeneral);
promocionesRoutes.get('/js/carrito.js', carritoJS);
promocionesRoutes.get('/js/menu.js', menuJS);

module.exports = {

    promocionesRoutes

};
