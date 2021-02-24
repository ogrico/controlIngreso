var bodyParser = require('body-parser')
var express = require('express')

var app = express()

app.use(bodyParser.urlencoded({
    extended:false
}))

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
    next()
})

//Archivos de rutas
var rutas_api = require('./rutas/ruta')

//Rutas
app.use('/api', rutas_api)

module.exports = app


