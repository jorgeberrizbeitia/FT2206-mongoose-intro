// 1. crear nuestro schema y modelo :)

// 2. Establecer una coneccion con mi BD Mongo
const mongoose = require("mongoose");
const StudentModel = require("./models/student.model.js");
const allStudents = require("./data/students.json"); // los .json se exportan automaticamente

mongoose
  .connect("mongodb://localhost:27017/students-db")
  //                                              |
  //                                    el nombre que tendrá la DB
  .then((response) => {
    console.log("YAY! conectados a la BD");

    return StudentModel.deleteMany(); // borrar la collection (Entorno de prueba)
  })
  .then((response) => {
    console.log("La collection ha sido borrada correctamente");

    // METODOS DE CREATE
    // agregamos un nuevo documento => .create
    return StudentModel.create({
      name: "Malva",
      likesPokemon: true,
      pizzaToppings: ["piña", "jamon", "pepperoni"],
    });
  })
  .then((response) => {
    console.log("Malva ha sido agregada a la BD");

    // .insertMany
    return StudentModel.insertMany(allStudents);
  })
  .then((response) => {
    console.log("Agregados todos los estudiantes", response.length);

    // METODOS DE READ
    // return StudentModel.find() // busca todos los elementos de la colección
    // return StudentModel.find({likesPokemon: true})
    // return StudentModel
    //   .find({ candy: { $gte: 3000 } })
    //   .select({ name: 1, candy: 1 })
    //   .sort({ candy: -1 });
    // .select, .sort, .skip, .limit
    // .select({name: 1, candy: 1}) => .select("name candy")

    // findOne => busca el primero que concuerde con la busqueda y damelo de regreso
    return StudentModel.findOne({pizzaToppings: {$in: "piña"}})
  })
  .then((response) => {
    console.log(response);

    // METODOS DE UPDATE
    // requires dos argumentos
    // 1. el query o la condicion
    // 2. la modificacion que queremos hacer
    // return StudentModel.findOneAndUpdate({name: "Miguel"}, {likesPokemon: true})
    return StudentModel.findOneAndUpdate({name: "Pablo"}, {$push: {pizzaToppings: "piña"}}, {new: true})
    // $push para agregar a un array
    // $pull para remover de un array
    // {new: true} se asegura que la respues va a ser la informacion actualizada
  })
  .then((response) => {
    console.log(response) // la informacion desactualizada de forma predeterminada
    // {new: true} se asegura que la respues va a ser la informacion actualizada
    // console.log("Miguel ha sido actualizado")
    console.log("Ahora a Pablo le gusta la pizza con piña")

    // METODOS DE BORRAR
    return StudentModel.findOneAndDelete({name: "Paula"})
  })
  .then((response) => {
    console.log("Elemento borrado")
  })
  .catch((err) => {
    console.log(err);
  });

// 3. divertirnos haciendo cambios en la BD
