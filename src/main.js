const Mongoose = require('mongoose');
const RequireDir = require('require-dir');
const Request = require('request');
var DhtSensor = require('node-dht-sensor');

/**
 * Configuração do .env
 */
require('dotenv').config();

let RegistroController = null;

iniciarSemArmazenamentoInterno();

const iniciarSemArmazenamentoInterno = () => {
  setInterval(async () => {
    DhtSensor.read(11, 4, (error, temperatura_ambiente, umidade_solo) => {
      try {
        console.log(
          `Temperatura: ${temperatura_ambiente} | Umidade: ${umidade_solo}`
        );

        if (!error) {
          Request(
            `${process.env.API}/dado/${process.env.PRODUTOR_ID}/${process.env.ESTUFA_ID}`,
            {
              method: 'POST',
              json: {
                temperatura_ambiente,
                umidade_solo
              }
            },
            error => {
              if (!error) {
                console.log('Item enviado com sucesso!');
              } else {
                console.error(`Erro => ${error}`);
              }
            }
          );
        } else {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }, 15000);
};

const configurarMongoDB = () => {
  Mongoose.connect('mongodb://localhost:27017/ControleEstufaLocal', {
    useNewUrlParser: true
  });

  RequireDir('./models');

  RegistroController = require('./controllers/RegistroController');
};

/**
 * Não utilizado no primeiro momento
 */
const inicializarComArmazenamentoInterno = () => {
  /**
   * Realizar processo...
   */
  setInterval(async () => {
    DhtSensor.read(11, 4, (error, temperatura_ambiente, umidade_solo) => {
      console.log(
        `Temperatura: ${temperatura_ambiente} | Umidade: ${umidade_solo}`
      );
      if (!error) {
        RegistroController.insert({
          temperatura_ambiente,
          umidade_solo
        });
      } else {
        console.error(error);
      }
    });
  }, 15000);

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
  }, 60000);
};
