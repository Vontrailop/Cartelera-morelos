const mongoose = require('mongoose');

const rentaEquipoSchema = new mongoose.Schema({
  idPedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido',
    required: true
  },
  idEquipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaDevolucion: {
    type: Date
  },
  ubicacionEntrega: {
    type: String,
    required: true
  },
  ubicacionDevolucion: {
    type: String
  },
  estado: {
    type: String,
    enum: ['En uso', 'Finalizado'],
    default: 'En uso'
  }
}, {
  timestamps: true
});

const RentaEquipo = mongoose.model('RentaEquipo', rentaEquipoSchema);

module.exports = RentaEquipo;
