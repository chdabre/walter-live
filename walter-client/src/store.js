import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomId: window.location.pathname.split('/').slice(-1)[0],
    clientId: null,
    playerId: null,
    room: null,
  },
  mutations: {
    clientId (state, payload) {
      state.clientId = payload
    },
    playerId (state, payload) {
      state.playerId = payload
    },
    roomUpdate (state, payload) {
      state.room = payload
    }
  },
  actions: {
  }
})
