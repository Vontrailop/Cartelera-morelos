import { ref } from 'vue';
import axios from 'axios';

// URL base para las peticiones a la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Estado reactivo para los espacios publicitarios
const espaciosPublicitarios = ref([]);
const isLoading = ref(false);
const error = ref(null);

/**
 * Servicio para gestionar los espacios publicitarios
 */
export const useEspaciosPublicitariosService = () => {
  /**
   * Obtiene todos los espacios publicitarios
   * @param {Object} params - Parámetros de filtrado opcionales
   */
  const getEspaciosPublicitarios = async (params = {}) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/espacios-publicitarios`, { params });
      espaciosPublicitarios.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener los espacios publicitarios';
      console.error('Error al obtener espacios publicitarios:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene un espacio publicitario por su ID
   * @param {string|number} id - ID del espacio publicitario
   */
  const getEspacioPublicitarioById = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/espacios-publicitarios/${id}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener el espacio publicitario con ID ${id}`;
      console.error(`Error al obtener espacio publicitario ${id}:`, err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Crea un nuevo espacio publicitario
   * @param {Object} espacioPublicitario - Datos del espacio publicitario a crear
   */
  const createEspacioPublicitario = async (espacioPublicitario) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const formData = new FormData();
      
      // Agregar datos básicos
      Object.keys(espacioPublicitario).forEach(key => {
        if (key !== 'imagenes') {
          formData.append(key, espacioPublicitario[key]);
        }
      });
      
      // Agregar imágenes si existen
      if (espacioPublicitario.imagenes && espacioPublicitario.imagenes.length) {
        espacioPublicitario.imagenes.forEach((imagen) => {
          formData.append(`imagenes`, imagen);
        });
      }
      
      const response = await axios.post(`${API_URL}/espacios-publicitarios`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Actualizar la lista de espacios publicitarios
      await getEspaciosPublicitarios();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al crear el espacio publicitario';
      console.error('Error al crear espacio publicitario:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Actualiza un espacio publicitario existente
   * @param {string|number} id - ID del espacio publicitario
   * @param {Object} espacioPublicitario - Datos actualizados del espacio publicitario
   */
  const updateEspacioPublicitario = async (id, espacioPublicitario) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const formData = new FormData();
      
      // Agregar datos básicos
      Object.keys(espacioPublicitario).forEach(key => {
        if (key !== 'imagenes' && key !== 'nuevasImagenes' && key !== 'imagenesExistentes') {
          formData.append(key, espacioPublicitario[key]);
        }
      });
      
      // Agregar imágenes nuevas si existen
      if (espacioPublicitario.nuevasImagenes && espacioPublicitario.nuevasImagenes.length) {
        espacioPublicitario.nuevasImagenes.forEach((imagen) => {
          formData.append(`nuevasImagenes`, imagen);
        });
      }
      
      // Agregar IDs de imágenes a mantener
      if (espacioPublicitario.imagenesExistentes && espacioPublicitario.imagenesExistentes.length) {
        formData.append('imagenesExistentes', JSON.stringify(espacioPublicitario.imagenesExistentes));
      }
      
      const response = await axios.put(`${API_URL}/espacios-publicitarios/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Actualizar la lista de espacios publicitarios
      await getEspaciosPublicitarios();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al actualizar el espacio publicitario con ID ${id}`;
      console.error(`Error al actualizar espacio publicitario ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Elimina un espacio publicitario
   * @param {string|number} id - ID del espacio publicitario a eliminar
   */
  const deleteEspacioPublicitario = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.delete(`${API_URL}/espacios-publicitarios/${id}`);
      // Actualizar la lista de espacios publicitarios
      await getEspaciosPublicitarios();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al eliminar el espacio publicitario con ID ${id}`;
      console.error(`Error al eliminar espacio publicitario ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene espacios publicitarios por tipo
   * @param {string} tipo - Tipo de espacio publicitario
   */
  const getEspaciosPublicitariosByTipo = async (tipo) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/espacios-publicitarios/tipo/${tipo}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener espacios publicitarios de tipo ${tipo}`;
      console.error(`Error al obtener espacios publicitarios de tipo ${tipo}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene espacios publicitarios disponibles en un rango de fechas
   * @param {string} fechaInicio - Fecha de inicio (formato ISO)
   * @param {string} fechaFin - Fecha de fin (formato ISO)
   */
  const getEspaciosPublicitariosDisponibles = async (fechaInicio, fechaFin) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/espacios-publicitarios/disponibles`, {
        params: { fechaInicio, fechaFin }
      });
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener espacios publicitarios disponibles';
      console.error('Error al obtener espacios publicitarios disponibles:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Verifica disponibilidad de un espacio publicitario en un rango de fechas
   * @param {string|number} id - ID del espacio publicitario
   * @param {string} fechaInicio - Fecha de inicio (formato ISO)
   * @param {string} fechaFin - Fecha de fin (formato ISO)
   */
  const verificarDisponibilidad = async (id, fechaInicio, fechaFin) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/espacios-publicitarios/${id}/disponibilidad`, {
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

  /**
   * Obtiene espacios publicitarios cercanos a una ubicación
   * @param {number} lat - Latitud
   * @param {number} lng - Longitud
   * @param {number} radio - Radio de búsqueda en kilómetros
   */
  const getEspaciosPublicitariosCercanos = async (lat, lng, radio = 5) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/espacios-publicitarios/cercanos`, {
        params: { lat, lng, radio }
      });
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener espacios publicitarios cercanos';
      console.error('Error al obtener espacios publicitarios cercanos:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    espaciosPublicitarios,
    isLoading,
    error,
    getEspaciosPublicitarios,
    getEspacioPublicitarioById,
    createEspacioPublicitario,
    updateEspacioPublicitario,
    deleteEspacioPublicitario,
    getEspaciosPublicitariosByTipo,
    getEspaciosPublicitariosDisponibles,
    verificarDisponibilidad,
    getEspaciosPublicitariosCercanos
  };
};