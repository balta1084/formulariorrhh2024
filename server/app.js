const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser')
dotenv.config();

// Importacion de Routes
const {indexRoutes} = require('./routes/index.routes');
const {menuRoutes} = require('./routes/menu.routes');
const {promocionesRoutes} = require('./routes/promociones.routes');
const {contactoRoutes} = require('./routes/contacto.routes');
const {loginRoutes} = require('./routes/login.routes');
const {registroRoutes} = require('./routes/registro.routes');

app.set('port', process.env.PORT || 3000);

//Configurando los cors

app.use(cors());
app.use(express.json());
app.use(cookieParser())

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