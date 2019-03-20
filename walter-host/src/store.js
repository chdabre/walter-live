import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomId: '',
    room: null
  },
  mutations: {
    roomUpdate (state, payload) {
      state.room = payload
    },
    roomId (state, payload) {
      state.roomId = payload
    }
  },
  actions: {

  }
})
