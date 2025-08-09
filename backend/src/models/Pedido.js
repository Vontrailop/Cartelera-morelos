const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  idUsuarioCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fechaPedido: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    required: true,
    enum: ['Registrado', 'En proceso', 'Completado', 'Cancelado'],
    default: 'Registrado'
  }
}, { timestamps: true });

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
