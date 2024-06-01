const { Router } = require('express');
const loginRoutes = Router();
const {loginHTML} = require('../controllers/login.controller');

//GET de Archivos Estaticos

loginRoutes.get('/login', loginHTML);

module.exports = {

    loginRoutes

};
