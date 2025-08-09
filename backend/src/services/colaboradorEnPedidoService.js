const ColaboradorEnPedido = require('../models/ColaboradorEnPedido');

exports.postularColaborador = async (idPedido, idColaborador, area) => {
  const postulacionExistente = await ColaboradorEnPedido.findOne({ idPedido, idColaborador, area });
  if (postulacionExistente) {
    throw new Error('El colaborador ya se postuló a este pedido en esta área.');
  }
  const nuevaPostulacion = new ColaboradorEnPedido({ idPedido, idColaborador, area });
  await nuevaPostulacion.save();
  return nuevaPostulacion;
};
