// En javascript los middlewares se ejecutan codigo entre el envio de la solicitud y la respuesta
// Pueden usarse de manera global para no tener que agregarlo en cada solicitud
// con el parametro next puedes ejecutar middlewares en cadena, basicamente le dice que pase al siguiente
// Creamos este middleware para que capture y nos lance por consola los errores que encuentre
function logErrors (err, req, res, next) {
  console.log(err);
  // next toma como parametro el error para pasarlo al siguiente middleware
  next(err);
}

// Creamos nuestro manejador de errores, asi no se use el parametro next (Es decir no vas a ejecutar mas middlewares en esa cadena)
// debe agregarse para que la funcion sepa que este es un middleware
function errorHandler (err, req, res, next) {
  // en la respuesta enviamos un codigo de status 500 y el mensaje y stack del error en formato json
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

// Creamos nuestro manejador de errores de boom
function boomErrorHandler (err, req, res, next) {
  // Cuando lanzamos el error por boom, este gana una propiedad llamada isBoom que lo identifica
  if (err.isBoom) {
    // nos traemos toda la informacion del error
    const { output } = err;
    // Tomamos el codigo de estado directamente del error y su payload (datos del error) y lo enviamos como respuesta en formato json
    res.status(output.statusCode).json(output.payload);
  }
  // si el error no es manejado por boom seguimos con el siguiente middleware
  next(err);
}



// Y exportamos para usar en otras partes de la app
module.exports = { logErrors, errorHandler, boomErrorHandler };
