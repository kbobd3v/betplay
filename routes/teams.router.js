// Importamos express para luego usar su constructor de app
const express = require('express')
, cors = require('cors');
const collection = require('../models/team');

// Esta vez no instanciaremos la app
// generamos un router especifico para matches
// con esto seguimos el principio de Single Responsability
const router = express.Router();


// Usamos las queries para obtener la cantidad de informacion que queremos visualizar
router.get('/', async (req, res) => {
    // llenamos esta variable con la informacion de los partidos
    const teams = await collection.find();
    // Enviamos como respuesta los partidos en formato json
    res.json(teams);
      });

module.exports = router;