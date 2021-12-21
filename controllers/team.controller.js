const Match = require('../models/team');
const axios = require('axios');


const createTeams = async () => {
    console.log('Inicia creacion de equipos')
    let teams = [];
    var options = {
        method: 'GET',
        url: 'https://api-baseball.p.rapidapi.com/teams',
        params: {league: '1', season: '2020'},
        headers: {
          'x-rapidapi-host': 'api-baseball.p.rapidapi.com',
          'x-rapidapi-key': '8849f1c670msh587b3e8cf28ed63p13b2efjsn18391ac71d84'
        }
      }

      try {
        const response = await axios(options);
        console.log(response.data);
        teams = response.data.response;
      } catch (error) {
          console.log(error);
      }
      

      for (x=0;x<teams.length; x++){
          let _name = teams[x].name;
          let _logo = teams[x].logo;
        const match = await Match.create({
            name: _name,
            logo: _logo,
        })
      }

    
    console.log('equipo creado');
}


// module.exports = createTeams;