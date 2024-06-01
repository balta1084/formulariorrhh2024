const { Router } = require('express');
const registroRoutes = Router();
const {registroHTML} = require('../controllers/registro.controller');

//GET de Archivos Estaticos

registroRoutes.get('/registrarse', registroHTML);

module.exports = {

    registroRoutes

};
