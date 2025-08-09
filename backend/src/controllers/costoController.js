const costoService = require('../services/costoService');
const Pedido = require('../models/Pedido');
const Joi = require('joi');

const addCostoSchema = Joi.object({
  idPedido: Joi.string().required(),
  concepto: Joi.string().required(),
  monto: Joi.number().positive().required()
});

exports.addCosto = async (req, res) => {
  try {
    const { error } = addCostoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { idPedido, concepto, monto } = req.body;

    // Verificar que el pedido exista
    const pedido = await Pedido.findById(idPedido);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado.' });
    }

    const costo = await costoService.addCosto(idPedido, concepto, monto);
    res.status(201).json(costo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCostosByPedido = async (req, res) => {
  try {
    const { idPedido } = req.params;

    // Verificar que el pedido exista
    const pedido = await Pedido.findById(idPedido);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado.' });
    }

    // Verificar autorización: Admin o cliente dueño del pedido
    if (req.user.rol !== 'Administrador' && pedido.idUsuarioCliente.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado para ver los costos de este pedido.' });
    }

    const costos = await costoService.getCostosByPedido(idPedido);
    res.json(costos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCosto = async (req, res) => {
  try {
    const costo = await costoService.deleteCosto(req.params.id);
    res.json({ message: 'Costo eliminado correctamente.', costo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
