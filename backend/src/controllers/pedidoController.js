const pedidoService = require('../services/pedidoService');
const colaboradorEnPedidoService = require('../services/colaboradorEnPedidoService');
const Joi = require('joi');

const createPedidoSchema = Joi.object({
  servicios: Joi.array().items(Joi.object({
    idServicio: Joi.string().required(),
    detalles: Joi.string().optional()
  })).min(1).required()
});

const updatePedidoStatusSchema = Joi.object({
  estado: Joi.string().valid('Registrado', 'En proceso', 'Completado', 'Cancelado').required()
});

const postularColaboradorSchema = Joi.object({
  area: Joi.string().valid('Branding', 'Producción', 'Marketing', 'Desarrollo Web').required()
});

exports.createPedido = async (req, res) => {
  try {
    const { error } = createPedidoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { servicios } = req.body;
    const idUsuarioCliente = req.user._id; // Viene del middleware de autenticación

    const pedido = await pedidoService.createPedido(idUsuarioCliente, servicios);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMisPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.getPedidosByCliente(req.user._id);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPedidos = async (req, res) => {
  try {
    const filters = req.query; // Filtrar por estado, cliente, fecha
    const pedidos = await pedidoService.getAllPedidos(filters);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePedidoStatus = async (req, res) => {
  try {
    const { error } = updatePedidoStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params;
    const { estado } = req.body;

    const pedido = await pedidoService.updatePedidoStatus(id, estado);
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postularColaborador = async (req, res) => {
  try {
    const { error } = postularColaboradorSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params; // id del pedido
    const { area } = req.body;
    const idColaborador = req.user._id; // Viene del middleware de autenticación

    const postulacion = await colaboradorEnPedidoService.postularColaborador(id, idColaborador, area);
    res.status(201).json(postulacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
