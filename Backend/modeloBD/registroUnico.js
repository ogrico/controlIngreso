'use strict'

class IngresoUnico {

    constructor(cedula, nombre, correo, telefono, edad, tipoDocumento, numeroDocumento, eps) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.edad = edad;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.eps = eps;
    }
    
}

module.exports = IngresoUnico