import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6970c12f = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _4d739af1 = () => interopDefault(import('..\\pages\\personas.vue' /* webpackChunkName: "pages/personas" */))
const _1c229edc = () => interopDefault(import('..\\pages\\propiedades.vue' /* webpackChunkName: "pages/propiedades" */))
const _0cb6cedd = () => interopDefault(import('..\\pages\\registro.vue' /* webpackChunkName: "pages/registro" */))
const _c06dc3d0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _6970c12f,
    name: "login"
  }, {
    path: "/personas",
    component: _4d739af1,
    name: "personas"
  }, {
    path: "/propiedades",
    component: _1c229edc,
    name: "propiedades"
  }, {
    path: "/registro",
    component: _0cb6cedd,
    name: "registro"
  }, {
    path: "/",
    component: _c06dc3d0,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
