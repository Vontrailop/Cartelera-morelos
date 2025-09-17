<template>
  <div class="w-full h-full">
    <!-- Contenedor del mapa -->
    <div class="w-full h-[600px] rounded-lg overflow-hidden shadow-md relative">
      <!-- Estado de carga -->
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p class="mt-2 text-gray-700">Cargando mapa...</p>
        </div>
      </div>
      
      <!-- Mensaje de error -->
      <div v-else-if="loadError" class="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
        <div class="text-center p-4 bg-white rounded-lg shadow-md max-w-md">
          <p class="text-red-500 font-medium">Error al cargar el mapa</p>
          <p class="mt-2 text-gray-600">{{ loadError }}</p>
          <button @click="retryLoading" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Reintentar
          </button>
        </div>
      </div>
      
      <!-- Contenedor del mapa -->
      <div ref="mapContainer" class="w-full h-full">
        <!-- El mapa se renderizará aquí -->
      </div>
    </div>

    <!-- Controles del mapa -->
    <div class="mt-4 flex flex-wrap gap-4">
      <!-- Selector de tipo de mapa -->
      <div class="flex items-center space-x-2">
        <label class="text-sm font-medium text-gray-700">Tipo de mapa:</label>
        <select 
          v-model="mapType" 
          class="px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          @change="changeMapType"
        >
          <option value="roadmap">Calles</option>
          <option value="satellite">Satélite</option>
          <option value="hybrid">Híbrido</option>
          <option value="terrain">Terreno</option>
        </select>
      </div>

      <!-- Botón para centrar en ubicación actual -->
      <button 
        @click="centerOnUserLocation" 
        class="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-1"
      >
        <span>Mi ubicación</span>
      </button>

      <!-- Botón para mostrar/ocultar todos los marcadores -->
      <button 
        @click="toggleAllMarkers" 
        class="px-4 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-1"
      >
        <span>{{ showAllMarkers ? 'Ocultar' : 'Mostrar' }} todos</span>
      </button>
    </div>

    <!-- Leyenda de marcadores -->
    <div class="mt-4 p-4 bg-white rounded-lg shadow-sm border">
      <h3 class="font-medium mb-2">Leyenda</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div 
          v-for="(category, index) in markerCategories" 
          :key="index"
          class="flex items-center space-x-2"
        >
          <div 
            class="w-4 h-4 rounded-full" 
            :style="{ backgroundColor: category.color }"
          ></div>
          <span class="text-sm">{{ category.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { loadGoogleMapsApi, createMap, createMarker } from '../../services/googleMapsService';

const props = defineProps({
  initialCenter: {
    type: Object,
    default: () => ({ lat: 18.9242, lng: -99.2216 }) // Coordenadas de Cuernavaca por defecto
  },
  initialZoom: {
    type: Number,
    default: 13
  },
  markers: {
    type: Array,
    default: () => []
  },
  height: {
    type: String,
    default: '600px'
  }
});

const emit = defineEmits(['marker-click', 'map-click', 'bounds-changed']);

// Referencias y estado
const mapContainer = ref(null);
const map = ref(null);
const mapMarkers = ref([]);
const mapType = ref('roadmap');
const showAllMarkers = ref(true);
const isLoading = ref(true);
const loadError = ref(null);

// Categorías de marcadores para la leyenda
const markerCategories = ref([
  { name: 'Espacios Físicos', color: '#4CAF50' },
  { name: 'Actividades', color: '#2196F3' },
  { name: 'Espacios Publicitarios', color: '#FF9800' },
  { name: 'Puntos de Interés', color: '#9C27B0' }
]);

// Función para cargar la API de Google Maps
const loadMap = async () => {
  try {
    isLoading.value = true;
    loadError.value = null;
    // Cargar la API de Google Maps
    await loadGoogleMapsApi();
    initMap();
    isLoading.value = false;
  } catch (error) {
    console.error('Error al cargar la API de Google Maps:', error);
    loadError.value = error.message;
    isLoading.value = false;
  }
};

// Función para reintentar la carga del mapa
const retryLoading = () => {
  loadMap();
};

// Inicializar el mapa cuando el componente se monta
onMounted(() => {
  loadMap();
});

// Limpiar recursos cuando el componente se desmonta
onUnmounted(() => {
  if (mapMarkers.value.length) {
    mapMarkers.value.forEach(marker => {
      marker.setMap(null);
    });
  }
});

// Observar cambios en los marcadores
watch(() => props.markers, (newMarkers) => {
  updateMarkers(newMarkers);
}, { deep: true });

// Inicializar el mapa
const initMap = async () => {
  const mapOptions = {
    center: props.initialCenter,
    zoom: props.initialZoom,
    mapTypeId: mapType.value,
    mapTypeControl: false,
    fullscreenControl: true,
    streetViewControl: true,
    zoomControl: true
  };

  map.value = await createMap(mapContainer.value, mapOptions);
  
  // Agregar evento de clic en el mapa
  map.value.addListener('click', (event) => {
    emit('map-click', {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  });

  // Agregar evento de cambio de límites
  map.value.addListener('bounds_changed', () => {
    const bounds = map.value.getBounds();
    if (bounds) {
      emit('bounds-changed', {
        north: bounds.getNorthEast().lat(),
        east: bounds.getNorthEast().lng(),
        south: bounds.getSouthWest().lat(),
        west: bounds.getSouthWest().lng()
      });
    }
  });

  // Agregar marcadores iniciales
  if (props.markers.length) {
    updateMarkers(props.markers);
  }
};

// Actualizar marcadores en el mapa
const updateMarkers = (markers) => {
  // Limpiar marcadores existentes
  if (mapMarkers.value.length) {
    mapMarkers.value.forEach(marker => {
      marker.setMap(null);
    });
  }
  mapMarkers.value = [];

  // Agregar nuevos marcadores
  markers.forEach(markerData => {
    const marker = createMarker({
      position: { lat: markerData.lat, lng: markerData.lng },
      map: showAllMarkers.value ? map.value : null,
      title: markerData.title || '',
      icon: markerData.icon || getMarkerIcon(markerData.type)
    });

    // Agregar evento de clic al marcador
    marker.addListener('click', () => {
      emit('marker-click', markerData);
    });

    // Agregar información al marcador
    if (markerData.info) {
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div class="p-2">
          <h3 class="font-bold">${markerData.title}</h3>
          <p>${markerData.info}</p>
        </div>`
      });

      marker.addListener('click', () => {
        infoWindow.open(map.value, marker);
      });
    }

    mapMarkers.value.push(marker);
  });
};

// Obtener icono personalizado según el tipo de marcador
const getMarkerIcon = (type) => {
  const icons = {
    'espacio': {
      path: window.google?.maps?.SymbolPath?.CIRCLE,
      fillColor: '#4CAF50',
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#FFFFFF',
      scale: 10
    },
    'actividad': {
      path: window.google?.maps?.SymbolPath?.CIRCLE,
      fillColor: '#2196F3',
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#FFFFFF',
      scale: 10
    },
    'publicidad': {
      path: window.google?.maps?.SymbolPath?.CIRCLE,
      fillColor: '#FF9800',
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#FFFFFF',
      scale: 10
    },
    'poi': {
      path: window.google?.maps?.SymbolPath?.CIRCLE,
      fillColor: '#9C27B0',
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#FFFFFF',
      scale: 10
    }
  };

  return icons[type] || null;
};

// Cambiar el tipo de mapa
const changeMapType = () => {
  if (map.value) {
    map.value.setMapTypeId(mapType.value);
  }
};

// Centrar el mapa en la ubicación del usuario
const centerOnUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        if (map.value) {
          map.value.setCenter(userLocation);
          map.value.setZoom(15);
          
          // Agregar marcador de ubicación actual
          new window.google.maps.Marker({
            position: userLocation,
            map: map.value,
            title: 'Tu ubicación',
            icon: {
              path: window.google?.maps?.SymbolPath?.CIRCLE,
              fillColor: '#1976D2',
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: '#FFFFFF',
              scale: 12
            }
          });
        }
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error);
        alert('No se pudo obtener tu ubicación actual.');
      }
    );
  } else {
    alert('Tu navegador no soporta geolocalización.');
  }
};

// Mostrar u ocultar todos los marcadores
const toggleAllMarkers = () => {
  showAllMarkers.value = !showAllMarkers.value;
  
  mapMarkers.value.forEach(marker => {
    marker.setMap(showAllMarkers.value ? map.value : null);
  });
};
</script>