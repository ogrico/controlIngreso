'use strict'

var express = require('express')
var controlador = require('../controladores/controlador')

var ruta = express.Router()

ruta.get('/test', controlador.test)
ruta.get('/listarRegistrosUnicos', controlador.listarRegistrosUnicos)
ruta.get('/listarRegostrosDiarios', controlador.listarRegistrosDiarios)
ruta.get('/ocupacionSedes', controlador.consultarOcupacionSede)
ruta.get('/ingresosTotal', controlador.consultarIngresosTotales)
ruta.get('/ingresosDia', controlador.listarRegistrosDiarios)
ruta.post('/registroUnico', controlador.registroUnico)
ruta.post('/registroDiario', controlador.registrodiario)
ruta.post('/consultarRegistro', controlador.consultarRegistro)
ruta.post('/actualizarOcupacion', controlador.actualizarOcupacion)
ruta.post('/registrarIngreso', controlador.registroIngreso)
ruta.post('/registrarSalida', controlador.registroSalida)

module.exports = ruta