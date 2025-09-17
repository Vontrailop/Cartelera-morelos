import { ref } from 'vue';
import axios from 'axios';

// URL base para las peticiones a la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Estado reactivo para los espacios físicos
const espaciosFisicos = ref([]);
const isLoading = ref(false);
const error = ref(null);

/**
 * Servicio para gestionar los espacios físicos
 */
export const useEspaciosFisicosService = () => {
  /**
   * Obtiene todos los espacios físicos
   * @param {Object} params - Parámetros de filtrado opcionales
   */
  const getEspaciosFisicos = async (params = {}) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/espacios-fisicos`, { params });
      espaciosFisicos.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener los espacios físicos';
      console.error('Error al obtener espacios físicos:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene un espacio físico por su ID
   * @param {string|number} id - ID del espacio físico
   */
  const getEspacioFisicoById = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/espacios-fisicos/${id}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener el espacio físico con ID ${id}`;
      console.error(`Error al obtener espacio físico ${id}:`, err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Crea un nuevo espacio físico
   * @param {Object} espacioFisico - Datos del espacio físico a crear
   */
  const createEspacioFisico = async (espacioFisico) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const formData = new FormData();
      
      // Agregar datos básicos
      Object.keys(espacioFisico).forEach(key => {
        if (key !== 'imagenes') {
          formData.append(key, espacioFisico[key]);
        }
      });
      
      // Agregar imágenes si existen
      if (espacioFisico.imagenes && espacioFisico.imagenes.length) {
        espacioFisico.imagenes.forEach((imagen, index) => {
          formData.append(`imagenes`, imagen);
        });
      }
      
      const response = await axios.post(`${API_URL}/espacios-fisicos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Actualizar la lista de espacios físicos
      await getEspaciosFisicos();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al crear el espacio físico';
      console.error('Error al crear espacio físico:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Actualiza un espacio físico existente
   * @param {string|number} id - ID del espacio físico
   * @param {Object} espacioFisico - Datos actualizados del espacio físico
   */
  const updateEspacioFisico = async (id, espacioFisico) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const formData = new FormData();
      
      // Agregar datos básicos
      Object.keys(espacioFisico).forEach(key => {
        if (key !== 'imagenes') {
          formData.append(key, espacioFisico[key]);
        }
      });
      
      // Agregar imágenes nuevas si existen
      if (espacioFisico.nuevasImagenes && espacioFisico.nuevasImagenes.length) {
        espacioFisico.nuevasImagenes.forEach((imagen) => {
          formData.append(`nuevasImagenes`, imagen);
        });
      }
      
      // Agregar IDs de imágenes a mantener
      if (espacioFisico.imagenesExistentes && espacioFisico.imagenesExistentes.length) {
        formData.append('imagenesExistentes', JSON.stringify(espacioFisico.imagenesExistentes));
      }
      
      const response = await axios.put(`${API_URL}/espacios-fisicos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Actualizar la lista de espacios físicos
      await getEspaciosFisicos();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al actualizar el espacio físico con ID ${id}`;
      console.error(`Error al actualizar espacio físico ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Elimina un espacio físico
   * @param {string|number} id - ID del espacio físico a eliminar
   */
  const deleteEspacioFisico = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.delete(`${API_URL}/espacios-fisicos/${id}`);
      // Actualizar la lista de espacios físicos
      await getEspaciosFisicos();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al eliminar el espacio físico con ID ${id}`;
      console.error(`Error al eliminar espacio físico ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene espacios físicos por categoría
   * @param {string|number} categoriaId - ID de la categoría
   */
  const getEspaciosFisicosByCategoria = async (categoriaId) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/espacios-fisicos/categoria/${categoriaId}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener espacios físicos de la categoría ${categoriaId}`;
      console.error(`Error al obtener espacios físicos de categoría ${categoriaId}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene espacios físicos cercanos a una ubicación
   * @param {number} lat - Latitud
   * @param {number} lng - Longitud
   * @param {number} radio - Radio de búsqueda en kilómetros
   */
  const getEspaciosFisicosCercanos = async (lat, lng, radio = 5) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/espacios-fisicos/cercanos`, {
        params: { lat, lng, radio }
      });
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener espacios físicos cercanos';
      console.error('Error al obtener espacios físicos cercanos:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Verifica disponibilidad de un espacio físico en un rango de fechas
   * @param {string|number} id - ID del espacio físico
   * @param {string} fechaInicio - Fecha de inicio (formato ISO)
   * @param {string} fechaFin - Fecha de fin (formato ISO)
   */
  const verificarDisponibilidad = async (id, fechaInicio, fechaFin) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/espacios-fisicos/${id}/disponibilidad`, {
        params: { fechaInicio, fechaFin }
      });
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al verificar disponibilidad';
      console.error('Error al verificar disponibilidad:', err);
      return { disponible: false, conflictos: [] };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    espaciosFisicos,
    isLoading,
    error,
    getEspaciosFisicos,
    getEspacioFisicoById,
    createEspacioFisico,
    updateEspacioFisico,
    deleteEspacioFisico,
    getEspaciosFisicosByCategoria,
    getEspaciosFisicosCercanos,
    verificarDisponibilidad
  };
};