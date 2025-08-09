const mongoose = require('mongoose');

const colaboradorEnPedidoSchema = new mongoose.Schema({
  idPedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido',
    required: true
  },
  idColaborador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  area: {
    type: String,
    required: true,
    enum: ['Branding', 'Producción', 'Marketing', 'Desarrollo Web']
  }
}, { timestamps: true });

colaboradorEnPedidoSchema.index({ idPedido: 1, idColaborador: 1, area: 1 }, { unique: true });

const ColaboradorEnPedido = mongoose.model('ColaboradorEnPedido', colaboradorEnPedidoSchema);

module.exports = ColaboradorEnPedido;
