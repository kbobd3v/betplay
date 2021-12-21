const express = require('express');
const { registerUser, authUser } = require('../controllers/user.controller')
// Traemos nuestro esquema de mongoose para usarlo en las users.routes
const User = require('../models/user');
// Como no instanciaremos la app, tomamos de express un router
const router = express.Router();
const cors = require('cors');
router.use(cors());

//crear user

router.route("/register").post(registerUser);

router.route("/login").post(authUser);

// router.post("/", (req, res) => {
//   const user = User(req.body);

//   user
//   .save()
//   .then((data) => res.json(data))
//   .catch((error) =>  res.json({ message: error }))
// });

//listar todos
router.get("/", (req, res) => {
  User
  .find()
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error }))
});

// obtener un usuario
router.get("/:id", (req, res) => {
  const { id } = req.params;

  User
  .findById(id)
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error }))
});

// actualizar un usuario
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;

  User
  .updateOne( {_id: id},  { $set: { name, age, email }})
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error }))
});


//eliminar un usuario
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  User
  .remove({ _id: id })
  .then((data) => res.json(data))
  .catch((error) =>  res.json({ message: error }))
});


// Usamos este bloque de codigo para tomar limit y offset desde la query de la request
// Si limit y offset estan definidos en la request los mostrará como json con los valores
// en caso contrario ejecuta el else
// puedes ingresar a verificar este metodo en el link http://localhost:8090/api/v1/users?limit=1&offset=2
// router.get('/', (req, res) => {
//   // Se toman el limit y el offset usando deconstruccion ecmascript desde la query de la request
//     const { limit, offset } = req.query;
//     // si limit y offset son true, los imprime jsonificados
//     if (limit && offset){
//       res.json({
//         limit,
//         offset
//       });
//       // Si no son true pues...
//     } else {
//       res.send('No hay parametros')
//     }
// });

// exportamos el router para poder usarlo en otras partes de la api
module.exports = router;