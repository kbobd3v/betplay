// en este index importamos los routers que creamos
const matchesRouter = require('./matches.router')
const usersRouter = require('./users.router')

// Al crear esta funcion que recibe la app como parametro
// Agregamos todos endpoints creados
function routerApi(app) {
    app.use('/api/matches', matchesRouter);
    app.use('/api/users', usersRouter);
}

// Exportamos la funcion routerApi para usarla en otras partes
module.exports = routerApi;