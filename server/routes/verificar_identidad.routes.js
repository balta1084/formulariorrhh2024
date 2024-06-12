const { Router } = require('express');
const verificarIdentidadRoutes = Router();
const {verificar} = require('../controllers/general.controller');
const {verificarJS} = require('../controllers/general.controller')

//POST

verificarIdentidadRoutes.post('/verificar_user', verificar);
verificarIdentidadRoutes.get('/js/verificar.js', verificarJS)

module.exports = {

    verificarIdentidadRoutes

};
