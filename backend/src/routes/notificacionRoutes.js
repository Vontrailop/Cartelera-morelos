const express = require('express');
const router = express.Router();
const notificacionController = require('../controllers/notificacionController');
const { protect, authorize } = require('../middleware/auth');

// Enviar notificación por WhatsApp (solo Administrador o un rol de 'Sistema' si lo tuvieras)
router.post('/whatsapp', protect, authorize('Administrador'), notificacionController.sendWhatsappNotification);

module.exports = router;
