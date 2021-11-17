// Importamos express para luego usar su constructor de app
const express = require('express');
// Importamos faker para usar informacion de prueba en nuestro project
const faker = require('faker');
const app = express();
const port = 3000;

// Cuando se solicite la ruta / con el verbo GET, este recibe
// la solicitud y la respuesta como parametros y con send envia la respuesta
// Es parecido al decorador @app.route en Flask
app.get('/', (req, res) => {
  res.send('El server funciona con express.js');
});

// Usamos las queries para obtener la cantidad de informacion que queremos visualizar
app.get('/matches', (req, res) => {
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

// Tambien podemos enviar archivos json
app.get('/data', (req, res) => {
  res.json([
    {
      id_partido : 1,
      equipo1 : 'brasil',
      equipo2 : 'colombia',
    },
    {
      id_partido : 2,
      equipo1 : 'ecuador',
      equipo2 : 'españa',
    }]);
});

// Mandamiento
//Los endpoints especificos deben declararse antes de los endpoints dinamicos.

app.get('/matches/filter', (req, res) => {
  res.send('La url filter funciona');
});

// Recuerda que tenemos creado un route que toma el parametro id  luego de la ruta matches
// Si agregamos los endpoints especificos despues de los dinamicos, la url no funcionará


// desde la request podemos extraer parametros y usando destructuracion ECMAScript
// tomamos el id para usarlo en nuestra response
app.get('/matches/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    id_partido : 2,
    equipo1 : 'ecuador',
    equipo2 : 'españa',
  });
});

app.get('/users', (req, res) => {
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

// Tambien podemos crear urls mas complejas con los id que queramos
app.get('/matches/:matchId/bets/:betId', (req, res) => {
  const { matchId, betId } = req.params;
  res.json({
    matchId,
    betId,
  });
});


// Autorizamos a la app a comunicarse por el puerto que definimos antes
app.listen(port, () => {
  console.log('Servidor corriendo en el puerto: ' + port);
});

