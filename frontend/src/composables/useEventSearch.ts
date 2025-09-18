
import { ref, watch } from 'vue';
import { debounce } from 'lodash-es';

export function useEventSearch() {
  const events = ref([]);
  const loading = ref(false);
  const error = ref(null);
  
  const filters = ref({
    q: '',
    category: '',
    page: 1,
  });
  
  const totalPages = ref(1);

  const fetchEvents = async () => {
    loading.value = true;
    error.value = null;
    try {
      const params = new URLSearchParams();
      if (filters.value.q) params.append('q', filters.value.q);
      if (filters.value.category) params.append('category', filters.value.category);
      if (filters.value.page) params.append('page', filters.value.page.toString());

      // En un proyecto real, la URL base de la API estaría en una variable de entorno
      const response = await fetch(`/api/events?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener los eventos');
      }
      
      const data = await response.json();
      events.value = data.data;
      totalPages.value = data.totalPages;

    } catch (e) {
      error.value = e.message;
      events.value = []; // Limpiar eventos en caso de error
    } finally {
      loading.value = false;
    }
  };

  // Observa los filtros y vuelve a cargar los eventos con un debounce
  // para no hacer una petición en cada pulsación de tecla.
  watch(filters, debounce(fetchEvents, 500), { deep: true });

  // Carga inicial
  fetchEvents();

  return {
    events,
    loading,
    error,
    filters,
    totalPages,
    fetchEvents,
  };
}
