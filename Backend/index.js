'use strict'

//importaición de modulos del archivo package.json
var app = require('./app')


//Se inicializa como una promesa global
//Se asigan el puerto 3700, este es opcional
app.set('port', process.env.PORT || 4200)

//Inicialización del servidor
app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto: ' + app.get('port'))
})