const id = require("faker/lib/locales/id_ID");
const { number } = require("joi");
const mongoose = require("mongoose");


// Con mongoose podemos usar sus schema para enviar la informacion a mongodb de manera adecuada
const matchSchema = mongoose.Schema(
  {
    team1: {
      type: String,
      required: true,
    },
    team2: {
      type: String,
      required: true,
    },
    urlImgTeam1: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    urlImgTeam2: {
        type: String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
      totalAmount: {
        type: Number,
        default: 5000,
      },
      totalBets: {
        type: Number,
        default: 0,
      }

  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model("Match", matchSchema);

module.exports =  Match;