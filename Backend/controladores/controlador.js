'use strict'

var mysqlConnection = require('../modeloBD/db')

var controlador = {

    test: function (req, res) {

        //Respuesta de la petición
        return res.status(200).send({
            status: "Servicios Arriba"
        })

    },

    listarRegistrosUnicos: function (req, res) {

        let sql = "select * from registroUnico"
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err
            console.log(result)
            return res.status(200).send({
                registros: result
            })
        })
        return ({
            status: "Error en la consulta"
        })

    },

    listarRegistrosDiarios: function (req, res) {

        let sql = "select * from registroDiario"
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err
            console.log(result)
            return res.status(200).send({
                registros: result
            })
        })
        return ({
            status: "Error en la consulta"
        })

    },

    consultarOcupacionSede: function (req, res) {
        let sql = "select * from OcupacionSede"
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err
            return res.status(200).send({
                data: result
            })
        })
    },

    consultarRegistro: function (req, res) {

        let params = req.body
        let sql = "select * from registroUnico where cedulaUsuario = '" + params.documento + "' "
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err
            console.log(result)
            return res.status(200).send({
                data: result
            })
        })
        return ({
            status: "Error en la consulta"
        })

    },

    registroUnico: function (req, res) {

        let params = req.body
        let sql = 'insert into registroUnico values (' + params.cedula + ', "' + params.nombre + '", "' + params.correo + '", "' + params.telefono1 + '", "' + params.telefono2 + '", "' + params.edad + '", "' + params.tipoDocumento + '", "' + params.eps + '", "")'
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err
            console.log(result)
            return res.status(200).send({
                response: result.affectedRows
            })
        })

    },

    registrodiario: function (req, res) {

        let params = req.body
        let sql = 'insert into registroDiario values (default, sysdate(), "' + params.temperatura + '", "' + params.pregunta1 + '", "' + params.pregunta2 + '", "' + params.pregunta3 + '", "' + params.pregunta4 + '", "' + params.estado + '", "' + params.cedula + '")'
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err
            console.log(result)
            return res.status(200).send({
                response: result.affectedRows
            })
        })

    },

    actualizarOcupacion: function (req, res) {

        let params = req.body        
        let sql2 = "select * from OcupacionSede where idSede = "+params.idSede+""
        mysqlConnection.query(sql2, function (err, result) {
            if (err) throw err
            let valorNuevo = result[0].ocupacionReal + params.registro
            let sql = "update OcupacionSede set ocupacionreal = " + valorNuevo + " where idsede = " + params.idSede + ""          
            mysqlConnection.query(sql, function (er, response) {
                if (er) throw er
                return res.status(200).send({
                    data: "Ocupacion actualizada"
                })
            })
            
        })

    },

    registroIngreso: function (req, res) {

        let params = req.body
        let sql = "insert into ingresos values (default, '', 1, " + params.cedula + ", sysdate(), sysdate(), null, null)"
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err
            return res.status(200).send({
                data: result
            })
        })
    },

    registroSalida: function (req, res) {

        let params = req.body
        let sql = "select idingresos from ingresos where fechaIngreso = CURDATE() and registroUnico_CedulaUsuario = " + params.cedula + ""
        mysqlConnection.query(sql, function (err, result) {

            if (err) throw err
            if (result.length > 0) {

                let update = "update ingresos set horaSalida = curTime(), fechaSalida = curdate() where idingresos = " + result[0].idingresos + ""
                mysqlConnection.query(update, function (er, response) {
                    if (er) throw er
                    return res.status(200).send({
                        data: response
                    })
                })
            } else {
                return res.status(201).send({                    
                    data: "No se registro la salida"
                })
            }

        })
    },

    consultarIngresosTotales: function (req, res) {

        let sql = "select * from ingresos"
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err
            return res.status(200).send({
                data : result
            })
        })

    },

    consultarIngresosDelDia: function (req, res) {

        let sql = "select * from ingresos where fechaIngreso = CURDATE()"
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err
            return res.status(200).send({
                data : result
            })
        })
    }

}

module.exports = controlador