// Importamos express para luego usar su constructor de app
const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

// Cuando se solicite la ruta / con el verbo GET, este recibe
// la solicitud y la respuesta como parametros y con send envia la respuesta
// Es parecido al decorador @app.route en Flask
app.get('/', (req, res) => {
  res.send('El server funciona con express.js');
});


// Recuerda que en el index.js de routes exportamos la funcion routerApi
// que usa como parametro la app, entonces la llamamos
// routerApi define cada uno de los endpoints que creamos
routerApi(app);

// Autorizamos a la app a comunicarse por el puerto que definimos antes
app.listen(port, () => {
  console.log('Servidor corriendo en el puerto: ' + port);
});

