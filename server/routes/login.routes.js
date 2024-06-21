const { Router } = require('express');
const loginRoutes = Router();
const {loginHTML, loginJS, logIn} = require('../controllers/login.controller');
const {userLoginReg, adminPass} = require('../middlewares/authentication')

//GET de Archivos Estaticos

loginRoutes.get('/login', userLoginReg, adminPass, loginHTML);
loginRoutes.get('/js/login.js', loginJS)

//POST

loginRoutes.post('/login_user', logIn)

module.exports = {

    loginRoutes

};
