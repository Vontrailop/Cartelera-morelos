const express = require('express');
const router = express.Router();
const cotizacionController = require('../controllers/cotizacionController');
const { protect, authorize } = require('../middleware/auth');

// Crear cotización (solo Administrador)
router.post('/', protect, authorize('Administrador'), cotizacionController.createCotizacion);

// Listar cotizaciones de un cliente (solo Cliente)
router.get('/mis', protect, authorize('Cliente'), cotizacionController.getMisCotizaciones);

// Ver cotización por ID (Cliente o Admin)
router.get('/:id', protect, cotizacionController.getCotizacionById);

// Actualizar estado de cotización (solo Cliente)
router.patch('/:id', protect, authorize('Cliente'), cotizacionController.updateCotizacionEstado);

module.exports = router;
