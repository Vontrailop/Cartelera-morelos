const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
  telefonoDestino: {
    type: String,
    required: true
  },
  mensajeEnviado: {
    type: String,
    required: true
  },
  urlOpcional: {
    type: String
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  estatusRespuesta: {
    type: String, // Ej: 'Enviado', 'Error', 'Pendiente'
    default: 'Pendiente'
  },
  eventoRelacionado: {
    type: String // Ej: 'Pedido', 'Asignacion', 'Contrato'
  },
  idEvento: {
    type: mongoose.Schema.Types.ObjectId, // Para vincular a un Pedido, Contrato, etc.
    refPath: 'eventoRelacionado' // Permite referenciar diferentes modelos
  }
}, {
  timestamps: true
});

const Notificacion = mongoose.model('Notificacion', notificacionSchema);

module.exports = Notificacion;
