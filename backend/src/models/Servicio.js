const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true,
    enum: ['Branding', 'Producción', 'Marketing', 'Desarrollo Web']
  }
}, { timestamps: true });

const Servicio = mongoose.model('Servicio', servicioSchema);

module.exports = Servicio;
