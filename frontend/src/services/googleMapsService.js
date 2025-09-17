/**
 * Servicio para cargar y gestionar la API de Google Maps
 */

// API Key proporcionada
const API_KEY = 'AIzaSyAlZdW79XUOuAPhohsOsiyf7IN-H-t98-s';

// Variable para rastrear si la API ya está cargada
let isLoaded = false;
let loadPromise = null;

/**
 * Carga la API de Google Maps si aún no está cargada
 * @returns {Promise} Una promesa que se resuelve cuando la API está cargada
 */
export const loadGoogleMapsApi = () => {
  // Si ya tenemos una promesa de carga en curso, la devolvemos
  if (loadPromise) {
    return loadPromise;
  }

  // Si la API ya está cargada, devolvemos una promesa resuelta
  if (isLoaded && window.google && window.google.maps) {
    return Promise.resolve();
  }

  // Creamos una nueva promesa para cargar la API
  loadPromise = new Promise((resolve, reject) => {
    // Función de callback para cuando la API se carga
    window.initGoogleMapsApi = () => {
      isLoaded = true;
      resolve();
    };

    // Crear el script para cargar la API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initGoogleMapsApi`;
    script.async = true;
    script.defer = true;
    script.onerror = (error) => {
      reject(new Error('Error al cargar la API de Google Maps'));
    };

    // Añadir el script al documento
    document.head.appendChild(script);
  });

  return loadPromise;
};

/**
 * Verifica si la API de Google Maps está cargada
 * @returns {boolean} true si la API está cargada, false en caso contrario
 */
export const isGoogleMapsLoaded = () => {
  return isLoaded && window.google && window.google.maps;
};

/**
 * Crea una instancia de mapa de Google Maps
 * @param {HTMLElement} element - El elemento DOM donde se renderizará el mapa
 * @param {Object} options - Opciones de configuración del mapa
 * @returns {Promise<google.maps.Map>} Una promesa que se resuelve con la instancia del mapa
 */
export const createMap = async (element, options = {}) => {
  await loadGoogleMapsApi();
  return new window.google.maps.Map(element, options);
};

/**
 * Crea un marcador en el mapa
 * @param {Object} options - Opciones del marcador
 * @returns {google.maps.Marker} El marcador creado
 */
export const createMarker = (options) => {
  if (!isGoogleMapsLoaded()) {
    throw new Error('La API de Google Maps no está cargada');
  }
  return new window.google.maps.Marker(options);
};

export default {
  loadGoogleMapsApi,
  isGoogleMapsLoaded,
  createMap,
  createMarker
};