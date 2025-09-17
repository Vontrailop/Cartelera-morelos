import { ref } from 'vue';
import axios from 'axios';

// URL base para las peticiones a la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Estado reactivo para las categorías
const categorias = ref([]);
const isLoading = ref(false);
const error = ref(null);

/**
 * Servicio para gestionar las categorías
 */
export const useCategoriasService = () => {
  /**
   * Obtiene todas las categorías
   */
  const getCategorias = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/categorias`);
      categorias.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener las categorías';
      console.error('Error al obtener categorías:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene una categoría por su ID
   * @param {string|number} id - ID de la categoría
   */
  const getCategoriaById = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/categorias/${id}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener la categoría con ID ${id}`;
      console.error(`Error al obtener categoría ${id}:`, err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Crea una nueva categoría
   * @param {Object} categoria - Datos de la categoría a crear
   */
  const createCategoria = async (categoria) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.post(`${API_URL}/categorias`, categoria);
      // Actualizar la lista de categorías
      await getCategorias();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al crear la categoría';
      console.error('Error al crear categoría:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Actualiza una categoría existente
   * @param {string|number} id - ID de la categoría
   * @param {Object} categoria - Datos actualizados de la categoría
   */
  const updateCategoria = async (id, categoria) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.put(`${API_URL}/categorias/${id}`, categoria);
      // Actualizar la lista de categorías
      await getCategorias();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al actualizar la categoría con ID ${id}`;
      console.error(`Error al actualizar categoría ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Elimina una categoría
   * @param {string|number} id - ID de la categoría a eliminar
   */
  const deleteCategoria = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.delete(`${API_URL}/categorias/${id}`);
      // Actualizar la lista de categorías
      await getCategorias();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al eliminar la categoría con ID ${id}`;
      console.error(`Error al eliminar categoría ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene categorías por tipo
   * @param {string} tipo - Tipo de categoría (actividad, espacio, publicidad)
   */
  const getCategoriasByTipo = async (tipo) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/categorias/tipo/${tipo}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener categorías de tipo ${tipo}`;
      console.error(`Error al obtener categorías de tipo ${tipo}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    categorias,
    isLoading,
    error,
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    getCategoriasByTipo
  };
};