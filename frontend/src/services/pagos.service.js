import { ref } from 'vue';
import axios from 'axios';

// URL base para las peticiones a la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Estado reactivo para los pagos
const pagos = ref([]);
const isLoading = ref(false);
const error = ref(null);

/**
 * Servicio para gestionar los pagos
 */
export const usePagosService = () => {
  /**
   * Obtiene todos los pagos
   * @param {Object} params - Parámetros de filtrado opcionales
   */
  const getPagos = async (params = {}) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/pagos`, { params });
      pagos.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener los pagos';
      console.error('Error al obtener pagos:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene un pago por su ID
   * @param {string|number} id - ID del pago
   */
  const getPagoById = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/pagos/${id}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener el pago con ID ${id}`;
      console.error(`Error al obtener pago ${id}:`, err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Crea un nuevo pago
   * @param {Object} pago - Datos del pago a crear
   */
  const createPago = async (pago) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const formData = new FormData();
      
      // Agregar datos básicos
      Object.keys(pago).forEach(key => {
        if (key !== 'comprobante') {
          formData.append(key, typeof pago[key] === 'object' ? 
            JSON.stringify(pago[key]) : pago[key]);
        }
      });
      
      // Agregar comprobante si existe
      if (pago.comprobante) {
        formData.append('comprobante', pago.comprobante);
      }
      
      const response = await axios.post(`${API_URL}/pagos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Actualizar la lista de pagos
      await getPagos();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al crear el pago';
      console.error('Error al crear pago:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Actualiza un pago existente
   * @param {string|number} id - ID del pago
   * @param {Object} pago - Datos actualizados del pago
   */
  const updatePago = async (id, pago) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const formData = new FormData();
      
      // Agregar datos básicos
      Object.keys(pago).forEach(key => {
        if (key !== 'comprobante' && key !== 'nuevoComprobante') {
          formData.append(key, typeof pago[key] === 'object' ? 
            JSON.stringify(pago[key]) : pago[key]);
        }
      });
      
      // Agregar nuevo comprobante si existe
      if (pago.nuevoComprobante) {
        formData.append('nuevoComprobante', pago.nuevoComprobante);
      }
      
      const response = await axios.put(`${API_URL}/pagos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Actualizar la lista de pagos
      await getPagos();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al actualizar el pago con ID ${id}`;
      console.error(`Error al actualizar pago ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Elimina un pago
   * @param {string|number} id - ID del pago a eliminar
   */
  const deletePago = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.delete(`${API_URL}/pagos/${id}`);
      // Actualizar la lista de pagos
      await getPagos();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al eliminar el pago con ID ${id}`;
      console.error(`Error al eliminar pago ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene pagos por cliente
   * @param {string|number} clienteId - ID del cliente
   */
  const getPagosByCliente = async (clienteId) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/pagos/cliente/${clienteId}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener pagos del cliente ${clienteId}`;
      console.error(`Error al obtener pagos del cliente ${clienteId}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene pagos por concepto
   * @param {string} concepto - Concepto del pago (renta, actividad, publicidad, etc.)
   */
  const getPagosByConcepto = async (concepto) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/pagos/concepto/${concepto}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener pagos por concepto ${concepto}`;
      console.error(`Error al obtener pagos por concepto ${concepto}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene pagos por estado
   * @param {string} estado - Estado del pago (pendiente, pagado, cancelado)
   */
  const getPagosByEstado = async (estado) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/pagos/estado/${estado}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al obtener pagos con estado ${estado}`;
      console.error(`Error al obtener pagos con estado ${estado}:`, err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Obtiene pagos por rango de fechas
   * @param {string} fechaInicio - Fecha de inicio (formato YYYY-MM-DD)
   * @param {string} fechaFin - Fecha de fin (formato YYYY-MM-DD)
   */
  const getPagosByFechas = async (fechaInicio, fechaFin) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(`${API_URL}/pagos/fechas`, {
        params: { fechaInicio, fechaFin }
      });
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al obtener pagos por fechas';
      console.error('Error al obtener pagos por fechas:', err);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Actualiza el estado de un pago
   * @param {string|number} id - ID del pago
   * @param {string} estado - Nuevo estado (pendiente, pagado, cancelado)
   */
  const updateEstadoPago = async (id, estado) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.patch(`${API_URL}/pagos/${id}/estado`, { estado });
      // Actualizar la lista de pagos
      await getPagos();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || `Error al actualizar el estado del pago ${id}`;
      console.error(`Error al actualizar estado del pago ${id}:`, err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    pagos,
    isLoading,
    error,
    getPagos,
    getPagoById,
    createPago,
    updatePago,
    deletePago,
    getPagosByCliente,
    getPagosByConcepto,
    getPagosByEstado,
    getPagosByFechas,
    updateEstadoPago
  };
};