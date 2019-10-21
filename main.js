const Gpio = require('onoff').Gpio;
const sensorTemperaturaUmidade = new Gpio(18, 'in', 'both');
const sensorLuminosidade = new Gpio(4, 'in', '');
const button = new Gpio(17, 'in', 'both');

console.log('Iniciou código!', sensorTemperaturaUmidade);

sensorTemperaturaUmidade.watch((error, value) => {
  if (error) {
    console.log(error);
  } else {
    console.log(value);
  }
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
  sensorTemperaturaUmidade.unexport();
  sensorLuminosidade.unexport();
  button.unexport();
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
