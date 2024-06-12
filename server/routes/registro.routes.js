const { Router } = require('express');
const registroRoutes = Router();
const {registroHTML, registroJS, registrar} = require('../controllers/registro.controller');
const {userLoginReg} = require('../middlewares/authentication');

//GET de Archivos Estaticos

registroRoutes.get('/registrarse',userLoginReg, registroHTML);
registroRoutes.get('/js/registro.js', registroJS);

//POST

registroRoutes.post('/registrar_user', registrar);

module.exports = {

    registroRoutes

};
