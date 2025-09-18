import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
//import MapaTestView from '@/views/MapaTestView.vue';
import LandingView from '@/views/LandingView.vue';

const routes = [
  {
    path: '/',
    name: 'LandingView',
    component: LandingView
  },
  {
    path: '/main',
    redirect: to => {
      const authStore = useAuthStore();
      return authStore.isAuthenticated ? '/dashboard' : '/login';
    },
    component: AppLayout,
    meta: { requiresAuth: false },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
      },
      {
        path: 'pedidos',
        name: 'Pedidos',
        component: () => import('@/pages/pedidos/index.vue'),
      },
      {
        path: 'pedidos/crear',
        name: 'CrearPedido',
        component: () => import('@/pages/pedidos/create.vue'),
        meta: { roles: ['Cliente', 'Administrador'] },
      },
      {
        path: 'pedidos/:id',
        name: 'DetallePedido',
        component: () => import('@/pages/pedidos/show.vue'),
      },
      {
        path: 'cotizaciones',
        name: 'Cotizaciones',
        component: () => import('@/pages/cotizaciones/index.vue'),
      },
      {
        path: 'contratos',
        name: 'Contratos',
        component: () => import('@/pages/contratos/index.vue'),
      },
      {
        path: 'equipos',
        name: 'Equipos',
        component: () => import('@/pages/equipos/index.vue'),
        meta: { roles: ['Administrador', 'Colaborador'] },
      },
      {
        path: 'notificaciones',
        name: 'Notificaciones',
        component: () => import('@/pages/notificaciones/index.vue'),
        meta: { roles: ['Administrador'] },
      },
      {
        path: 'espacios-fisicos',
        name: 'EspaciosFisicos',
        component: () => import('@/pages/espacios_fisicos/index.vue'),
        meta: { roles: ['Administrador', 'Gestor'] },
      },
      {
        path: 'actividades',
        name: 'Actividades',
        component: () => import('@/pages/actividades/index.vue'),
      },
      {
        path: 'espacios-publicitarios',
        name: 'EspaciosPublicitarios',
        component: () => import('@/pages/espacios_publicitarios/index.vue'),
      },
      {
        path: 'rentas-publicitarias',
        name: 'RentasPublicitarias',
        component: () => import('@/pages/rentas_publicitarias/index.vue'),
        meta: { roles: ['Administrador', 'Cliente'] },
      },
      {
        path: 'pagos',
        name: 'Pagos',
        component: () => import('@/pages/pagos/index.vue'),
        meta: { roles: ['Administrador', 'Cliente'] },
      },
      {
        path: 'categorias',
        name: 'Categorias',
        component: () => import('@/pages/categorias/index.vue'),
        meta: { roles: ['Administrador', 'Gestor'] },
      },
      {
        path: 'mapa',
        name: 'Mapa',
        component: () => import('@/pages/mapa/index.vue'),
      },
      {
        path: 'mapa-navegacion',
        name: 'MapaNavegacion',
        component: () => import('@/pages/MapaNavegacionPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/auth/login.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userRoles = to.meta.roles;

  if (requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'Login' });
  }

  if (userRoles && authStore.user && !userRoles.includes(authStore.user.rol)) {
    return next({ name: 'Dashboard' }); // Redirect to a safe page
  }

  next();
});

export default router;