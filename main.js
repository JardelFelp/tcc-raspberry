const Gpio = require('onoff').Gpio;
const sensorTemperatura = new Gpio(25, 'in', 'both');
const button = new Gpio(25, 'in', 'both');

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

unexportOnClose = () => {
  sensorTemperatura.unexport();
  button.unexport();
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
