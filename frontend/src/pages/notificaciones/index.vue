
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Enviar Notificación por WhatsApp</h2>

    <form @submit.prevent="sendWhatsApp" class="space-y-4">
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Número de Teléfono</label>
        <input type="tel" id="phone" v-model="notification.phone" placeholder="+521234567890" required
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-700">Mensaje</label>
        <textarea id="message" v-model="notification.message" rows="4" required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
      </div>

      <div>
        <label for="url" class="block text-sm font-medium text-gray-700">URL (Opcional)</label>
        <input type="url" id="url" v-model="notification.url" placeholder="https://ejemplo.com"
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
      </div>

      <div class="flex justify-end">
        <button type="submit"
                class="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Enviar WhatsApp
        </button>
      </div>
    </form>

    <div v-if="responseMessage" class="mt-4 p-3 rounded-md text-sm"
         :class="{'bg-green-100 text-green-800': responseSuccess, 'bg-red-100 text-red-800': !responseSuccess}">
      {{ responseMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const notification = ref({
  phone: '',
  message: '',
  url: '',
});

const responseMessage = ref(null);
const responseSuccess = ref(false);

const sendWhatsApp = () => {
  // Simular envío de WhatsApp
  console.log('Enviando WhatsApp:', notification.value);

  // Construir URL de WhatsApp (simulada)
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${notification.value.phone}&text=${encodeURIComponent(notification.value.message + (notification.value.url ? ' ' + notification.value.url : ''))}`;
  
  // Abrir en nueva pestaña (simulado)
  window.open(whatsappUrl, '_blank');

  responseSuccess.value = true;
  responseMessage.value = 'Mensaje de WhatsApp enviado (simulado)!';

  // Limpiar formulario
  notification.value.phone = '';
  notification.value.message = '';
  notification.value.url = '';
};
</script>
