const Gpio = require('onoff').Gpio;
const sensorTemperatura = new Gpio(25, 'in', 'both');

console.log('Iniciou código!', sensorTemperatura);

sensorTemperatura.watch((error, value) => {
  if (error) {
    console.log(error);
    return false;
  }

  console.log(value);
  return true;
});

unexportOnClose = () => {
  console.log('Finalizar código!');
  sensorTemperatura.unexport();
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
