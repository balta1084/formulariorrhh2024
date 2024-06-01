const { Router } = require('express');
const menuRoutes = Router();
const {menuHTML} = require('../controllers/menu.controller');
const {cssGeneral, carritoJS, menuJS} = require('../controllers/general.controller');

//GET de Archivos Estaticos

menuRoutes.get('/menu', menuHTML);
menuRoutes.get('/css/index.css', cssGeneral);
menuRoutes.get('/js/carrito.js', carritoJS);
menuRoutes.get('/js/menu.js', menuJS);

module.exports = {

    menuRoutes

};
