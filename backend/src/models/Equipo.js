const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  descripcion: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['Disponible', 'En uso', 'Mantenimiento'],
    default: 'Disponible'
  }
}, { timestamps: true });

const Equipo = mongoose.model('Equipo', equipoSchema);

module.exports = Equipo;
