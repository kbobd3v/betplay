// Importamos express para luego usar su constructor de app
const express = require('express');
// Requerimos dotenv para manejar variables de entorno
require("dotenv").config();
const routerApi = require('./routes');
const app = express();
const cron = require('node-cron');
const randomTeamsMatch = require('./controllers/matches.controller');
// const createTeams = require("./controllers/team.controller");
// importamos los middleware para capturar errores
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')
// Buscamos dentro del archivo env la variable PORT
const port = process.env.PORT || 9000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Usamos el middleware express.json para poder recibir informacion en ese formato mediante el metodo post y demas
app.use(express.json());

// Cuando se solicite la ruta / con el verbo GET, este recibe
// la solicitud y la respuesta como parametros y con send envia la respuesta
// Es parecido al decorador @app.route en Flask
app.get('/', (req, res) => {
  res.send('El server funciona con express.js!');
});

// Recuerda que en el index.js de routes exportamos la funcion routerApi
// que usa como parametro la app, entonces la llamamos
// routerApi define cada uno de los endpoints que creamos
routerApi(app);

// Es importante la posicion de ejecucion, ya que si uno de tus middleware iniciales no tiene el parametro next, no seguira ejecutandolos
app.use(logErrors);
// ejecutamos boom primero ya que de no ser error boom pasa al siguiente middleware
app.use(boomErrorHandler);
app.use(errorHandler);


// mongoose es una especie de middleware que nos ayuda a organizar la informacion (Usando schemas) que se enviará a la base de datos
const mongoose = require('mongoose');
//Inicializamos la conexion con la base de datos usando mongoose
// env especifica que buscará en el archivo .env en root de la app la variable MONGODB_URI y usara su valor para conectarse
mongoose.connect(process.env.MONGODB_URI)
// .then inicia un proceso asincrono (promesa) que esperará a la ejecucion exitosa de la conexion con la db
// y lanza el mensaje por consola
.then(() => console.log('Conectado a la base de datos Cluster Atlas'))
// si la promesa no se cumple, si no se conecta a la base de datos, nos lanza el error por consola
.catch((error) => console.log(error));

// Autorizamos a la app a comunicarse por el puerto que definimos antes
app.listen(port, () => {
  console.log('Servidor corriendo en el puerto: ' + port);
});

// cron.schedule('* * * * *', () => {
//   try {
//       randomTeamsMatch();
//   } catch (error){
//       console.log(error);
//   }
// }, {
//   scheduled: true
// });

// createTeams();
