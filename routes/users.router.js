const express = require('express');
// Traemos nuestro esquema de mongoose para usarlo en las users.routes
const userSchema = require('../models/user.js');
// Como no instanciaremos la app, tomamos de express un router
const router = express.Router();

// Usamos este bloque de codigo para tomar limit y offset desde la query de la request
// Si limit y offset estan definidos en la request los mostrará como json con los valores
// en caso contrario ejecuta el else
router.get('/', (req, res) => {
    const { limit, offset } = req.query;
    if (limit && offset){
      res.json({
        limit,
        offset
      });
    } else {
      res.send('No hay parametros')
    }
});

// exportamos el router para poder usarlo en otras partes de la api
module.exports = router;