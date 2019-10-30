// const Gpio = require('onoff').Gpio;
const mcpadc = require('mcp-spi-adc');

const tempSensor = mcpadc.open(5, { speedHz: 20000 }, err => {
  console.log(`Erro ao iniciar -> ${JSON.stringify(err)}`);
  if (err) throw err;

  setInterval(_ => {
    tempSensor.read((err, reading) => {
      console.log(`Erro ao ler -> ${JSON.stringify(err)}`);
      if (err) throw err;

      console.log((reading.value * 3.3 - 0.5) * 100);
    });
  }, 1000);
});

unexportOnClose = () => {};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
