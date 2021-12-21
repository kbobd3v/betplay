const express = require('express');
// en este index importamos los routers que creamos
const matchesRouter = require('./matches.router');
const usersRouter = require('./users.router');
const teamsRouter = require('./teams.router');

// Al crear esta funcion que recibe la app como parametro
// Agregamos todos endpoints creados
function routerApi(app) {
    // Usamos express.router para generar una ruta global para los endpoints
    const router = express.Router();
    // Aqui definimos la ruta que queremos agregar a los endpoints
    app.use('/api/v1', router);
    // Y ya podemos usarla para los endpoints
    router.use('/matches', matchesRouter);
    router.use('/users', usersRouter);
    router.use('/teams', teamsRouter);
}

// Exportamos la funcion routerApi para usarla en otras partes
module.exports = routerApi;