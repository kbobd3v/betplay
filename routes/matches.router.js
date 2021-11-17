// Importamos express para luego usar su constructor de app
const express = require('express');
// Importamos faker para usar informacion de prueba en nuestro project
const faker = require('faker');

// Esta vez no instanciaremos la app
// generamos un router especifico para matches
// con esto seguimos el principio de Single Responsability
const router = express.Router();

// Usamos las queries para obtener la cantidad de informacion que queremos visualizar
router.get('/', (req, res) => {
    // Creamos un array vacio
    const matches = [];
    // Usamos destructuracion ECMAScript tomar los parametros de la query
    const { size } = req.query;
    // Si el parametro size no tiene ningun valor entonces limit tendra 10 por defecto
    const limit = size || 10;
    // Iteramos para agregar la info de prueba de los partidos al arreglo matches
    for (let index = 0; index < limit; index++){
      // el metodo push agrega lo que deseemos al arreglo que llama el metodo
      matches.push({
        // name, price e image son metodos que traen informacion de prueba de faker
        name: faker.commerce.productName(),
        // el metodo parseInt puede usarse con 2 parametros
        // El primero es la info a parsear y el 2do es la base del integer
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
    // retornamos el json despues de agregar toda la info
    res.json(matches);
  });

// Mandamiento
//Los endpoints especificos deben declararse antes de los endpoints dinamicos.

router.get('/filter', (req, res) => {
    res.send('La url filter funciona');
  });
  
// Recuerda que tenemos creado un route que toma el parametro id  luego de la ruta matches
// Si agregamos los endpoints especificos despues de los dinamicos, la url no funcionará
  
  
// desde la request podemos extraer parametros y usando destructuracion ECMAScript
// tomamos el id para usarlo en nuestra response
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
      id,
      id_partido : 2,
      equipo1 : 'ecuador',
      equipo2 : 'españa',
    });
});
  
 // Tambien podemos crear urls mas complejas con los id que queramos
router.get('/:matchId/bets/:betId', (req, res) => {
    const { matchId, betId } = req.params;
    res.json({
      matchId,
      betId,
    });
});

// Exportamos el router como un solo modulo
module.exports = router;