'use strict'

class Horarios {

    constructor(idHorario, grupo, nombreMateria, dia, hora, sede, docente, nombreEstudiante, documentoEstudiante) {
       
        this.idHorario = idHorario;
        this.grupo = grupo;
        this.nombreEstudiante = nombreMateria;
        this.dia = dia;
        this.hora = hora;
        this.sede = sede;
        this.docente = docente;
        this.nombreEstudiante = nombreEstudiante;
        this.documentoEstudiante = documentoEstudiante;

    }
}

module.exports = Horarios