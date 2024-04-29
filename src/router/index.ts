import { createRouter, createWebHistory, Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import routes from './routes'
import { auth } from '@/services/firebase'

// Nprogress
import Nprogress from 'nprogress'
// Nprogress CSS
import 'nprogress/nprogress.css'

const router : Router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    // Start the animation of the route progress bar.
    Nprogress.start()
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    // if user is not logged in redirect to auth page.

    if (requiresAuth && !auth.currentUser) {
      next('/auth/login')
    }
    // if user is logged in and tries to access login page redirect to home page.
    if (auth.currentUser && to.path.includes('auth')) {
      next('/')
    }
    next()
  }
)

router.afterEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized
  ) => {
    // Complete the animation of the route progress bar.
    Nprogress.done()
  }
)

export default router
