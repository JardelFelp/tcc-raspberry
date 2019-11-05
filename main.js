var sensor = require('node-dht-sensor');
const mcpadc = require('mcp-spi-adc');

const tempSensor = mcpadc.openMcp3008(5, { speedHz: 20000 }, err => {
  if (err) throw err;

  setInterval(_ => {
    tempSensor.read((err, reading) => {
      if (err) throw err;

      console.log(
        `Value - ${reading.value} - JSON: ${JSON.stringify(reading)}`
      );
    });
  }, 1000);
});

setInterval(() => {
  sensor.read(11, 4, function(err, temperature, humidity) {
    if (!err) {
      console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
    }
  });
}, 1000);

unexportOnClose = () => {
  tempSensor.close((err, done) => {
    console.log('Programa encerrado');
  });
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
