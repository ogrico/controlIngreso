//Importat modulos 
var mysql = require('mysql')

//conexión a la base de datos

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qwaszx12*',
    database: 'covid19',
    multipleStatements: true
})

mysqlConnection.connect(function (err) {
    if (err) {
        console.error("Conexión fallida error: " + err)
        return
    } else {
        console.log('Conexión establecida')
    }
})

// Comando de mysql para actualizar la autenticación del usuario
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

module.exports = mysqlConnection