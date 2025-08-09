const Cotizacion = require('../models/Cotizacion');
const Pedido = require('../models/Pedido');

exports.createCotizacion = async (idPedido, montoTotal) => {
  const pedido = await Pedido.findById(idPedido);
  if (!pedido) {
    throw new Error('Pedido no encontrado.');
  }

  const cotizacion = new Cotizacion({ idPedido, montoTotal });
  await cotizacion.save();
  return cotizacion;
};

exports.getCotizacionesByCliente = async (idUsuarioCliente) => {
  const pedidosCliente = await Pedido.find({ idUsuarioCliente }).select('_id');
  const idsPedidos = pedidosCliente.map(pedido => pedido._id);
  return await Cotizacion.find({ idPedido: { $in: idsPedidos } }).populate({
    path: 'idPedido',
    populate: {
      path: 'idUsuarioCliente',
      select: 'nombre email'
    }
  });
};

exports.getCotizacionById = async (idCotizacion) => {
  return await Cotizacion.findById(idCotizacion).populate({
    path: 'idPedido',
    populate: {
      path: 'idUsuarioCliente',
      select: 'nombre email'
    }
  });
};

exports.updateCotizacionEstado = async (idCotizacion, nuevoEstado) => {
  const cotizacion = await Cotizacion.findById(idCotizacion);
  if (!cotizacion) {
    throw new Error('Cotización no encontrada.');
  }
  if (cotizacion.estado !== 'Pendiente') {
    throw new Error('La cotización ya ha sido respondida y no puede ser modificada.');
  }
  cotizacion.estado = nuevoEstado;
  await cotizacion.save();
  return cotizacion;
};
