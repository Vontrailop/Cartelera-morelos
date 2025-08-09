const mongoose = require('mongoose');
const Pedido = require('./Pedido');
const Cotizacion = require('./Cotizacion');

const contratoSchema = new mongoose.Schema({
  idPedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido',
    required: true,
    unique: true // Solo un contrato por pedido
  },
  urlDocumento: {
    type: String,
    required: true
  },
  fechaFirma: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    enum: ['Activo', 'Finalizado'],
    default: 'Activo'
  }
}, {
  timestamps: true
});

// Middleware para validar antes de guardar
contratoSchema.pre('save', async function(next) {
  if (this.isNew) {
    // 1. Verificar que el pedido exista
    const pedido = await Pedido.findById(this.idPedido);
    if (!pedido) {
      return next(new Error('Pedido no encontrado.'));
    }

    // 2. Verificar que exista una cotización aceptada para este pedido
    const cotizacionAceptada = await Cotizacion.findOne({
      idPedido: this.idPedido,
      estado: 'Aceptada'
    });

    if (!cotizacionAceptada) {
      return next(new Error('No existe una cotización aceptada para este pedido. No se puede crear el contrato.'));
    }

    // 3. Verificar que no exista ya un contrato para este pedido
    const contratoExistente = await this.constructor.findOne({ idPedido: this.idPedido });
    if (contratoExistente) {
      return next(new Error('Ya existe un contrato para este pedido.'));
    }
  }
  next();
});

const Contrato = mongoose.model('Contrato', contratoSchema);

module.exports = Contrato;
