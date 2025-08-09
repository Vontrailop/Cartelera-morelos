const RentaEquipo = require('../models/RentaEquipo');
const Pedido = require('../models/Pedido');
const Equipo = require('../models/Equipo');
const equipoService = require('./equipoService');

exports.registrarUsoEquipo = async (idPedido, idEquipo, fechaInicio, ubicacionEntrega) => {
  // Verificar que el pedido exista
  const pedido = await Pedido.findById(idPedido);
  if (!pedido) {
    throw new Error('Pedido no encontrado.');
  }

  // Verificar que el equipo exista y esté disponible
  const equipo = await Equipo.findById(idEquipo);
  if (!equipo) {
    throw new Error('Equipo no encontrado.');
  }
  if (equipo.estado !== 'Disponible') {
    throw new Error('El equipo no está disponible para ser rentado.');
  }

  // Crear el registro de renta
  const renta = new RentaEquipo({ idPedido, idEquipo, fechaInicio, ubicacionEntrega });
  await renta.save();

  // Actualizar el estado del equipo a 'En uso'
  await equipoService.updateEquipoEstado(idEquipo, 'En uso');

  return renta;
};

exports.finalizarUsoEquipo = async (idRenta, fechaDevolucion, ubicacionDevolucion) => {
  const renta = await RentaEquipo.findById(idRenta);
  if (!renta) {
    throw new Error('Registro de renta no encontrado.');
  }
  if (renta.estado === 'Finalizado') {
    throw new Error('La renta ya ha sido finalizada.');
  }

  renta.fechaDevolucion = fechaDevolucion;
  renta.ubicacionDevolucion = ubicacionDevolucion;
  renta.estado = 'Finalizado';
  await renta.save();

  // Actualizar el estado del equipo a 'Disponible'
  await equipoService.updateEquipoEstado(renta.idEquipo, 'Disponible');

  return renta;
};

exports.getRentalsByPedido = async (idPedido) => {
  return await RentaEquipo.find({ idPedido }).populate('idEquipo').populate({
    path: 'idPedido',
    populate: {
      path: 'idUsuarioCliente',
      select: 'nombre email'
    }
  });
};
