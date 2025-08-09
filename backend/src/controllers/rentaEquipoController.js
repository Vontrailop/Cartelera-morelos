const rentaEquipoService = require('../services/rentaEquipoService');
const Pedido = require('../models/Pedido');
const Joi = require('joi');

const registrarUsoEquipoSchema = Joi.object({
  idPedido: Joi.string().required(),
  idEquipo: Joi.string().required(),
  fechaInicio: Joi.date().required(),
  ubicacionEntrega: Joi.string().required()
});

const finalizarUsoEquipoSchema = Joi.object({
  fechaDevolucion: Joi.date().required(),
  ubicacionDevolucion: Joi.string().required()
});

exports.registrarUsoEquipo = async (req, res) => {
  try {
    const { error } = registrarUsoEquipoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { idPedido, idEquipo, fechaInicio, ubicacionEntrega } = req.body;

    const renta = await rentaEquipoService.registrarUsoEquipo(idPedido, idEquipo, fechaInicio, ubicacionEntrega);
    res.status(201).json(renta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.finalizarUsoEquipo = async (req, res) => {
  try {
    const { error } = finalizarUsoEquipoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params; // id de la renta
    const { fechaDevolucion, ubicacionDevolucion } = req.body;

    const renta = await rentaEquipoService.finalizarUsoEquipo(id, fechaDevolucion, ubicacionDevolucion);
    res.json(renta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRentalsByPedido = async (req, res) => {
  try {
    const { idPedido } = req.params;

    // Verificar que el pedido exista
    const pedido = await Pedido.findById(idPedido);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado.' });
    }

    // Verificar autorización: Admin o cliente dueño del pedido
    if (req.user.rol !== 'Administrador' && pedido.idUsuarioCliente.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado para ver las rentas de este pedido.' });
    }

    const rentas = await rentaEquipoService.getRentalsByPedido(idPedido);
    res.json(rentas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
