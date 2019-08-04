// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/global.less'
import '@/styles/bus.less'
import '@/styles/tool.less'

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization

import * as filters from './filters' // global filters

import * as tool from './utils/index'

Vue.config.productionTip = false
Vue.use(Element, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})


// 全局注册过滤器.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.Tool = tool
Vue.prototype.$proxy = '/api'
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
