const { Router } = require('express');
const contactoRoutes = Router();
const {contactoHTML} = require('../controllers/contacto.controller');
const {cssGeneral, carritoJS, menuJS} = require('../controllers/general.controller');

//GET de Archivos Estaticos

contactoRoutes.get('/contacto', contactoHTML);
contactoRoutes.get('/css/index.css', cssGeneral);
contactoRoutes.get('/js/carrito.js', carritoJS);
contactoRoutes.get('/js/menu.js', menuJS);

module.exports = {

    contactoRoutes

};
