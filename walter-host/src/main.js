import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueMDCAdapter from 'vue-mdc-adapter'
import VueSocketIO from 'vue-socket.io'

Vue.use(VueMDCAdapter)

Vue.use(new VueSocketIO({
  debug: true,
  connection: `http://${window.location.hostname}:3000`,
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
