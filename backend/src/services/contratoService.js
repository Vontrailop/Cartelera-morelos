const Contrato = require('../models/Contrato');
const Pedido = require('../models/Pedido');

exports.createContrato = async (idPedido, urlDocumento, fechaFirma) => {
  const contrato = new Contrato({ idPedido, urlDocumento, fechaFirma });
  await contrato.save();
  return contrato;
};

exports.getContratosByCliente = async (idUsuarioCliente) => {
  const pedidosCliente = await Pedido.find({ idUsuarioCliente }).select('_id');
  const idsPedidos = pedidosCliente.map(pedido => pedido._id);
  return await Contrato.find({ idPedido: { $in: idsPedidos } }).populate({
    path: 'idPedido',
    populate: {
      path: 'idUsuarioCliente',
      select: 'nombre email'
    }
  });
};

exports.getContratoById = async (idContrato) => {
  return await Contrato.findById(idContrato).populate({
    path: 'idPedido',
    populate: {
      path: 'idUsuarioCliente',
      select: 'nombre email'
    }
  });
};

exports.finalizarContrato = async (idContrato) => {
  const contrato = await Contrato.findById(idContrato);
  if (!contrato) {
    throw new Error('Contrato no encontrado.');
  }
  if (contrato.estado === 'Finalizado') {
    throw new Error('El contrato ya está finalizado.');
  }
  contrato.estado = 'Finalizado';
  await contrato.save();
  return contrato;
};
