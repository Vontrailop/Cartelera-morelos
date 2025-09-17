import { ref } from 'vue';
import axios from 'axios';

// URL base para las peticiones a la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Estado reactivo para las actividades
const actividades = ref([]);
const isLoading = ref(false);
const error = ref(null);

/**
 * Servicio para gestionar las actividades
 */
export const useActividadesService = () => {
  /**
   * Obtiene todas las actividades
   * @param {Object} params - Parámetros de filtrado opcionales
   */
  const getActividades = async (params = {}) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/actividades`, { params });
      actividades.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener las actividades';
      console.error('Error al obtener actividades:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene una actividad por su ID
   * @param {string|number} id - ID de la actividad
   */
  const getActividadById = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/actividades/${id}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener la actividad con ID ${id}`;
      console.error(`Error al obtener actividad ${id}:`, err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Crea una nueva actividad
   * @param {Object} actividad - Datos de la actividad a crear
   */
  const createActividad = async (actividad) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const formData = new FormData();
      
      // Agregar datos básicos
      Object.keys(actividad).forEach(key => {
        if (key !== 'imagen') {
          formData.append(key, typeof actividad[key] === 'object' ? 
            JSON.stringify(actividad[key]) : actividad[key]);
        }
      });
      
      // Agregar imagen si existe
      if (actividad.imagen) {
        formData.append('imagen', actividad.imagen);
      }
      
      const response = await axios.post(`${API_URL}/actividades`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Actualizar la lista de actividades
      await getActividades();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al crear la actividad';
      console.error('Error al crear actividad:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Actualiza una actividad existente
   * @param {string|number} id - ID de la actividad
   * @param {Object} actividad - Datos actualizados de la actividad
   */
  const updateActividad = async (id, actividad) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const formData = new FormData();
      
      // Agregar datos básicos
      Object.keys(actividad).forEach(key => {
        if (key !== 'imagen' && key !== 'nuevaImagen') {
          formData.append(key, typeof actividad[key] === 'object' ? 
            JSON.stringify(actividad[key]) : actividad[key]);
        }
      });
      
      // Agregar nueva imagen si existe
      if (actividad.nuevaImagen) {
        formData.append('nuevaImagen', actividad.nuevaImagen);
      }
      
      const response = await axios.put(`${API_URL}/actividades/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Actualizar la lista de actividades
      await getActividades();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al actualizar la actividad con ID ${id}`;
      console.error(`Error al actualizar actividad ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Elimina una actividad
   * @param {string|number} id - ID de la actividad a eliminar
   */
  const deleteActividad = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.delete(`${API_URL}/actividades/${id}`);
      // Actualizar la lista de actividades
      await getActividades();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al eliminar la actividad con ID ${id}`;
      console.error(`Error al eliminar actividad ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene actividades por categoría
   * @param {string|number} categoriaId - ID de la categoría
   */
  const getActividadesByCategoria = async (categoriaId) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/actividades/categoria/${categoriaId}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener actividades de la categoría ${categoriaId}`;
      console.error(`Error al obtener actividades de categoría ${categoriaId}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene actividades por espacio físico
   * @param {string|number} espacioId - ID del espacio físico
   */
  const getActividadesByEspacio = async (espacioId) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/actividades/espacio/${espacioId}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener actividades del espacio ${espacioId}`;
      console.error(`Error al obtener actividades del espacio ${espacioId}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene actividades por fecha
   * @param {string} fecha - Fecha en formato YYYY-MM-DD
   */
  const getActividadesByFecha = async (fecha) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/actividades/fecha/${fecha}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener actividades para la fecha ${fecha}`;
      console.error(`Error al obtener actividades para fecha ${fecha}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene actividades cercanas a una ubicación
   * @param {number} lat - Latitud
   * @param {number} lng - Longitud
   * @param {number} radio - Radio de búsqueda en kilómetros
   */
  const getActividadesCercanas = async (lat, lng, radio = 5) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/actividades/cercanas`, {
        params: { lat, lng, radio }
      });
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener actividades cercanas';
      console.error('Error al obtener actividades cercanas:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    actividades,
    isLoading,
    error,
    getActividades,
    getActividadById,
    createActividad,
    updateActividad,
    deleteActividad,
    getActividadesByCategoria,
    getActividadesByEspacio,
    getActividadesByFecha,
    getActividadesCercanas
  };
};