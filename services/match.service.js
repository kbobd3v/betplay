// Importamos faker para usar informacion de prueba en los partidos
const boom = require('@hapi/boom');
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
        // agregamos un nuebo atributo randomico de tipo booleano para hacer pruebas
        isBlocked : faker.datatype.boolean(),
      });
   }
}

// El metodo create usará data como parametro
async create(data) {
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
    // Retornará una promesa
    // Las promesas requieren una funcion flecha, esta funcion recibe 2 parametros, resolve si se resuelve la promesa
    // y reject si no
    return new Promise((resolve, reject) =>{
        // Definimos un timeout para que se resuelva la promesa
        // timeout recibe 2 parametros, el primero es la funcion flecha con la logica de la promesa a ejecutar
        // y el segundo es el tiempo (en milisegundos) que esperará para resolver nuestra logica
        setTimeout(() => {
            resolve(this.matches);
        }, 2000); // 1000 milisegundos equivalen a 1 segundo
    })
}

// Para el metodo findOne trabajaremos con el parametro id que se trae directamente
// De las propiedades del partido
async findOne(id) {
    // Usamos una funcion flecha para que nos retorne el partido con el id que pasamos por parametro
    const match = this.matches.find(item => item.id === id);
    if (!match) {
      throw boom.notFound('Partido no encontrado');
    }
    // Si nuestro partido esta bloqueado o isBlocked: True, nos lanzara un error 409 de tipo conflict
    if (match.isBlocked) {
      throw boom.conflict('Partido bloqueado');
    }
    return match;
}
// Update tambien usa el id, que vendra del body de la request
async update(id, changes) {
    // Usamos el metodo findIndex para buscar la ubicacion de nuestro partido
    // en el array de partidos
    // Si no encuentra el partido porque no encuentra el id el valor de index será -1
    const index = this.matches.findIndex(item => item.id === id);
    // Si no lo encuentra, lanzará un error
    if (index == -1) {
        throw boom.notFound('Partido no encontrado');
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

async delete(id) {
    // Usamos el metodo findIndex para buscar la ubicacion de nuestro partido
    // en el array de partidos
    // Si no encuentra el partido porque no encuentra el id el valor de index será -1
    const index = this.matches.findIndex(item => item.id === id);
    // Si no lo encuentra, lanzará un error
    if (index == -1) {
        throw boom.notFound('Partido no encontrado');
    }
    // si lo encuentra, el metodo splice tomará index para eliminar el elemento de esa posicion
    // en el array y como segundo parametro le pasamos 1, para que solo elimine un elemento desde la posicion del index
    this.matches.splice(index, 1);
    // y retornamos el id
    return { id };
}

}

// Exportamos la clase para poder instanciarla donde necesitemos
module.exports = MatchesService;
