const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path')
dotenv.config();

// Importacion de Routes
const {indexRoutes} = require('./routes/index.routes');
const {menuRoutes} = require('./routes/menu.routes');
const {promocionesRoutes} = require('./routes/promociones.routes');
const {contactoRoutes} = require('./routes/contacto.routes');
const {loginRoutes} = require('./routes/login.routes');
const {registroRoutes} = require('./routes/registro.routes');
const {verificarIdentidadRoutes} = require('./routes/verificar_identidad.routes');
const {adminRoutes} = require('./routes/admin.routes');

app.set('port', process.env.PORT || 3000);

//Configurando los cors

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../public/assets/uploads')))

app.use(cookieParser());


// Usando los routes en la app
app.use(verificarIdentidadRoutes);
app.use(indexRoutes);
app.use(menuRoutes);
app.use(promocionesRoutes);
app.use(contactoRoutes);
app.use(loginRoutes);
app.use(registroRoutes);
app.use(adminRoutes);

module.exports = {

    app

};