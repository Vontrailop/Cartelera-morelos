const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');
const { protect } = require('../middleware/auth');

// Listar disponibilidad de equipos (cualquier usuario autenticado)
router.get('/disponibles', protect, equipoController.getEquiposDisponibles);

module.exports = router;
