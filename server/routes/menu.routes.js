const { Router } = require('express');
const menuRoutes = Router();
const {menuHTML, productos, pedir} = require('../controllers/menu.controller');
const {cssGeneral, carritoJS, menuJS} = require('../controllers/general.controller');
const {SoloUser} = require('../middlewares/authentication')

//GET de Archivos Estaticos

menuRoutes.get('/menu', menuHTML);
menuRoutes.get('/css/index.css', cssGeneral);
menuRoutes.get('/js/carrito.js', carritoJS);
menuRoutes.get('/js/menu.js', menuJS);

//GET de consultas

menuRoutes.get('/productos', productos)

//POST

menuRoutes.post('/pedidos',pedir)

module.exports = {

    menuRoutes

};
