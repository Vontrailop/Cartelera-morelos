const mongoose = require('mongoose');
const Pedido = require('./Pedido'); // Asegúrate de que la ruta sea correcta

const cotizacionSchema = new mongoose.Schema({
  idPedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido',
    required: true,
    unique: true // Asegura que solo haya una cotización por pedido en estado Pendiente
  },
  montoTotal: {
    type: Number,
    required: true
  },
  fechaEmision: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Aceptada', 'Rechazada'],
    default: 'Pendiente'
  }
}, {
  timestamps: true
});

// Middleware para asegurar que solo haya una cotización pendiente por pedido
cotizacionSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('estado')) {
    if (this.estado === 'Pendiente') {
      const existingPendingQuote = await this.constructor.findOne({
        idPedido: this.idPedido,
        estado: 'Pendiente',
        _id: { $ne: this._id }
      });
      if (existingPendingQuote) {
        return next(new Error('Ya existe una cotización pendiente para este pedido.'));
      }
    }
  }
  next();
});

const Cotizacion = mongoose.model('Cotizacion', cotizacionSchema);

module.exports = Cotizacion;
