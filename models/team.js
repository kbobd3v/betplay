const mongoose = require("mongoose");


// Con mongoose podemos usar sus schema para enviar la informacion a mongodb de manera adecuada
const teamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

module.exports =  Team;