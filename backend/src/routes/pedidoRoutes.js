const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { protect, authorize } = require('../middleware/auth');

// Crear un pedido (solo clientes)
router.post('/', protect, authorize('Cliente'), pedidoController.createPedido);

// Obtener todos los pedidos de un usuario (solo clientes)
router.get('/mis', protect, authorize('Cliente'), pedidoController.getMisPedidos);

// Obtener todos los pedidos (solo administradores)
router.get('/', protect, authorize('Administrador'), pedidoController.getAllPedidos);

// Actualizar estado de pedido (solo administradores)
router.patch('/:id', protect, authorize('Administrador'), pedidoController.updatePedidoStatus);

// Asociar colaboradores a pedido por área (solo colaboradores)
router.post('/:id/postulaciones', protect, authorize('Colaborador'), pedidoController.postularColaborador);

module.exports = router;
