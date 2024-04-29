import { createRouter, createWebHashHistory, Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import routes from './routes'

// Nprogress
import Nprogress from 'nprogress'
// Nprogress CSS
import 'nprogress/nprogress.css'

const router : Router = createRouter({
  history: createWebHashHistory(),
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
