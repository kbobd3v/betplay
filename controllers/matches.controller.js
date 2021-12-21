const Match = require('../models/matches');
const axios = require('axios');


const randomTeamsMatch = async () => {
    console.log('Inicia creacion de partido')
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
      

    val1 = 0;
    val2 = 0;

    while (val1 == val2) {
        var val1 = Math.round(Math.random() * (teams.length - 1));
        var val2 = Math.round(Math.random() * (teams.length - 1));
    }

    var _team1 = teams[val1].name;
    var _team2 = teams[val2].name;
    
    var _urlImgTeam1 = teams[val1].logo;
    var _urlImgTeam2 = teams[val2].logo;

    const match = await Match.create({
        team1: _team1,
        team2: _team2,
        urlImgTeam1: _urlImgTeam1,
        urlImgTeam2: _urlImgTeam2,
    })
    console.log('Partido creado');
}


module.exports = randomTeamsMatch;
