const equipoService = require('../services/equipoService');

exports.getEquiposDisponibles = async (req, res) => {
  try {
    const equipos = await equipoService.getEquiposDisponibles();
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
