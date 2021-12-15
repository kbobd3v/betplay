// Importamos faker para usar informacion de prueba en los partidos
const faker = require('faker');

// Creamos una clase para iniciar el Servicio de partidos o matches
class MatchesService {
    // Generamos un constructor para definir la estructura de la clase 
    constructor(){
        // Iniciamos con un array vacio para nuestros partidos
        this.matches = [];
        // Cada vez que generemos una instancia del servicio va a generar esos 100 partidos
        this.generate();
    }
    
    // Creamos el metodo generate para crear nuestros partidos
    generate() {
        // Como usaremos faker, definimos el limite en 100 para que agregue esa cantidad por defecto
        const limit = 100;
         // Iteramos para agregar la info de prueba de los partidos al arreglo matches
        for (let index = 0; index < limit; index++) {
         // el metodo push agrega lo que deseemos al arreglo que llama el metodo
        this.matches.push({
        // id, name, price e image son metodos que traen informacion de prueba de faker
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        // el metodo parseInt puede usarse con 2 parametros
        // El primero es la info a parsear y el 2do es la base del integer
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
   }
}

// El metodo create usará data como parametro
create(data) {
    // Creamos una nueva variable tipo objeto
    const newMatch = {
        // Desde faker traemos el id, es decir el match que se va a crear tendra un id por defecto
        id: faker.datatype.uuid(),
        // Usamos el operador spread para concatenar el id a la data que viene del metodo post
        ...data
    }
    // this se refiere que vamos a trabajar con el contexto de la clase MatchesService
    // entonces this.matches se refiere al arreglo que definimos en el constructor
    // push agrega el nuevo objeto match al array de matches
    this.matches.push(newMatch);
    // Y retornamos el objeto creado
    return newMatch;

}

// El metodo find nos devuelve todos los partidos del array matches de la clase
find() {
  return this.matches;
}

// Para el metodo findOne trabajaremos con el parametro id que se trae directamente
// De las propiedades del partido
findOne(id) {
    // El metodo find nos trae todos partidos
    // Usamos una funcion flecha para que nos retorne el partido con el id que pasamos por parametro
    return this.matches.find(item => item.id === id);
}
// Update tambien usa el id, que vendra del body de la request
update(id, changes) {
    // Usamos el metodo findIndex para buscar la ubicacion de nuestro partido
    // en el array de partidos
    // Si no encuentra el partido porque no encuentra el id el valor de index será -1
    const index = this.matches.findIndex(item => item.id === id);
    // Si no lo encuentra, lanzará un error
    if (index == -1) {
        throw new Error('Partido no encontrado');
    }
    // Ya tenemos el elemento que vamos a actualizar con su index en el arreglo
    const match = this.matches[index];
    // entonces con el operador spread (...)
    this.matches[index] = {
        // Le pedimos que mantenga los datos iniciales, todos
        ...match,
        // Y que anexe los cambios que estamos mandando
        ...changes
    };
    // retornamos el mismo index con los nuevos valores
    return this.matches[index];
}

delete(id) {
    // Usamos el metodo findIndex para buscar la ubicacion de nuestro partido
    // en el array de partidos
    // Si no encuentra el partido porque no encuentra el id el valor de index será -1
    const index = this.matches.findIndex(item => item.id === id);
    // Si no lo encuentra, lanzará un error
    if (index == -1) {
        throw new Error('Partido no encontrado');
    }
    // si lo encuentra, el metodo splice tomará index para eliminar el elemento de esa posicion
    // en el array y como segundo parametro le pasamos 1, para que solo elimine un elemento desde la posicion del index
    this.matches.splice(index, 1);
    // y retornamos el id
    return { id };
}

}

module.exports = MatchesService;
