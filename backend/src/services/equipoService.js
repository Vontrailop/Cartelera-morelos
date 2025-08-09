const Equipo = require('../models/Equipo');

exports.getEquiposDisponibles = async () => {
  return await Equipo.find({ estado: 'Disponible' });
};

exports.updateEquipoEstado = async (idEquipo, nuevoEstado) => {
  const equipo = await Equipo.findById(idEquipo);
  if (!equipo) {
    throw new Error('Equipo no encontrado.');
  }
  equipo.estado = nuevoEstado;
  await equipo.save();
  return equipo;
};

exports.getEquipoById = async (idEquipo) => {
  return await Equipo.findById(idEquipo);
};
