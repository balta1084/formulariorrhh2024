const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Importacion de Routes
const {indexRoutes} = require('./routes/index.routes');
const {menuRoutes} = require('./routes/menu.routes');
const {promocionesRoutes} = require('./routes/promociones.routes');
const {contactoRoutes} = require('./routes/contacto.routes');
const {loginRoutes} = require('./routes/login.routes');
const {registroRoutes} = require('./routes/registro.routes');


app.set('port', process.env.PORT || 3000);

// Usando los routes en la app
app.use(indexRoutes);
app.use(menuRoutes);
app.use(promocionesRoutes);
app.use(contactoRoutes);
app.use(loginRoutes);
app.use(registroRoutes);

module.exports = {

    app

};