import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueMDCAdapter from 'vue-mdc-adapter'
import VueSocketIO from 'vue-socket.io'

Vue.use(VueMDCAdapter)

Vue.use(new VueSocketIO({
  debug: true,
  connection: typeof webpackHotUpdate !== 'undefined' ? `http://localhost:3000` : `http://${window.location.hostname}`,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

window.onbeforeunload = s => {
  return 'Do you really want to leave?. This Game will be deleted if you leave the page.'
}
