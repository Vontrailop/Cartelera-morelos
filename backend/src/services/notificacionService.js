const Notificacion = require('../models/Notificacion');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client = new twilio(accountSid, authToken);

exports.sendWhatsappNotification = async (telefonoDestino, mensaje, urlOpcional = null, eventoRelacionado = null, idEvento = null) => {
  let estatusRespuesta = 'Error';
  let mensajeCompleto = mensaje;

  if (urlOpcional) {
    mensajeCompleto += `\n${urlOpcional}`;
  }

  try {
    await client.messages.create({
      body: mensajeCompleto,
      from: `whatsapp:${twilioWhatsappNumber}`,
      to: `whatsapp:${telefonoDestino}`
    });

    estatusRespuesta = 'Enviado';

  } catch (error) {
    console.error('Error al enviar notificación por WhatsApp con Twilio:', error.message);
    estatusRespuesta = `Error: ${error.message}`;
  }

  // Guardar historial de notificación
  const notificacion = new Notificacion({
    telefonoDestino,
    mensajeEnviado: mensajeCompleto,
    urlOpcional,
    estatusRespuesta,
    eventoRelacionado,
    idEvento
  });
  await notificacion.save();

  return { estatus: estatusRespuesta, mensaje: mensajeCompleto };
};