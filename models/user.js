const mongoose = require("mongoose");

// Con mongoose podemos usar sus schema para enviar la informacion a mongodb de manera adecuada
const userSchema = mongoose.Schema({
  // Entonces tenemos que la key name sera de tipo String y es requerido true
  name: {
    type: String,
    required: true,
  },
  // el mismo formato para age, solo que cambia el tipo de dato
  age: {
    type: Number,
    required: true
  },
  // de igual manera para email
  email: {
    type: String,
    required: true
  }
});

// Como siempre exportamos el model de mongoose, diciendo que se llamara User y su contenido sera le Schema que ya creamos
module.exports = mongoose.model('User', userSchema);