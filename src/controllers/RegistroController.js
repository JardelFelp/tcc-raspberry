const Mongoose = require('mongoose');
const Registro = Mongoose.model('Registro');

module.exports = {
  async index() {
    return await Registro.find({ integrado: false });
  },

  async details(id) {
    return await Registro.findById(id);
  },

  async insert(dto) {
    return await Registro.create({
      ...dto
    });
  },

  async setItegrado(id) {
    return await Registro.findByIdAndUpdate(
      id,
      { integrado: true },
      { new: true }
    );
  },

  async delete(id) {
    return await Registro.findByIdAndRemove(id);
  }
};
