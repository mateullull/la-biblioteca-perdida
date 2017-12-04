import Vue from 'vue'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import store from './store'
import db from './datastore'

// import VueResource from 'vue-resource'

// Vue.use(VueResource)
// Vue.http.options.emulateJSON = true
// const http = Vue.http
// export default http

Vue.use(ElementUI)
Vue.prototype.$db = db

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
