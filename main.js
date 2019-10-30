// const Gpio = require('onoff').Gpio;
const mcpadc = require('mcp-spi-adc');

const tempSensor = mcpadc.open(5, { speedHz: 20000 }, err => {
  if (err) throw err;

  setInterval(_ => {
    tempSensor.read((err, reading) => {
      if (err) throw err;

      console.log(
        `Value - ${reading.value} - JSON: ${JSON.stringify(reading)}`
      );
    });
  }, 2000);
});

unexportOnClose = () => {};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
