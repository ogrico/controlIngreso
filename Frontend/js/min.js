$(document).ready(function () {

    console.log("ready")

    $("#form-salud").css("display", "none")
    $("#documentoVacio").css("display", "none")
    $("#pregunta2").css("display", "none")
    $("#registroPersonal").css("display", "none")

    $('#form-documento').on('keyup keypress', function (e) {
        var keyCode = e.keyCode || e.which
        if (keyCode === 13) {
            e.preventDefault()
            let numero = document.getElementById("numeroDocumento").value

            if (numero) {
                //La campo número tiene información          
                validarRegistroUnico(numero)
            } else {
                //El campo numero esta vacio
                $("#documentoVacio").css("display", "block")
                $("#mensajeDocumento").css("display", "block")
                $("#form-salud").css("display", "none")
            }
            return false

        }

    })

    $("#numeroDocumento").change(function () {

        let numero = document.getElementById("numeroDocumento").value

        if (numero) {
            //El campo número tiene información          
            validarRegistroUnico(numero)
        } else {
            //El campo numero esta vacio
            $("#documentoVacio").css("display", "block")
            $("#mensajeDocumento").css("display", "block")
            $("#form-salud").css("display", "none")
            $("#registroPersonal").css("display", "none")
            document.getElementById("form").reset()
        }

    })

    function estilos() {

        $("#pregunta2").css("display", "none")
        $("#form-salud").css("display", "none")

    }

    function camposModal(title, body) {

        document.getElementById("validacionCamposModalLabel").innerHTML = title
        document.getElementById("modalBodyCampos").innerHTML = body
        $('#validacionCamposModal').modal('show')
    }

    $("#respuestaPregunta1").change(function () {

        //Variable para almacenar el valor del campo
        var pregunta1 = document.getElementById("respuestaPregunta1").value

        //Controlador para validar las opciones escogidas
        switch (pregunta1) {

            case "si":
                $("#pregunta2").css("display", "none")
                break
            case "no":
                $("#pregunta2").css("display", "block")
                break
            default:
                $("#pregunta2").css("display", "none")
                break
        }

    })

    function nuevoRegistroUnco(numero, nombre, correo, telefono1, telefono2, edad, tipoDocumento, eps) {

        let dataArray = {
            "cedula": numero,
            "nombre": nombre,
            "correo": correo,
            "telefono1": telefono1,
            "telefono2": telefono2,
            "edad": edad,
            "tipoDocumento": tipoDocumento,
            "eps": eps
        }

        let data = JSON.stringify(dataArray)

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://190.145.86.118:3700/api/registroUnico",
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "processData": false,
            "data": data
        }

        $.ajax(settings).done(function (response) {
            if (response.response == 1) {

                $('#registroDatosModal').modal('show')
                document.getElementById("form").reset()
                $("#registroPersonal").css("display", "none")
                $("#form-salud").css("display", "block")

            } else {

                camposModal("No se pudo registrar", "Por favor intentarlo nuevamnete")

            }
        })

    }

    function nuevoRegistroDiario(temperatura, pregunta1, pregunta2, estado, numeroDocumento, sede) {

        switch (estado) {
            case 0:
                estado = "Rezhazado"
                break
            case 1:
                estado = "Autorizado"
                break
        }

        let dataArray = {
            "temperatura": temperatura,
            "pregunta1": pregunta1,
            "pregunta2": pregunta2,
            "pregunta3": "",
            "pregunta4": "",
            "estado": estado,
            "sede": sede,
            "cedula": numeroDocumento
        }

        let data = JSON.stringify(dataArray);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://190.145.86.118:3700/api/registrodiario",
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "processData": false,
            "data": data
        }

        $.ajax(settings).done(function (response) {
        })

    }

    function nuevoRegistroDiarioSharePoint(numero, temperatura, pregunta1, pregunta2, estado, modalidad, sede) {

        switch (estado) {
            case 0:
                estado = "Rezhazado"
                break
            case 1:
                estado = "Autorizado"
                break
        }

        //Variable con los valores para la petición HTTP para consultar el registro unico
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://190.145.86.118:3700/api/consultarRegistro",
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{\n\t\"documento\" : \"" + numero + "\"\n}"
        }

        $.ajax(settings).done(function (response) {

            if (response.data.length == 1) {

                var registroSharePoint = {
                    "url": "https://prod-10.westus.logic.azure.com:443/workflows/243c3bdc0a5f41d180f2f825b1610838/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VFIxpWEgDK5RNB-ENzU0_kEKRJZ4A8JvNBks0lJr8Ms",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({ "nombre": "" + response.data[0].nombre + "", "numeroDocumento": "" + numero + "", "cargo": "" + response.data[0].cargo + "", "modalidad": "" + modalidad + "", "temperatura": "" + temperatura + "", "pregunta1": "" + pregunta1 + "", "pregunta2": "" + pregunta2 + "", "estado": "" + estado + "", "sede": "" + sede + "" }),
                }

                $.ajax(registroSharePoint).done(function (response) {
                    //console.log(response)
                })

            }
        })



    }

    function validarRegistroUnico(numero) {

        //Variable con los valores para la petición HTTP para consultar el registro unico
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://190.145.86.118:3700/api/consultarRegistro",
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{\n\t\"documento\" : \"" + numero + "\"\n}"
        }

        $.ajax(settings).done(function (response) {

            if (response.data.length == 1) {

                $("#form-salud").css("display", "block")
                $("#mensajeDocumento").css("display", "none")
                $("#documentoVacio").css("display", "none")
                $("#registroPersonal").css("display", "none")
                document.getElementById("form").reset()

            } else {
                $("#mensajeDocumento").css("display", "none")
                $("#documentoVacio").css("display", "none")
                camposModal("Documento No Registrado", "Por favor complete los datos personales para el registro")
                document.getElementById("form").reset()
                $("#form-salud").css("display", "none")
                $("#registroPersonal").css("display", "block")
            }
        })

    }

    function enviarCorreo(numero, temperatura, estado) {

        const fecha = new Date()

        //Variable con los valores para la petición HTTP para consultar el registro unico
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://190.145.86.118:3700/api/consultarRegistro",
            "method": "POST",
            "headers": {
                "content-type": "application/json"
            },
            "processData": false,
            "data": "{\n\t\"documento\" : \"" + numero + "\"\n}"
        }

        $.ajax(settings).done(function (response) {

            let correo = response.data[0].correo

            if (estado == 1) {

                let pasaporte = {
                    "url": "https://prod-91.westus.logic.azure.com:443/workflows/7009c48e77be46079c090fa29e1298a3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Oq1uqLkVV3lx2BUqxjUU81l0tPo3KnVnzvcb_xlK5Co",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "cedula": 1024594365, "nombre": "Oscar Geovany Rico", "correo": "ogricoh@ucompensar.edu.co",
                        "telefono": "3133183111", "edad": "22", "tipoDocumento": "Cedula", "eps": "Compensar", "cargo": "Desarrollador de aplicaciones e integraciones",
                        "fecha": "" + fecha.getDate() + "-" + "02" + "-" + fecha.getFullYear() + "", "estado": "Autorizado"
                    }),
                }

                $.ajax(pasaporte).done(function (response) {
                    console.log(response)
                })

                camposModal("Datos enviados correctamnete", "El procedimiento para consultar el pasaporte de ingreso fue enviado al correo  : " + correo + " " +
                    "o ingrese al sigueinte enlace : ")


            } else if (estado == 0) {

                let pasaporte = {
                    "url": "https://prod-91.westus.logic.azure.com:443/workflows/7009c48e77be46079c090fa29e1298a3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Oq1uqLkVV3lx2BUqxjUU81l0tPo3KnVnzvcb_xlK5Co",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "cedula": 1024594365, "nombre": "Oscar Geovany Rico", "correo": "ogricoh@ucompensar.edu.co",
                        "telefono": "3133183111", "edad": "22", "tipoDocumento": "Cedula", "eps": "Compensar", "cargo": "Desarrollador de aplicaciones e integraciones",
                        "fecha": "" + fecha.getDate() + "-" + "02" + "-" + fecha.getFullYear() + "", "estado": "Autorizado"
                    }),
                }

                $.ajax(pasaporte).done(function (response) {
                    console.log(response)
                })

                camposModal("Datos enviados correctamnete", "El procedimiento para consultar el pasaporte de ingreso fue enviado al correo  : " + correo + " " +
                    "o ingrese al sigueinte enlace : ")
            }

        })

    }

    function validacionDatos() {

        let numero = document.getElementById("numeroDocumento").value
        let nombre = document.getElementById("nombre").value
        let telefono1 = document.getElementById("telefono1").value
        let telefono2 = document.getElementById("telefono2").value
        let correo = document.getElementById("correo").value
        let edad = document.getElementById("edad").value
        let tipoDocumento = document.getElementById("tipoDocumento").value
        var eps = document.getElementById("eps").value

        if (numero) {

            if (nombre) {

                if (telefono1) {

                    if (telefono2) {

                        if (correo) {

                            if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(correo)) {

                                if (edad) {

                                    if (tipoDocumento == 0) {

                                        camposModal("Tipo Docuemnto Vacío", "Ingrese su tipo de documento para continuar")

                                    } else {
                                        if (eps == 0) {

                                            camposModal("Eps Vacía", "Ingrese su eps para continuar")
                                        } else {

                                            nuevoRegistroUnco(numero, nombre, correo, telefono1, telefono2, edad, tipoDocumento, eps)

                                        }
                                    }

                                } else {
                                    camposModal("Edad Vacía", "Ingrese su edad para continuar")
                                }

                            } else {
                                camposModal("Correo No Valido", "Ingrese un direción de correo real para continuar")
                            }

                        } else {
                            camposModal("Correo vacío", "Ingrese un direción de correo para continuar")
                        }

                    } else {
                        camposModal("Telefono 2 Vacío", "Ingrese un número de contacto para continuar")
                    }

                } else {
                    camposModal("Telefono 1 Vacío", "Ingrese un número de contacto para continuar")
                }

            } else {
                camposModal("Nombre Vacío", "Ingrese su nombre para continuar")
            }
        } else {
            camposModal("Número Docuemnto Vacío", "Ingrese su número de documento para continuar")
        }



    }

    function validacionSalud() {

        let numero = document.getElementById("numeroDocumento").value
        let temperatura = document.getElementById("temperatura").value
        let modalidad = document.getElementById("modalidad").value
        let sede = document.getElementById("sede").value
        let pregunta1 = document.getElementById("respuestaPregunta1").value
        let pregunta2 = document.getElementById("respuestaPregunta2").value
        var terminos = document.getElementById("terminos").checked
        let estado = 0

        if (modalidad == 0) {

            camposModal("Modalidad Vacía", "Ingrese la modalidad desde donde va a trabajar para continuar")

        } else {

            if (temperatura) {

                if (temperatura >= 37.6) {

                    camposModal("Ingreso Rechazado", "Por favor contactar a un centro de salud")
                    estado = 0
                    enviarCorreo(numero, temperatura, estado)
                    nuevoRegistroDiario(temperatura, pregunta1, pregunta2, estado, numero, sede)
                    nuevoRegistroDiarioSharePoint(numero, temperatura, pregunta1, pregunta2, estado, modalidad, sede)
                    document.getElementById("form").reset()
                    document.getElementById("form-documento").reset()
                    estilos()

                } else if (temperatura < 37.5) {

                    if (pregunta1 == 0) {

                        camposModal("Pregunta 1 Sin Responder", "Por responda la pregunta para continuar")


                    } else if (pregunta1 == "si") {

                        estado = 0
                        enviarCorreo(numero, temperatura, estado)
                        nuevoRegistroDiario(temperatura, pregunta1, pregunta2, estado, numero, sede)
                        nuevoRegistroDiarioSharePoint(numero, temperatura, pregunta1, pregunta2, estado, modalidad, sede)
                        //camposModal("Datos Enviados Correctamente", "La autorización de ingreso fue enviada a su correo.")
                        document.getElementById("form").reset()
                        document.getElementById("form-documento").reset()
                        estilos()

                    } else {

                        if (pregunta2 == 0) {

                            camposModal("Pregunta 2 Sin Responder", "Por responda la pregunta para continuar")

                        } else {

                            if (pregunta2 == "si") {

                                estado = 0
                                enviarCorreo(numero, temperatura, estado)
                                nuevoRegistroDiario(temperatura, pregunta1, pregunta2, estado, numero, sede)
                                nuevoRegistroDiarioSharePoint(numero, temperatura, pregunta1, pregunta2, estado, modalidad, sede)
                                //camposModal("Datos Enviados Correctamente", "La autorización de ingreso fue enviada a su correo.")
                                document.getElementById("form").reset()
                                document.getElementById("form-documento").reset()
                                estilos()

                            } else {

                                if (terminos) {

                                    estado = 1
                                    enviarCorreo(numero, temperatura, estado)
                                    nuevoRegistroDiario(temperatura, pregunta1, pregunta2, estado, numero, sede)
                                    nuevoRegistroDiarioSharePoint(numero, temperatura, pregunta1, pregunta2, estado, modalidad, sede)
                                    //camposModal("Datos Enviados Correctamente", "La autorización de ingreso fue enviada a su correo.")
                                    document.getElementById("form").reset()
                                    document.getElementById("form-documento").reset()
                                    estilos()

                                } else {

                                    camposModal("Terminos Y Condiciones No Aceptados", "Por favor acepte los termino y condiciones para continuar")

                                }

                            }
                        }
                    }

                }

            } else {

                alert("El valor de la temperatura no es valido")
            }
        }

    }

    $("#btn-datos").click(function (event) {

        event.preventDefault()
        validacionDatos()

    })

    $("#btn").click(function (event) {

        event.preventDefault()
        validacionSalud()

    })

})