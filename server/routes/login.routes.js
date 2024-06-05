const { Router } = require('express');
const loginRoutes = Router();
const {loginHTML, loginJS, logIn} = require('../controllers/login.controller');

//GET de Archivos Estaticos

loginRoutes.get('/login', loginHTML);
loginRoutes.get('/js/login.js', loginJS)

//POST

loginRoutes.post('/login_user', logIn)

module.exports = {

    loginRoutes

};
