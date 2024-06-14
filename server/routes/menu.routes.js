const { Router } = require('express');
const menuRoutes = Router();
const {menuHTML, productos} = require('../controllers/menu.controller');
const {cssGeneral, carritoJS, menuJS} = require('../controllers/general.controller');

//GET de Archivos Estaticos

menuRoutes.get('/menu', menuHTML);
menuRoutes.get('/css/index.css', cssGeneral);
menuRoutes.get('/js/carrito.js', carritoJS);
menuRoutes.get('/js/menu.js', menuJS);

//GET de consultas

menuRoutes.get('/productos', productos)

module.exports = {

    menuRoutes

};
