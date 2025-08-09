const Pedido = require('../models/Pedido');
const PedidoServicio = require('../models/PedidoServicio');
const Servicio = require('../models/Servicio');

exports.createPedido = async (idUsuarioCliente, serviciosData) => {
  const pedido = new Pedido({ idUsuarioCliente });
  await pedido.save();

  for (const servicioData of serviciosData) {
    const servicioExistente = await Servicio.findById(servicioData.idServicio);
    if (!servicioExistente) {
      throw new Error(`Servicio con ID ${servicioData.idServicio} no encontrado.`);
    }
    const pedidoServicio = new PedidoServicio({
      idPedido: pedido._id,
      idServicio: servicioData.idServicio,
      detalles: servicioData.detalles
    });
    await pedidoServicio.save();
  }
  return pedido;
};

exports.getPedidosByCliente = async (idUsuarioCliente) => {
  const pedidos = await Pedido.find({ idUsuarioCliente }).populate({
    path: 'idUsuarioCliente',
    select: 'nombre email'
  });

  const pedidosConServicios = [];
  for (const pedido of pedidos) {
    const serviciosAsociados = await PedidoServicio.find({ idPedido: pedido._id }).populate('idServicio');
    pedidosConServicios.push({
      ...pedido.toObject(),
      servicios: serviciosAsociados
    });
  }
  return pedidosConServicios;
};

exports.getAllPedidos = async (filters) => {
  const query = {};
  if (filters.estado) {
    query.estado = filters.estado;
  }
  if (filters.cliente) {
    query.idUsuarioCliente = filters.cliente;
  }
  if (filters.fechaInicio && filters.fechaFin) {
    query.fechaPedido = { $gte: new Date(filters.fechaInicio), $lte: new Date(filters.fechaFin) };
  } else if (filters.fechaInicio) {
    query.fechaPedido = { $gte: new Date(filters.fechaInicio) };
  } else if (filters.fechaFin) {
    query.fechaPedido = { $lte: new Date(filters.fechaFin) };
  }

  const pedidos = await Pedido.find(query).populate({
    path: 'idUsuarioCliente',
    select: 'nombre email'
  });

  const pedidosConServicios = [];
  for (const pedido of pedidos) {
    const serviciosAsociados = await PedidoServicio.find({ idPedido: pedido._id }).populate('idServicio');
    pedidosConServicios.push({
      ...pedido.toObject(),
      servicios: serviciosAsociados
    });
  }
  return pedidosConServicios;
};

exports.updatePedidoStatus = async (idPedido, estado) => {
  const pedido = await Pedido.findById(idPedido);
  if (!pedido) {
    throw new Error('Pedido no encontrado.');
  }
  pedido.estado = estado;
  await pedido.save();
  return pedido;
};
