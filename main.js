var sensor = require('node-dht-sensor');
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

var umidade = new Gpio(17, 'in', 'both');

setInterval(() => {
  sensor.read(11, 4, function(err, temperature, humidity) {
    if (!err) {
      console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
    }
  });

  umidade.read((err, value) => {
    if (!err) {
      console.log(`Umidade: ${value}`);
    } else {
      console.error(err);
    }
  });
}, 1000);
