const express = require('express');
const router = express.Router();
const rentaEquipoController = require('../controllers/rentaEquipoController');
const { protect, authorize } = require('../middleware/auth');

// Registrar uso de equipo (solo Administrador)
router.post('/', protect, authorize('Administrador'), rentaEquipoController.registrarUsoEquipo);

// Finalizar uso / devolver equipo (solo Administrador)
router.patch('/:id/finalizar', protect, authorize('Administrador'), rentaEquipoController.finalizarUsoEquipo);

// Listar rentas por pedido (Administrador o Cliente propietario del pedido)
router.get('/pedido/:idPedido', protect, rentaEquipoController.getRentalsByPedido);

module.exports = router;
