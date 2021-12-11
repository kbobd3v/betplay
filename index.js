// Importamos express para luego usar su constructor de app
const express = require('express');
// Requerimos dotenv para manejar variables de entorno
require("dotenv").config();
const routerApi = require('./routes');
const app = express();
// Buscamos dentro del archivo env la variable PORT
const port = process.env.PORT || 9000;


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

