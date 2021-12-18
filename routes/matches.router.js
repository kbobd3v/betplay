// Importamos express para luego usar su constructor de app
const express = require('express')
, cors = require('cors');
// Importamos la clase MatchesService desde servicios para usarla en nuestras rutas
const MatchesService = require('./../services/match.service');

// Esta vez no instanciaremos la app
// generamos un router especifico para matches
// con esto seguimos el principio de Single Responsability
const router = express.Router();

router.use(cors());
// Como esta importada la clase MatchesService podemos instanciarla para usarla en las rutas
const service = new MatchesService();

// Usamos las queries para obtener la cantidad de informacion que queremos visualizar
router.get('/', async (req, res) => {
    // llenamos esta variable con la informacion de los partidos
    const matches = await service.find();
    // Enviamos como respuesta los partidos en formato json
    res.json(matches);
      });

// Mandamiento
//Los endpoints especificos deben declararse antes de los endpoints dinamicos.

router.get('/filter', (req, res) => {
    res.send('La url filter funciona');
  });

// Recuerda que tenemos creado un route que toma el parametro id  luego de la ruta matches
// Si agregamos los endpoints especificos despues de los dinamicos, la url no funcionará


// desde la request podemos extraer parametros (Los parametros se agregan en la url)
// y usando destructuracion ECMAScript
// tomamos el id para usarlo en nuestra response
router.get('/:id', async (req, res, next) => {
  try {
    // El id es extraido de los parametros de la solicitud
    const { id } = req.params;
    // Como tenemos instanciado el servicio MatchesServices
    // Usamos su metodo para traer el partido con el id de la solicitud
    const match = await service.findOne(id);
    // Y lo enviamos en la respuesta en formato JSON
    res.json(match);
    // si se lanza un error, se lo enviamos al siguiente middleware
    } catch (error) {
      next(error);
    }
  });

 // Tambien podemos crear urls mas complejas con los id que queramos
router.get('/:matchId/bets/:betId', (req, res) => {
    const { matchId, betId } = req.params;
    res.json({
      matchId,
      betId,
    });
});

// En el metodo post, para crear partidos, recibe los mismos parametros que get
router.post('/', async (req, res) => {
  // Toma el contenido de la solicitud, el body
  const body = req.body;
  // Creamos una variable que instancia el metodo create desde el servicio, con el body de la solicitud post como parametro
  const newMatch = await service.create(body);
  // Y la enviamos como json en la respuesta con un mensaje exitoso
  // Para que el frontend reciba la informacion completa del objeto creado
  res.status(201).json(newMatch);
});

// En el metodo patch es igual al metodo put, son para actualizar datos
// put recibe todos los datos a actualizar
// mientras que patch permite actualizar de manera parcial
router.patch('/:id', async (req, res) => {
  try {
    // Toma el id desde los parametros de la solicitud
    const { id } = req.params;
    // Toma el contenido de la solicitud, el body
    const body = req.body;
    // instanciamos el metodo update de nuestro servicio de matches o partidos
    // Con los 2 parametros que necesita para ejecutarse
    const match = await service.update(id, body);
    // Y lo envia como json en la respuesta con un mensaje exitoso
  res.json(match);
  } catch (error) {
    next(error);
  }

});

router.delete('/:id', async (req, res) => {
  // Toma el id desde los parametros de la solicitud
  const { id } = req.params;
  // instanciamos el metodo delete de nuestro servicio de matches o partidos enviando el id
  const respuesta = await service.delete(id);
  // Y lo envia como json lo que nos devuelva respuesta
  res.json(respuesta);
})

// Exportamos el router como un solo modulo
module.exports = router;
