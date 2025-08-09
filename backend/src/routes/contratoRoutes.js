const express = require('express');
const router = express.Router();
const contratoController = require('../controllers/contratoController');
const { protect, authorize } = require('../middleware/auth');

// Crear contrato (solo Administrador)
router.post('/', protect, authorize('Administrador'), contratoController.createContrato);

// Listar contratos del cliente actual (solo Cliente)
router.get('/mis', protect, authorize('Cliente'), contratoController.getMisContratos);

// Consultar contrato por ID (Cliente o Administrador)
router.get('/:id', protect, contratoController.getContratoById);

// Finalizar contrato (solo Administrador)
router.patch('/:id/finalizar', protect, authorize('Administrador'), contratoController.finalizarContrato);

module.exports = router;
