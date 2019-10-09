const Gpio = require('onoff').Gpio;
const sensorTemperatura = new Gpio(25, 'in', 'both');
const sensorLuminosidade = new Gpio(4, 'in', 'both');
const button = new Gpio(17, 'in', 'both');

console.log('Iniciou código!', sensorTemperatura);

sensorTemperatura.watch((error, value) => {
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
  sensorTemperatura.unexport();
  sensorLuminosidade.unexport();
  button.unexport();
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
