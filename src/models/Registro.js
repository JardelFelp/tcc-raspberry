const Mongoose = require('mongoose');
const MongoosePaginate = require('mongoose-paginate');

const RegistroSchema = new Mongoose.Schema({
  temperatura_ambiente: Number,
  umidade_ambiente: Number,
  temperatura_solo: Number,
  umidade_solo: Number,
  exposicao_solar: Number,
  integrado: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

RegistroSchema.plugin(MongoosePaginate);
Mongoose.model('Registro', RegistroSchema);
