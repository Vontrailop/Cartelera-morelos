import { ref } from 'vue';
import axios from 'axios';

// URL base para las peticiones a la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Estado reactivo para las rentas publicitarias
const rentasPublicitarias = ref([]);
const isLoading = ref(false);
const error = ref(null);

/**
 * Servicio para gestionar las rentas publicitarias
 */
export const useRentasPublicitariasService = () => {
  /**
   * Obtiene todas las rentas publicitarias
   * @param {Object} params - Parámetros de filtrado opcionales
   */
  const getRentasPublicitarias = async (params = {}) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/rentas-publicitarias`, { params });
      rentasPublicitarias.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener las rentas publicitarias';
      console.error('Error al obtener rentas publicitarias:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene una renta publicitaria por su ID
   * @param {string|number} id - ID de la renta publicitaria
   */
  const getRentaPublicitariaById = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/rentas-publicitarias/${id}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener la renta publicitaria con ID ${id}`;
      console.error(`Error al obtener renta publicitaria ${id}:`, err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Crea una nueva renta publicitaria
   * @param {Object} rentaPublicitaria - Datos de la renta publicitaria a crear
   */
  const createRentaPublicitaria = async (rentaPublicitaria) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const formData = new FormData();
      
      // Agregar datos básicos
      Object.keys(rentaPublicitaria).forEach(key => {
        if (key !== 'imagen') {
          formData.append(key, typeof rentaPublicitaria[key] === 'object' ? 
            JSON.stringify(rentaPublicitaria[key]) : rentaPublicitaria[key]);
        }
      });
      
      // Agregar imagen si existe
      if (rentaPublicitaria.imagen) {
        formData.append('imagen', rentaPublicitaria.imagen);
      }
      
      const response = await axios.post(`${API_URL}/rentas-publicitarias`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Actualizar la lista de rentas publicitarias
      await getRentasPublicitarias();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al crear la renta publicitaria';
      console.error('Error al crear renta publicitaria:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Actualiza una renta publicitaria existente
   * @param {string|number} id - ID de la renta publicitaria
   * @param {Object} rentaPublicitaria - Datos actualizados de la renta publicitaria
   */
  const updateRentaPublicitaria = async (id, rentaPublicitaria) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const formData = new FormData();
      
      // Agregar datos básicos
      Object.keys(rentaPublicitaria).forEach(key => {
        if (key !== 'imagen' && key !== 'nuevaImagen') {
          formData.append(key, typeof rentaPublicitaria[key] === 'object' ? 
            JSON.stringify(rentaPublicitaria[key]) : rentaPublicitaria[key]);
        }
      });
      
      // Agregar nueva imagen si existe
      if (rentaPublicitaria.nuevaImagen) {
        formData.append('nuevaImagen', rentaPublicitaria.nuevaImagen);
      }
      
      const response = await axios.put(`${API_URL}/rentas-publicitarias/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Actualizar la lista de rentas publicitarias
      await getRentasPublicitarias();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al actualizar la renta publicitaria con ID ${id}`;
      console.error(`Error al actualizar renta publicitaria ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Elimina una renta publicitaria
   * @param {string|number} id - ID de la renta publicitaria a eliminar
   */
  const deleteRentaPublicitaria = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.delete(`${API_URL}/rentas-publicitarias/${id}`);
      // Actualizar la lista de rentas publicitarias
      await getRentasPublicitarias();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al eliminar la renta publicitaria con ID ${id}`;
      console.error(`Error al eliminar renta publicitaria ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene rentas publicitarias por cliente
   * @param {string|number} clienteId - ID del cliente
   */
  const getRentasPublicitariasByCliente = async (clienteId) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/rentas-publicitarias/cliente/${clienteId}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener rentas publicitarias del cliente ${clienteId}`;
      console.error(`Error al obtener rentas publicitarias del cliente ${clienteId}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene rentas publicitarias por espacio publicitario
   * @param {string|number} espacioId - ID del espacio publicitario
   */
  const getRentasPublicitariasByEspacio = async (espacioId) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/rentas-publicitarias/espacio/${espacioId}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener rentas publicitarias del espacio ${espacioId}`;
      console.error(`Error al obtener rentas publicitarias del espacio ${espacioId}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene rentas publicitarias por estado
   * @param {string} estado - Estado de la renta (pendiente, activa, finalizada, cancelada)
   */
  const getRentasPublicitariasByEstado = async (estado) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/rentas-publicitarias/estado/${estado}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener rentas publicitarias con estado ${estado}`;
      console.error(`Error al obtener rentas publicitarias con estado ${estado}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene rentas publicitarias por rango de fechas
   * @param {string} fechaInicio - Fecha de inicio (formato ISO)
   * @param {string} fechaFin - Fecha de fin (formato ISO)
   */
  const getRentasPublicitariasByFechas = async (fechaInicio, fechaFin) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/rentas-publicitarias/fechas`, {
        params: { fechaInicio, fechaFin }
      });
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener rentas publicitarias por fechas';
      console.error('Error al obtener rentas publicitarias por fechas:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Actualiza el estado de una renta publicitaria
   * @param {string|number} id - ID de la renta publicitaria
   * @param {string} estado - Nuevo estado (pendiente, activa, finalizada, cancelada)
   */
  const updateEstadoRentaPublicitaria = async (id, estado) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.patch(`${API_URL}/rentas-publicitarias/${id}/estado`, { estado });
      // Actualizar la lista de rentas publicitarias
      await getRentasPublicitarias();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al actualizar el estado de la renta publicitaria ${id}`;
      console.error(`Error al actualizar estado de renta publicitaria ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    rentasPublicitarias,
    isLoading,
    error,
    getRentasPublicitarias,
    getRentaPublicitariaById,
    createRentaPublicitaria,
    updateRentaPublicitaria,
    deleteRentaPublicitaria,
    getRentasPublicitariasByCliente,
    getRentasPublicitariasByEspacio,
    getRentasPublicitariasByEstado,
    getRentasPublicitariasByFechas,
    updateEstadoRentaPublicitaria
  };
};