<template>
  <div class="mapa-navegacion-container p-4" :class="{ 'dark-theme': temaOscuro }">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-primary">Mapa de Navegación - Cartelera Morelos</h2>
      <button @click="cambiarTema" class="px-3 py-2 rounded-md text-sm font-medium" :class="temaOscuro ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'">
        <span v-if="temaOscuro"><i class="fas fa-sun"></i> Modo Claro</span>
        <span v-else><i class="fas fa-moon"></i> Modo Oscuro</span>
      </button>
    </div>
    
    <div class="flex flex-col md:flex-row md:justify-between mb-8 gap-4">
      <div class="inline-flex rounded-md shadow-sm">
        <button 
          v-for="(tipo, index) in tiposVista" 
          :key="index"
          @click="vistaActual = tipo.valor"
          :class="[
            'px-4 py-2 text-sm font-medium border',
            vistaActual === tipo.valor ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50',
            index === 0 ? 'rounded-l-lg' : '',
            index === tiposVista.length - 1 ? 'rounded-r-lg' : ''
          ]"
        >
          {{ tipo.nombre }}
        </button>
      </div>
      
      <div class="flex items-center">
        <label class="inline-flex items-center cursor-pointer mr-4">
          <input type="checkbox" v-model="mostrarLeyenda" class="sr-only peer">
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          <span class="ml-3 text-sm font-medium">Mostrar leyenda</span>
        </label>
      </div>
    </div>
    
    <!-- Leyenda del mapa -->
    <div v-if="mostrarLeyenda" class="mb-8">
      <LeyendaMapa :tema-oscuro="temaOscuro" />
    </div>

    <!-- Vista de Árbol -->
    <div v-if="vistaActual === 'arbol'" class="tree-view bg-white p-6 rounded-lg shadow-md">
      <div class="flex justify-center">
        <div class="node main-node">
          <div class="node-content">
            <span class="node-icon"><i class="fas fa-home"></i></span>
            <span class="node-label">Inicio</span>
          </div>
          <div class="children">
            <div v-for="(modulo, index) in modulos" :key="modulo.nombre || `modulo-${index}`" class="node">
              <div class="node-content">
                <span class="node-icon"><i :class="modulo.icono"></i></span>
                <span class="node-label">{{ modulo.nombre }}</span>
              </div>
              <div class="children" v-if="modulo.subpaginas && modulo.subpaginas.length">
                <div v-for="(subpagina, subIndex) in modulo.subpaginas" :key="subpagina.nombre || `${modulo.nombre}-subpagina-${subIndex}`" class="node">
                  <div class="node-content">
                    <span class="node-icon"><i :class="subpagina.icono"></i></span>
                    <span class="node-label">{{ subpagina.nombre }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista de Flujo -->
    <div v-else-if="vistaActual === 'flujo'" class="flow-view bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <div class="min-w-[800px]">
        <div v-for="(flujo, index) in flujos" :key="flujo.nombre || `flujo-${index}`" class="mb-10">
          <h3 class="text-xl font-semibold mb-4 text-primary">{{ flujo.nombre }}</h3>
          <div class="flow-diagram">
            <div v-for="(paso, pasoIndex) in flujo.pasos" :key="paso.nombre || `${flujo.nombre}-paso-${pasoIndex}`" class="flow-step">
              <div class="flow-node" :class="{'start-node': pasoIndex === 0, 'end-node': pasoIndex === flujo.pasos.length - 1}">
                <span class="flow-icon"><i :class="paso.icono"></i></span>
                <span class="flow-label">{{ paso.nombre }}</span>
              </div>
              <div v-if="pasoIndex < flujo.pasos.length - 1" class="flow-arrow">
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista de Módulos -->
    <div v-else class="modules-view grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(modulo, index) in modulos" :key="modulo.nombre || `modulo-card-${index}`" class="module-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div class="flex items-center mb-4">
          <span class="module-icon mr-3 text-2xl text-primary"><i :class="modulo.icono"></i></span>
          <h3 class="text-xl font-semibold">{{ modulo.nombre }}</h3>
        </div>
        <p class="text-gray-600 mb-4">{{ modulo.descripcion }}</p>
        <div v-if="modulo.subpaginas && modulo.subpaginas.length" class="mt-4">
          <h4 class="text-sm font-medium text-gray-500 mb-2">Páginas relacionadas:</h4>
          <ul class="space-y-1">
            <li v-for="(subpagina, subIndex) in modulo.subpaginas" :key="subpagina.nombre || `${modulo.nombre}-subpagina-item-${subIndex}`" class="text-sm">
              <span class="inline-block w-5 text-primary"><i :class="subpagina.icono"></i></span>
              {{ subpagina.nombre }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-8 text-center">
      <div class="flex justify-center space-x-4 mb-4">
        <button @click="exportarMapa('png')" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
          <i class="fas fa-download mr-2"></i> Exportar como PNG
        </button>
        <button @click="exportarMapa('pdf')" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
          <i class="fas fa-file-pdf mr-2"></i> Exportar como PDF
        </button>
      </div>
      <p class="text-sm text-gray-500">
        Este mapa de navegación muestra la estructura general del sistema Cartelera Morelos.
        <br>Para más detalles, consulte la documentación completa.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import '@/assets/css/mapa-navegacion.css';
import LeyendaMapa from './LeyendaMapa.vue';

// Tipos de vista disponibles
const tiposVista = [
  { nombre: 'Módulos', valor: 'modulos' },
  { nombre: 'Árbol', valor: 'arbol' },
  { nombre: 'Flujo', valor: 'flujo' }
];

// Vista actual seleccionada
const vistaActual = ref('modulos');

// Tema actual
const temaOscuro = ref(false);

// Control de visibilidad de la leyenda
const mostrarLeyenda = ref(false);

// Cambiar tema
const cambiarTema = () => {
  temaOscuro.value = !temaOscuro.value;
};

// Detectar preferencia de tema del sistema
onMounted(() => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    temaOscuro.value = true;
  }
});

// Función para exportar el mapa como imagen o PDF
const exportarMapa = (formato) => {
  // Obtener el elemento que contiene el mapa según la vista actual
  let elementoMapa;
  if (vistaActual.value === 'arbol') {
    elementoMapa = document.querySelector('.tree-view');
  } else if (vistaActual.value === 'flujo') {
    elementoMapa = document.querySelector('.flow-view');
  } else {
    elementoMapa = document.querySelector('.modules-view');
  }
  
  // Simulación de exportación (en una implementación real se usaría html2canvas, jsPDF u otra biblioteca)
  alert(`Exportando mapa en formato ${formato}. En una implementación real, aquí se generaría y descargaría el archivo.`);
  
  // Ejemplo de código que se implementaría con las bibliotecas adecuadas:
  /*
  if (formato === 'png') {
    html2canvas(elementoMapa).then(canvas => {
      const link = document.createElement('a');
      link.download = `mapa-navegacion-cartelera-morelos.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  } else if (formato === 'pdf') {
    html2canvas(elementoMapa).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('mapa-navegacion-cartelera-morelos.pdf');
    });
  }
  */
};

// Datos de los módulos del sistema
const modulos = [
  {
    nombre: 'Inicio',
    icono: 'fas fa-home',
    descripcion: 'Página principal con resumen de actividades y espacios destacados.',
    ruta: '/',
    subpaginas: []
  },
  {
    nombre: 'Espacios Físicos',
    icono: 'fas fa-map-marker-alt',
    descripcion: 'Gestión de espacios físicos disponibles en Morelos.',
    ruta: '/espacios-fisicos',
    subpaginas: [
      { nombre: 'Listado', icono: 'fas fa-list', ruta: '/espacios-fisicos' },
      { nombre: 'Detalle', icono: 'fas fa-info-circle', ruta: '/espacios-fisicos/:id' },
      { nombre: 'Crear/Editar', icono: 'fas fa-edit', ruta: '/espacios-fisicos/editar/:id?' }
    ]
  },
  {
    nombre: 'Actividades',
    icono: 'fas fa-calendar-alt',
    descripcion: 'Gestión de actividades y eventos en los espacios.',
    ruta: '/actividades',
    subpaginas: [
      { nombre: 'Listado', icono: 'fas fa-list', ruta: '/actividades' },
      { nombre: 'Detalle', icono: 'fas fa-info-circle', ruta: '/actividades/:id' },
      { nombre: 'Crear/Editar', icono: 'fas fa-edit', ruta: '/actividades/editar/:id?' },
      { nombre: 'Calendario', icono: 'fas fa-calendar', ruta: '/actividades/calendario' }
    ]
  },
  {
    nombre: 'Espacios Publicitarios',
    icono: 'fas fa-ad',
    descripcion: 'Gestión de espacios disponibles para publicidad.',
    ruta: '/espacios-publicitarios',
    subpaginas: [
      { nombre: 'Listado', icono: 'fas fa-list', ruta: '/espacios-publicitarios' },
      { nombre: 'Detalle', icono: 'fas fa-info-circle', ruta: '/espacios-publicitarios/:id' },
      { nombre: 'Crear/Editar', icono: 'fas fa-edit', ruta: '/espacios-publicitarios/editar/:id?' }
    ]
  },
  {
    nombre: 'Rentas Publicitarias',
    icono: 'fas fa-handshake',
    descripcion: 'Gestión de rentas de espacios publicitarios.',
    ruta: '/rentas-publicitarias',
    subpaginas: [
      { nombre: 'Listado', icono: 'fas fa-list', ruta: '/rentas-publicitarias' },
      { nombre: 'Detalle', icono: 'fas fa-info-circle', ruta: '/rentas-publicitarias/:id' },
      { nombre: 'Crear/Editar', icono: 'fas fa-edit', ruta: '/rentas-publicitarias/editar/:id?' }
    ]
  },
  {
    nombre: 'Pagos',
    icono: 'fas fa-money-bill-wave',
    descripcion: 'Gestión de pagos relacionados con rentas y servicios.',
    ruta: '/pagos',
    subpaginas: [
      { nombre: 'Listado', icono: 'fas fa-list', ruta: '/pagos' },
      { nombre: 'Detalle', icono: 'fas fa-info-circle', ruta: '/pagos/:id' },
      { nombre: 'Crear/Editar', icono: 'fas fa-edit', ruta: '/pagos/editar/:id?' }
    ]
  },
  {
    nombre: 'Categorías',
    icono: 'fas fa-tags',
    descripcion: 'Gestión de categorías para espacios y actividades.',
    ruta: '/categorias',
    subpaginas: [
      { nombre: 'Listado', icono: 'fas fa-list', ruta: '/categorias' },
      { nombre: 'Crear/Editar', icono: 'fas fa-edit', ruta: '/categorias/editar/:id?' }
    ]
  },
  {
    nombre: 'Mapa Interactivo',
    icono: 'fas fa-map',
    descripcion: 'Visualización geográfica de espacios y actividades.',
    ruta: '/mapa',
    subpaginas: []
  },
  {
    nombre: 'Usuarios',
    icono: 'fas fa-users',
    descripcion: 'Gestión de usuarios y permisos del sistema.',
    ruta: '/usuarios',
    subpaginas: [
      { nombre: 'Listado', icono: 'fas fa-list', ruta: '/usuarios' },
      { nombre: 'Perfil', icono: 'fas fa-user', ruta: '/usuarios/perfil' },
      { nombre: 'Crear/Editar', icono: 'fas fa-user-edit', ruta: '/usuarios/editar/:id?' }
    ]
  }
];

// Datos de los flujos de navegación principales
const flujos = [
  {
    nombre: 'Flujo de Gestión de Actividades',
    pasos: [
      { nombre: 'Listado de Actividades', icono: 'fas fa-list' },
      { nombre: 'Crear Actividad', icono: 'fas fa-plus-circle' },
      { nombre: 'Seleccionar Espacio', icono: 'fas fa-map-marker-alt' },
      { nombre: 'Configurar Detalles', icono: 'fas fa-cog' },
      { nombre: 'Publicar Actividad', icono: 'fas fa-check-circle' }
    ]
  },
  {
    nombre: 'Flujo de Renta Publicitaria',
    pasos: [
      { nombre: 'Espacios Disponibles', icono: 'fas fa-ad' },
      { nombre: 'Seleccionar Espacio', icono: 'fas fa-hand-pointer' },
      { nombre: 'Configurar Renta', icono: 'fas fa-file-contract' },
      { nombre: 'Realizar Pago', icono: 'fas fa-money-bill-wave' },
      { nombre: 'Confirmar Renta', icono: 'fas fa-check-circle' }
    ]
  },
  {
    nombre: 'Flujo de Usuario',
    pasos: [
      { nombre: 'Registro', icono: 'fas fa-user-plus' },
      { nombre: 'Inicio de Sesión', icono: 'fas fa-sign-in-alt' },
      { nombre: 'Explorar Contenido', icono: 'fas fa-search' },
      { nombre: 'Interactuar', icono: 'fas fa-comments' },
      { nombre: 'Gestionar Perfil', icono: 'fas fa-user-cog' }
    ]
  }
];
</script>

<style scoped>
/* Estilos para la vista de árbol */
.tree-view {
  overflow-x: auto;
}

.node {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
}

.node-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  min-width: 120px;
  transition: all 0.2s;
}

.main-node .node-content {
  background-color: #4f46e5;
  color: white;
}

.node-icon {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.node-label {
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
}

.children {
  display: flex;
  margin-top: 20px;
  position: relative;
}

.children::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  height: 20px;
  width: 1px;
  background-color: #d1d5db;
}

.node .children .node::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  height: 20px;
  width: 1px;
  background-color: #d1d5db;
}

/* Estilos para la vista de flujo */
.flow-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.flow-step {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  min-width: 120px;
  transition: all 0.2s;
}

.start-node {
  background-color: #10b981;
  color: white;
}

.end-node {
  background-color: #4f46e5;
  color: white;
}

.flow-icon {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.flow-label {
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
}

.flow-arrow {
  margin: 0 15px;
  color: #9ca3af;
  font-size: 1.25rem;
}

/* Estilos para la vista de módulos */
.module-card {
  transition: all 0.3s ease;
}

.module-card:hover {
  transform: translateY(-5px);
}

.module-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f3f4f6;
}

@media (max-width: 768px) {
  .flow-diagram {
    flex-direction: column;
  }
  
  .flow-step {
    flex-direction: column;
  }
  
  .flow-arrow {
    transform: rotate(90deg);
    margin: 10px 0;
  }
}
</style>