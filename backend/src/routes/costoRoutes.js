const express = require('express');
const router = express.Router();
const costoController = require('../controllers/costoController');
const { protect, authorize } = require('../middleware/auth');

// Agregar costo (solo Administrador)
router.post('/', protect, authorize('Administrador'), costoController.addCosto);

// Listar costos por pedido (Administrador o Cliente propietario del pedido)
router.get('/pedido/:idPedido', protect, costoController.getCostosByPedido);

// Eliminar costo (solo Administrador)
router.delete('/:id', protect, authorize('Administrador'), costoController.deleteCosto);

module.exports = router;
