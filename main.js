const Gpio = require('onoff').Gpio;
const sensorLuminosidade = new Gpio(4, 'in', '');
const button = new Gpio(17, 'in', 'both');
const mcpadc = require('mcp-spi-adc');

const tempSensor = mcpadc.open(18, { speedHz: 20000 }, err => {
  if (err) throw err;

  setInterval(_ => {
    tempSensor.read((err, reading) => {
      if (err) throw err;

      console.log((reading.value * 3.3 - 0.5) * 100);
    });
  }, 1000);
});

button.watch((error, value) => {
  if (error) {
    console.log(error);
  } else {
    console.log(value);
  }
});

sensorLuminosidade.watch((error, value) => {
  if (error) {
    console.log(error);
  } else {
    console.log(value);
  }
});

unexportOnClose = () => {
  sensorLuminosidade.unexport();
  button.unexport();
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
