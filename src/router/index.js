import Vue from 'vue'
import Router from 'vue-router'
import routes from './route'
import store from '../store'
import { getCookie } from '../utils/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

NProgress.configure({ showSpinner: false })

const auths = (to, next) => {
  const u = []
  routes[0].children.forEach(r => {
    if (r.meta.unauth) {
      store.state.auth[r.name] && u.push(r)
      store.state.auth[r.name] && (r.meta.btn = store.state.auth[r.name])
    } else {
      u.push(r)
    }
  })
  store.commit('mMenu', u)
  store.commit('mIslogin')
  next()
}

// 路由拦截
router.beforeEach((to, from, next) => {
  NProgress.start();
  // 清除遗留数据
  store.commit('mFilterUpdata', {});
  const token = window.localStorage.getItem('token');
  if (token || getCookie('remember')) {
    if (store.state.isLogin) {
      if (to.path == '/login') {
        next('/')
      } else {
        if (!to.meta || !to.meta.unauth || (to.meta.unauth && store.state.auth[to.name])) {
          next()
        } else {
          next('/404')
        }
      }
    } else {
      store.state.userInfos.name ? auths(to, next) : store.dispatch('aGetAccountInfo', (auth) => { auths(to, next) })
    }
  } else {
    to.path == '/login' ? next() : next('/login')
    NProgress.done()
  }
})

router.afterEach(route => { NProgress.done() })

export default router
