const contratoService = require('../services/contratoService');
const Pedido = require('../models/Pedido');
const Joi = require('joi');

const createContratoSchema = Joi.object({
  idPedido: Joi.string().required(),
  urlDocumento: Joi.string().uri().required(), // Valida que sea una URL válida
  fechaFirma: Joi.date().required()
});

exports.createContrato = async (req, res) => {
  try {
    const { error } = createContratoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { idPedido, urlDocumento, fechaFirma } = req.body;

    const contrato = await contratoService.createContrato(idPedido, urlDocumento, fechaFirma);
    res.status(201).json(contrato);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMisContratos = async (req, res) => {
  try {
    const contratos = await contratoService.getContratosByCliente(req.user._id);
    res.json(contratos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getContratoById = async (req, res) => {
  try {
    const contrato = await contratoService.getContratoById(req.params.id);
    if (!contrato) {
      return res.status(404).json({ message: 'Contrato no encontrado.' });
    }

    // Verificar si el usuario es administrador o el cliente dueño del pedido
    if (req.user.rol !== 'Administrador' && contrato.idPedido.idUsuarioCliente.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado para ver este contrato.' });
    }

    res.json(contrato);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.finalizarContrato = async (req, res) => {
  try {
    const contrato = await contratoService.finalizarContrato(req.params.id);
    res.json(contrato);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
