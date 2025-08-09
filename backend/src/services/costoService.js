const Costo = require('../models/Costo');

exports.addCosto = async (idPedido, concepto, monto) => {
  const costo = new Costo({ idPedido, concepto, monto });
  await costo.save();
  return costo;
};

exports.getCostosByPedido = async (idPedido) => {
  return await Costo.find({ idPedido }).populate({
    path: 'idPedido',
    populate: {
      path: 'idUsuarioCliente',
      select: 'nombre email'
    }
  });
};

exports.deleteCosto = async (idCosto) => {
  const costo = await Costo.findByIdAndDelete(idCosto);
  if (!costo) {
    throw new Error('Costo no encontrado.');
  }
  return costo;
};
