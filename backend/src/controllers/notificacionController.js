const notificacionService = require('../services/notificacionService');
const Joi = require('joi');

const sendWhatsappSchema = Joi.object({
  telefonoDestino: Joi.string().pattern(/^\+[1-9]\d{1,14}$/).required(), // E.164 format
  mensaje: Joi.string().min(1).required(),
  urlOpcional: Joi.string().uri().optional(),
  eventoRelacionado: Joi.string().optional(),
  idEvento: Joi.string().optional() // Asume que es un ObjectId válido si se proporciona
});

exports.sendWhatsappNotification = async (req, res) => {
  try {
    const { error } = sendWhatsappSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { telefonoDestino, mensaje, urlOpcional, eventoRelacionado, idEvento } = req.body;

    // Aquí puedes añadir lógica para reemplazar placeholders en el mensaje
    // Por ejemplo: mensaje.replace('{{nombre}}', 'Juan');

    const result = await notificacionService.sendWhatsappNotification(telefonoDestino, mensaje, urlOpcional, eventoRelacionado, idEvento);
    res.status(200).json({ message: 'Notificación enviada (o registrada) con éxito.', result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
