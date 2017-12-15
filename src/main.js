if (module.hot) {
  module.hot.accept();
}
import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../static/css/font/iconfont.css'
import '../static/css/base.less'
import store from './store'
import router from './router'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
