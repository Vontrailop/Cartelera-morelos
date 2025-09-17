<template>
  <div class="stepper-container">
    <nav aria-label="Progress">
      <ol role="list" class="space-y-4 md:flex md:space-y-0 md:space-x-8">
        <li v-for="(step, stepIdx) in steps" :key="step.name" class="md:flex-1">
          <div 
            class="group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
            :class="[
              stepIdx < currentStep
                ? 'border-primary'
                : stepIdx === currentStep
                ? 'border-primary'
                : 'border-gray-200'
            ]"
          >
            <span 
              class="text-sm font-medium"
              :class="[
                stepIdx < currentStep
                  ? 'text-primary'
                  : stepIdx === currentStep
                  ? 'text-primary'
                  : 'text-gray-500'
              ]"
            >
              {{ `Paso ${stepIdx + 1}` }}
            </span>
            <span class="text-sm font-medium">
              {{ step.name }}
            </span>
            <span 
              v-if="step.description" 
              class="text-sm"
              :class="[
                stepIdx < currentStep
                  ? 'text-gray-600'
                  : stepIdx === currentStep
                  ? 'text-gray-600'
                  : 'text-gray-400'
              ]"
            >
              {{ step.description }}
            </span>
          </div>
        </li>
      </ol>
    </nav>

    <!-- Contenido del paso actual -->
    <div class="mt-8">
      <slot></slot>
    </div>

    <!-- Botones de navegación -->
    <div class="mt-8 flex justify-between">
      <button
        v-if="currentStep > 0"
        @click="goToPreviousStep"
        type="button"
        class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Anterior
      </button>
      <div v-else></div>

      <button
        v-if="currentStep < steps.length - 1"
        @click="goToNextStep"
        type="button"
        class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :disabled="!canProceed"
      >
        Siguiente
      </button>
      <button
        v-else
        @click="finish"
        type="button"
        class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :disabled="!canProceed"
      >
        Finalizar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  steps: {
    type: Array,
    required: true,
    // Cada paso debe tener: { name: string, description?: string }
  },
  initialStep: {
    type: Number,
    default: 0
  },
  canProceed: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['step-change', 'finish']);

const currentStep = ref(props.initialStep);

const goToNextStep = () => {
  if (currentStep.value < props.steps.length - 1) {
    currentStep.value++;
    emit('step-change', currentStep.value);
  }
};

const goToPreviousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
    emit('step-change', currentStep.value);
  }
};

const finish = () => {
  emit('finish');
};

// Exponer métodos para controlar el stepper desde el componente padre
defineExpose({
  goToNextStep,
  goToPreviousStep,
  setStep: (step) => {
    if (step >= 0 && step < props.steps.length) {
      currentStep.value = step;
      emit('step-change', currentStep.value);
    }
  },
  getCurrentStep: () => currentStep.value
});
</script>