// Importamos express para luego usar su constructor de app
const express = require('express');
const app = express();
const port = 3000;

// Cuando se solicite la ruta / o el index con el verbo GET, asimismo el metodo get recibe
// la solicitud y la respuesta como parametros y con send envia la respuesta
// Es parecido al decorador @app.route en Flask
app.get('/', (req, res) => {
  res.send('El server funciona con express.js');
});

app.get('/partidos-hoy', (req, res) => {
  res.send('Apuesta ya antes que se cierren!');
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

app.get('/partidos/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    id_partido : 2,
    equipo1 : 'ecuador',
    equipo2 : 'españa',
  });
});

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

