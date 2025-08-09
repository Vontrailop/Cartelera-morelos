const mongoose = require('mongoose');

const pedidoServicioSchema = new mongoose.Schema({
  idPedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido',
    required: true
  },
  idServicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Servicio',
    required: true
  },
  detalles: {
    type: String
  }
});

const PedidoServicio = mongoose.model('PedidoServicio', pedidoServicioSchema);

module.exports = PedidoServicio;
