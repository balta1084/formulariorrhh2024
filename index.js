const {app} = require('./server/app');
const {pool} = require('./server/config/db')


app.listen(app.get('port'))

console.log(`Server on port ${app.get('port')}`)

/* FUNCION DE PRUEBA PARA AÑADIR REGISTROS

function prueba() {
    const nombre = 'jorge';
    const apellido = 'vidal';
    const dni = 365855;
    const mail = 'jorge.vidal@cico.com';
    const password = '1234562c';

    const query = 'INSERT INTO Usuarios (nombre, apellido, dni, mail, password) VALUES (?, ?, ?, ?, ?)';

    pool.query(query, [nombre, apellido, dni, mail, password], (error, result) => {
        if (error) {
            console.error('No se pudo insertar', error);
            return;
        }
        console.log('INSERTADO CORRECTAMENTE');
    });
}

prueba()

*/ 