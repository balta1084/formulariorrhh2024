const { Router } = require('express');
const registroRoutes = Router();
const {registroHTML, registroJS, registrar} = require('../controllers/registro.controller');

//GET de Archivos Estaticos

registroRoutes.get('/registrarse', registroHTML);
registroRoutes.get('/js/registro.js', registroJS);

//POST

registroRoutes.post('/registrar_user', registrar);

module.exports = {

    registroRoutes

};
