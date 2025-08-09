import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: AppLayout,
    meta: { requiresAuth: true },
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

  if (userRoles && !userRoles.includes(authStore.user.rol)) {
    return next({ name: 'Dashboard' }); // Redirect to a safe page
  }

  next();
});

export default router;