
const mongoose = require("mongoose")

// El esquema para los estudiantes
let studentSchema = new mongoose.Schema({
  // VALIDADORES DE BASE DE DATOS
  name: {
    type: String,
    required: true, // este campo será obligatorio
    unique: true // este campo no puede estar duplicado en otro documento
  },
  candy: {
    type: Number,
    default: 100 // esto da un valor predeterminado de 100 en caso que no sea definido al crear el estudiante
  },
  likesPokemon: {
    type: Boolean
  },
  pizzaToppings: [{
    type: String,
    enum: ["piña", "jamon", "anchoas", "pepperoni"]
  }]
})

// El modelo para los estudiantes
let StudentModel = mongoose.model("Student", studentSchema)
//                                    |           |
//                          nombre del modelo,   el esquema

module.exports = StudentModel // exportamos el modelo para usarlo para acceder a la colection de estudiantes (DB)