import { ref } from 'vue';
import axios from 'axios';

// URL base para las peticiones a la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Estado reactivo para las ubicaciones
const ubicaciones = ref([]);
const isLoading = ref(false);
const error = ref(null);

/**
 * Servicio para gestionar el mapa y las ubicaciones
 */
export const useMapaService = () => {
  /**
   * Obtiene todas las ubicaciones para el mapa
   * @param {Object} params - Parámetros de filtrado opcionales
   */
  const getUbicaciones = async (params = {}) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/ubicaciones`, { params });
      ubicaciones.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener las ubicaciones';
      console.error('Error al obtener ubicaciones:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene ubicaciones cercanas a un punto
   * @param {number} lat - Latitud
   * @param {number} lng - Longitud
   * @param {number} radio - Radio de búsqueda en kilómetros
   * @param {Object} filtros - Filtros adicionales (tipo, categoría, etc.)
   */
  const getUbicacionesCercanas = async (lat, lng, radio = 5, filtros = {}) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/ubicaciones/cercanas`, {
        params: { lat, lng, radio, ...filtros }
      });
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener ubicaciones cercanas';
      console.error('Error al obtener ubicaciones cercanas:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene ubicaciones por tipo
   * @param {string} tipo - Tipo de ubicación (espacio, actividad, publicidad, poi)
   */
  const getUbicacionesPorTipo = async (tipo) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/ubicaciones/tipo/${tipo}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener ubicaciones de tipo ${tipo}`;
      console.error(`Error al obtener ubicaciones de tipo ${tipo}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene ubicaciones por categoría
   * @param {string|number} categoriaId - ID de la categoría
   */
  const getUbicacionesPorCategoria = async (categoriaId) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/ubicaciones/categoria/${categoriaId}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener ubicaciones de la categoría ${categoriaId}`;
      console.error(`Error al obtener ubicaciones de categoría ${categoriaId}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Busca ubicaciones por texto
   * @param {string} texto - Texto a buscar
   */
  const buscarUbicaciones = async (texto) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/ubicaciones/buscar`, {
        params: { q: texto }
      });
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al buscar ubicaciones con texto "${texto}"`;
      console.error(`Error al buscar ubicaciones con texto "${texto}":`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene puntos de interés
   */
  const getPuntosInteres = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/puntos-interes`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener puntos de interés';
      console.error('Error al obtener puntos de interés:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene la dirección a partir de coordenadas (geocodificación inversa)
   * @param {number} lat - Latitud
   * @param {number} lng - Longitud
   */
  const getDireccionDesdeCoords = async (lat, lng) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/geocoding/inverso`, {
        params: { lat, lng }
      });
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener dirección desde coordenadas';
      console.error('Error al obtener dirección desde coordenadas:', err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene coordenadas a partir de una dirección (geocodificación)
   * @param {string} direccion - Dirección a geocodificar
   */
  const getCoordsDesdeDir = async (direccion) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/geocoding`, {
        params: { direccion }
      });
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener coordenadas para "${direccion}"`;
      console.error(`Error al obtener coordenadas para "${direccion}":`, err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene ubicaciones filtradas por múltiples criterios
   * @param {Object} filtros - Objeto con los filtros a aplicar
   */
  const filtrarUbicaciones = async (filtros = {}) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/ubicaciones/filtrar`, { params: filtros });
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al filtrar ubicaciones';
      console.error('Error al filtrar ubicaciones:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    ubicaciones,
    isLoading,
    error,
    getUbicaciones,
    getUbicacionesCercanas,
    getUbicacionesPorTipo,
    getUbicacionesPorCategoria,
    buscarUbicaciones,
    getPuntosInteres,
    getDireccionDesdeCoords,
    getCoordsDesdeDir,
    filtrarUbicaciones
  };
};