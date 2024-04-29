import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
        title: 'Home',
        requiresAuth: true,
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/AuthView.vue'), 
    meta: {
        title: 'Auth',
        requiresAuth: false
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/Auth/LoginView.vue'),
        meta: {
          title: 'Login',
        }
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('../views/Auth/ResetPasswordView.vue'),
        meta: {
          title: 'Forgot your password?',
        }
      },
    ]
  }
]

export default routes
