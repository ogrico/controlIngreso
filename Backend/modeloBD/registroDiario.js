'use strict'

class IngreDiario {

    constructor(idRegistro, fechaIngreso, temperatura, pregunta1, pregunta2, pregunta3, pregunta4, autorización, sede, cedulaUsuario) {
       
        this.idRegistro = idRegistro;
        this.fechaIngreso = fechaIngreso;
        this.temperatura = temperatura;
        this.pregunta1 = pregunta1;
        this.pregunta2 = pregunta2;
        this.pregunta3 = pregunta3;
        this.pregunta4 = pregunta4;
        this.autorización = autorización;
        this.sede = sede;
        this.cedulaUsuario = cedulaUsuario;

    }
}

module.exports = IngreDiario