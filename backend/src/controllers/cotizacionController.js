const cotizacionService = require('../services/cotizacionService');
const Pedido = require('../models/Pedido');
const Joi = require('joi');

const createCotizacionSchema = Joi.object({
  idPedido: Joi.string().required(),
  montoTotal: Joi.number().positive().required()
});

const updateCotizacionEstadoSchema = Joi.object({
  estado: Joi.string().valid('Aceptada', 'Rechazada').required()
});

exports.createCotizacion = async (req, res) => {
  try {
    const { error } = createCotizacionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { idPedido, montoTotal } = req.body;

    // Verificar que el pedido exista
    const pedido = await Pedido.findById(idPedido);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado.' });
    }

    const cotizacion = await cotizacionService.createCotizacion(idPedido, montoTotal);
    res.status(201).json(cotizacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMisCotizaciones = async (req, res) => {
  try {
    const cotizaciones = await cotizacionService.getCotizacionesByCliente(req.user._id);
    res.json(cotizaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCotizacionById = async (req, res) => {
  try {
    const cotizacion = await cotizacionService.getCotizacionById(req.params.id);
    if (!cotizacion) {
      return res.status(404).json({ message: 'Cotización no encontrada.' });
    }

    // Verificar si el usuario es administrador o el cliente dueño del pedido
    if (req.user.rol !== 'Administrador' && cotizacion.idPedido.idUsuarioCliente.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado para ver esta cotización.' });
    }

    res.json(cotizacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCotizacionEstado = async (req, res) => {
  try {
    const { error } = updateCotizacionEstadoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params;
    const { estado } = req.body;

    const cotizacion = await cotizacionService.getCotizacionById(id);
    if (!cotizacion) {
      return res.status(404).json({ message: 'Cotización no encontrada.' });
    }

    // Solo el cliente dueño del pedido puede actualizar el estado
    if (cotizacion.idPedido.idUsuarioCliente.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado para actualizar esta cotización.' });
    }

    const updatedCotizacion = await cotizacionService.updateCotizacionEstado(id, estado);
    res.json(updatedCotizacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
