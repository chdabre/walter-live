import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let roomId = window.location.pathname.split('/').slice(-1)[0]
let playerId = sessionStorage.getItem(roomId)

export default new Vuex.Store({
  state: {
    roomId: roomId,
    clientId: null,
    playerId: playerId,
    room: null
  },
  mutations: {
    clientId (state, payload) {
      state.clientId = payload
    },
    playerId (state, payload) {
      state.playerId = payload
      sessionStorage.setItem(state.roomId, payload)
    },
    roomUpdate (state, payload) {
      state.room = payload
    }
  },
  actions: {
  }
})
