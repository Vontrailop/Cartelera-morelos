import { ref } from 'vue';

// Esta es una estructura básica. La implementación completa requiere
// el SDK de Google Maps cargado en tu index.html o de forma asíncrona.

export function useMap() {
  const map = ref(null);
  const markers = ref([]);

  // Debes añadir el SDK de Google Maps a tu index.html
  // <script src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY"></script>

  const initMap = (elementId, options) => {
    if (!window.google) {
      console.error('El SDK de Google Maps no está cargado.');
      return;
    }
    map.value = new window.google.maps.Map(document.getElementById(elementId), {
      center: { lat: 18.851, lng: -99.203 }, // Centro en Morelos
      zoom: 10,
      ...options,
    });
  };

  const addMarkers = (locations) => {
    // Limpiar marcadores anteriores
    markers.value.forEach(marker => marker.setMap(null));
    markers.value = [];

    if (!map.value) return;

    locations.forEach(location => {
      // Asumimos que cada location tiene lat y lng
      if (location.lat && location.lng) {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map.value,
          title: location.nombre, // Asumimos que tiene un nombre
        });

        // Opcional: Añadir un InfoWindow
        const infowindow = new window.google.maps.InfoWindow({
          content: `<h6>${location.nombre}</h6>`,
        });

        marker.addListener('click', () => {
          infowindow.open(map.value, marker);
        });

        markers.value.push(marker);
      }
    });
  };

  return {
    map,
    initMap,
    addMarkers,
  };
}
