const Mongoose = require('mongoose');
const RequireDir = require('require-dir');
const Request = require('request');
var DhtSensor = require('node-dht-sensor');

/**
 * Configuração do .env
 */
require('dotenv').config();

Mongoose.connect('mongodb://localhost:27017/ControleEstufaLocal', {
  useNewUrlParser: true
});

RequireDir('./models');

const RegistroController = require('./controllers/RegistroController');

/**
 * Realizar processo...
 */
setInterval(async () => {
  DhtSensor.read(11, 4, (error, temperatura_ambiente, umidade_solo) => {
    if (!error) {
      await RegistroController.insert({
        temperatura_ambiente,
        umidade_solo
      });
    } else {
      console.error(error);
    }
  })
}, 1000);

setInterval(async () => {
  const response = await RegistroController.index();
  
  for (let chunk = 0; chunk < response.length; chunk += 10) {
    const items = response.slice(chunk, chunk + 10);

    Request(
      `${process.env.API}/dado/${process.env.PRODUTOR_ID}/${process.env.ESTUFA_ID}`,
      {
        method: 'POST',
        json: items
      },
      error => {
        if (!error) {
          // Integração
          items.forEach(item => RegistroController.setItegrado(item._id));
        } else {
          console.error(`Erro => ${error}`);
        }
      }
    );
  }
}, 5000);
