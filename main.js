const Gpio = require('onoff').Gpio;
const sensorTemperatura = new Gpio(25, 'in');

sensorTemperatura.watch((error, value) => {
  if (error) {
    console.log(error);
    return false;
  }

  console.log(value);
  return true;
});

unexportOnClose = () => {
  sensorTemperatura.unexport();
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
